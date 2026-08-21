"use client";

import React, { useState, useEffect } from "react";
import { TocHeading } from "@/lib/docs";
import { AlignLeft, ArrowUp } from "lucide-react";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0 pl-8 border-l border-slate-100 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <AlignLeft className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>On this page</span>
        </div>

        <nav className="space-y-1.5 text-xs font-semibold">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top, behavior: "smooth" });
                    setActiveId(h.id);
                  }
                }}
                className={`block py-1 transition-all duration-150 leading-relaxed truncate ${
                  h.level === 3 ? "pl-3 text-[11px]" : h.level === 4 ? "pl-5 text-[10px]" : ""
                } ${
                  isActive
                    ? "text-[#3B82F6] font-bold border-l-2 border-[#3B82F6] -ml-8 pl-[30px]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {h.text}
              </a>
            );
          })}
        </nav>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>Back to top</span>
        </button>
      </div>
    </aside>
  );
}
