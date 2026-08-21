import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface DocNavItem {
  title: string;
  path: string; // e.g. "getting-started/quickstart" or "README.md"
  slug: string; // e.g. "getting-started/quickstart" or ""
  children?: DocNavItem[];
}

export interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface DocPageData {
  title: string;
  description?: string;
  content: string;
  rawContent: string;
  headings: TocHeading[];
  slug: string;
  filePath: string;
  prevPage?: { title: string; href: string } | null;
  nextPage?: { title: string; href: string } | null;
}

export interface SearchResultItem {
  title: string;
  slug: string;
  snippet: string;
  section: string;
}

const DOCS_DIR = process.cwd();

/**
 * Parses SUMMARY.md into structured sections and items.
 */
export function getDocsNavigation(): DocNavSection[] {
  const summaryPath = path.join(DOCS_DIR, "SUMMARY.md");
  if (!fs.existsSync(summaryPath)) {
    return [];
  }

  const content = fs.readFileSync(summaryPath, "utf-8");
  const lines = content.split("\n");

  const sections: DocNavSection[] = [];
  let currentSection: DocNavSection = { title: "Overview", items: [] };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) continue;

    // Heading level 2 or 1 (e.g. ## GETTING STARTED)
    if (line.startsWith("## ") || line.startsWith("# ")) {
      const secTitle = line.replace(/^#+\s*/, "").trim();
      if (secTitle.toLowerCase() === "table of contents") continue;
      currentSection = { title: secTitle, items: [] };
      sections.push(currentSection);
      continue;
    }

    // List item (e.g. * [Quickstart](getting-started/quickstart.md) or   * [Nested](...))
    const linkMatch = rawLine.match(/^(\s*)\*\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const indent = linkMatch[1].length;
      const title = linkMatch[2];
      const relPath = linkMatch[3];
      const slug = pathToSlug(relPath);

      const item: DocNavItem = {
        title,
        path: relPath,
        slug,
      };

      if (sections.length === 0) {
        sections.push(currentSection);
      }

      // Check if sub-item (indentation >= 2)
      if (indent >= 2 && currentSection.items.length > 0) {
        const lastItem = currentSection.items[currentSection.items.length - 1];
        if (!lastItem.children) lastItem.children = [];
        lastItem.children.push(item);
      } else {
        currentSection.items.push(item);
      }
    }
  }

  return sections;
}

/**
 * Converts markdown file path to URL slug
 */
export function pathToSlug(relPath: string): string {
  let slug = relPath.replace(/\.md$/, "");
  if (slug === "README" || slug === "readme" || slug === "index") {
    return "";
  }
  return slug;
}

/**
 * Flattens navigation for Next/Prev lookup and search index
 */
export function getFlatNavList(): { title: string; slug: string; section: string }[] {
  const sections = getDocsNavigation();
  const flat: { title: string; slug: string; section: string }[] = [];

  for (const sec of sections) {
    for (const item of sec.items) {
      flat.push({ title: item.title, slug: item.slug, section: sec.title });
      if (item.children) {
        for (const child of item.children) {
          flat.push({ title: child.title, slug: child.slug, section: sec.title });
        }
      }
    }
  }

  return flat;
}

/**
 * Loads and processes a doc page by slug
 */
export function getDocPageBySlug(slugSegments: string[] = []): DocPageData | null {
  const slugStr = slugSegments.join("/");
  let relFilePath = slugStr ? `${slugStr}.md` : "README.md";

  let fullPath = path.join(DOCS_DIR, relFilePath);

  if (!fs.existsSync(fullPath)) {
    // Try index.md or README.md inside directory
    const altPath = path.join(DOCS_DIR, slugStr, "README.md");
    if (fs.existsSync(altPath)) {
      fullPath = altPath;
      relFilePath = `${slugStr}/README.md`;
    } else {
      return null;
    }
  }

  const rawFile = fs.readFileSync(fullPath, "utf-8");
  const { data, content: markdownBody } = matter(rawFile);

  // Pre-process Gitbook content
  let processedContent = markdownBody;

  // Transform {% hint style="info" %}...{% endhint %} into HTML callout blocks
  processedContent = processedContent.replace(
    /\{%\s*hint\s+style="([^"]+)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g,
    (_, style, text) => {
      return `\n<div class="gitbook-hint gitbook-hint-${style.trim()}">\n\n${text.trim()}\n\n</div>\n`;
    }
  );

  // Transform relative image paths starting with ../.gitbook/assets/ or .gitbook/assets/ to /.gitbook/assets/
  processedContent = processedContent.replace(
    /(\.\.\/)*\.gitbook\/assets\//g,
    "/.gitbook/assets/"
  );

  // Extract headings for TOC
  const headings: TocHeading[] = [];
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(processedContent)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }

  // Determine Title
  let title = data.title;
  if (!title && headings.length > 0) {
    title = headings[0].text;
  }
  if (!title) {
    title = slugSegments.length > 0 ? slugSegments[slugSegments.length - 1] : "Welcome to Tower";
  }

  // Determine prev/next pages
  const flatNav = getFlatNavList();
  const currentIndex = flatNav.findIndex((item) => item.slug === slugStr);

  let prevPage = null;
  let nextPage = null;

  if (currentIndex > 0) {
    const prev = flatNav[currentIndex - 1];
    prevPage = { title: prev.title, href: prev.slug ? `/${prev.slug}` : "/" };
  }

  if (currentIndex >= 0 && currentIndex < flatNav.length - 1) {
    const next = flatNav[currentIndex + 1];
    nextPage = { title: next.title, href: next.slug ? `/${next.slug}` : "/" };
  }

  return {
    title,
    description: data.description || "",
    content: processedContent,
    rawContent: rawFile,
    headings,
    slug: slugStr,
    filePath: relFilePath,
    prevPage,
    nextPage,
  };
}

/**
 * Searches all markdown files for a query string
 */
export function searchDocs(query: string): SearchResultItem[] {
  if (!query || query.trim().length < 2) return [];

  const q = query.toLowerCase().trim();
  const flatNav = getFlatNavList();
  const results: SearchResultItem[] = [];

  for (const item of flatNav) {
    const doc = getDocPageBySlug(item.slug ? item.slug.split("/") : []);
    if (!doc) continue;

    const titleMatch = doc.title.toLowerCase().includes(q);
    const contentLower = doc.content.toLowerCase();
    const contentIndex = contentLower.indexOf(q);

    if (titleMatch || contentIndex !== -1) {
      let snippet = "";
      if (contentIndex !== -1) {
        const start = Math.max(0, contentIndex - 40);
        const end = Math.min(doc.content.length, contentIndex + 100);
        snippet = "..." + doc.content.slice(start, end).replace(/[\n#*`]/g, " ") + "...";
      } else {
        snippet = doc.description || doc.content.slice(0, 120).replace(/[\n#*`]/g, " ") + "...";
      }

      results.push({
        title: doc.title,
        slug: item.slug,
        snippet,
        section: item.section,
      });
    }

    if (results.length >= 12) break;
  }

  return results;
}
