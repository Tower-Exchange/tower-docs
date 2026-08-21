import React from "react";
import { getDocPageBySlug } from "@/lib/docs";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import Breadcrumbs from "@/components/Breadcrumbs";
import DocPagination from "@/components/DocPagination";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default function HomePage() {
  const doc = getDocPageBySlug([]);

  if (!doc) {
    notFound();
  }

  return (
    <div className="flex items-start gap-8 min-w-0">
      <div className="flex-1 min-w-0">
        <Breadcrumbs slug="" title={doc.title} />
        <MarkdownRenderer content={doc.content} />
        <DocPagination prevPage={doc.prevPage} nextPage={doc.nextPage} />
      </div>
      <TableOfContents headings={doc.headings} />
    </div>
  );
}
