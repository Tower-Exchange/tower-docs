"use client";

import React from "react";
import Link from "next/link";
import TowerLogo from "@/components/TowerLogo";
import { Search, ExternalLink, Menu, X, Code2 } from "lucide-react";

interface HeaderProps {
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onOpenSearch, onToggleSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left Section: Mobile menu toggle & Logo */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 lg:hidden rounded-2xl hover:bg-slate-100 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center shrink-0">
            <TowerLogo subtitle="DOCS" />
          </Link>
        </div>

        {/* Center Section: Instant Search Trigger Button */}
        <div className="flex items-center justify-end sm:justify-center flex-1 max-w-md">
          {/* Desktop & Tablet Search Bar */}
          <button
            onClick={onOpenSearch}
            className="hidden md:flex w-full items-center justify-between px-4 py-2 bg-[#F3F4F7] hover:bg-slate-200/70 border border-slate-200/60 rounded-2xl text-slate-500 hover:text-slate-800 text-xs sm:text-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
              <span className="font-medium">Search docs, APIs...</span>
            </div>
            <kbd className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-lg shadow-2xs">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* Mobile Search Icon Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-3 sm:p-3 text-slate-500 hover:text-slate-900 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer"
            aria-label="Search documentation"
          >
            <Search className="w-4.5 h-4 sm:w-5 sm:h-4" />
          </button>
        </div>

        {/* Right Section: Developer Console Link */}
        <div className="flex items-center shrink-0">
          <a
            href="https://devs.tower.exchange"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#70B2FF] hover:bg-[#58A1F8] text-slate-900 font-semibold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-xs cursor-pointer text-xs sm:text-sm shrink-0"
          >
            <Code2 className="hidden sm:inline-block w-4 h-4 shrink-0" />
            <span className="min-[380px]:hidden text-[11px]">Console</span>
            <span className="hidden min-[380px]:inline sm:hidden text-xs">Dev Console</span>
            <span className="hidden sm:inline">Developer Console</span>
            <ExternalLink className="hidden sm:inline-block w-3 h-3 shrink-0" />
          </a>
        </div>
      </div>
    </header>
  );
}
