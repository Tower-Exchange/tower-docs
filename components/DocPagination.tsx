"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DocPaginationProps {
  prevPage?: { title: string; href: string } | null;
  nextPage?: { title: string; href: string } | null;
}

export default function DocPagination({ prevPage, nextPage }: DocPaginationProps) {
  if (!prevPage && !nextPage) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-6 border-t border-slate-100">
      {prevPage ? (
        <Link
          href={prevPage.href}
          className="group flex flex-col p-5 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] text-left shadow-2xs"
        >
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-[#3B82F6] mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </span>
          <span className="text-sm font-bold text-slate-900 truncate">
            {prevPage.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextPage ? (
        <Link
          href={nextPage.href}
          className="group flex flex-col items-end p-5 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] text-right sm:col-start-2 shadow-2xs"
        >
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-[#3B82F6] mb-1">
            Next <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-sm font-bold text-slate-900 truncate">
            {nextPage.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
