"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  slug: string;
  title: string;
}

export default function Breadcrumbs({ slug, title }: BreadcrumbsProps) {
  const parts = slug ? slug.split("/") : [];

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-6 flex-wrap">
      <Link href="/" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>Docs</span>
      </Link>
      {parts.map((part, index) => {
        const isLast = index === parts.length - 1;
        const segmentSlug = parts.slice(0, index + 1).join("/");
        const formattedName = part
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        return (
          <React.Fragment key={segmentSlug}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            {isLast ? (
              <span className="text-slate-900 font-bold truncate">{title}</span>
            ) : (
              <Link href={`/${segmentSlug}`} className="hover:text-slate-900 transition-colors truncate">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
