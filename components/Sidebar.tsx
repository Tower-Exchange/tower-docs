"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocNavSection } from "@/lib/docs";
import TowerLogo from "@/components/TowerLogo";
import {
  Compass,
  BookOpen,
  Terminal,
  Code2,
  ChevronDown,
  ChevronRight,
  Layers,
  X
} from "lucide-react";

interface SidebarProps {
  sections: DocNavSection[];
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ sections, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "developer-console/api-reference/swap-engine": true,
  });

  const toggleSubmenu = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getSectionIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("getting started")) return <Compass className="w-4 h-4 text-[#70b2ff]" />;
    if (t.includes("fundamental")) return <Layers className="w-4 h-4 text-[#70b2ff]" />;
    if (t.includes("developer console")) return <Terminal className="w-4 h-4 text-[#70b2ff]" />;
    if (t.includes("api reference")) return <Code2 className="w-4 h-4 text-[#70b2ff]" />;
    return <BookOpen className="w-4 h-4 text-[#70b2ff]" />;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 inset-y-0 lg:bottom-auto left-0 z-50 lg:z-30 w-[85vw] max-w-sm sm:w-80 lg:w-64 shrink-0 h-screen lg:h-[calc(100vh-4rem)] bg-white border-r border-slate-100 overflow-y-auto p-5 sm:p-4 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header Inside Sidebar Drawer */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 lg:hidden">
          <TowerLogo subtitle="DOCS" />
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-6">
          {sections.map((section, idx) => (
            <div key={`${section.title}-${idx}`} className="space-y-1.5">
              <div className="flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {getSectionIcon(section.title)}
                <span>{section.title}</span>
              </div>

              <div className="space-y-1 pt-1">
                {section.items.map((item) => {
                  const href = item.slug ? `/${item.slug}` : "/";
                  const isActive = pathname === href || (item.slug === "" && pathname === "/");
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = openItems[item.path] ?? true;

                  return (
                    <div key={item.path} className="space-y-1">
                      <div className="flex items-center justify-between group">
                        <Link
                          href={href}
                          onClick={onClose}
                          className={`flex-1 flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl transition-all duration-150 ${
                            isActive
                              ? "bg-[#F3F4F7] text-slate-900 shadow-2xs"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          <span className="truncate">{item.title}</span>
                        </Link>
                        {hasChildren && (
                          <button
                            onClick={(e) => toggleSubmenu(item.path, e)}
                            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Nested Items */}
                      {hasChildren && isExpanded && (
                        <div className="pl-4 ml-3 border-l border-slate-200/80 space-y-1 pt-0.5">
                          {item.children!.map((child) => {
                            const childHref = child.slug ? `/${child.slug}` : "/";
                            const isChildActive = pathname === childHref;
                            return (
                              <Link
                                key={child.path}
                                href={childHref}
                                onClick={onClose}
                                className={`block px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-150 ${
                                  isChildActive
                                    ? "bg-[#F3F4F7] text-[#3B82F6]"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                              >
                                <span className="truncate block">{child.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
