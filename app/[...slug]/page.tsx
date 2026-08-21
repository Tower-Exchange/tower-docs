import React from "react";
import { getDocPageBySlug, getFlatNavList } from "@/lib/docs";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import Breadcrumbs from "@/components/Breadcrumbs";
import DocPagination from "@/components/DocPagination";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: {
    slug: string[];
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const flatNav = getFlatNavList();
  return flatNav
    .filter((item) => item.slug !== "")
    .map((item) => ({
      slug: item.slug.split("/"),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = getDocPageBySlug(params.slug);
  if (!doc) {
    return {
      title: "Page Not Found | Tower Docs",
    };
  }
  return {
    title: `${doc.title} | Tower Exchange Docs`,
    description: doc.description || `Read the official documentation for ${doc.title} on Tower Exchange.`,
  };
}

export default function DocSlugPage({ params }: PageProps) {
  const doc = getDocPageBySlug(params.slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="flex items-start gap-8 min-w-0">
      <div className="flex-1 min-w-0">
        <Breadcrumbs slug={doc.slug} title={doc.title} />
        <MarkdownRenderer content={doc.content} />
        <DocPagination prevPage={doc.prevPage} nextPage={doc.nextPage} />
      </div>
      <TableOfContents headings={doc.headings} />
    </div>
  );
}
