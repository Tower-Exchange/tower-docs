"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, FileText, CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  slug: string;
  snippet: string;
  section: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setSelectedIndex(0);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      const targetSlug = results[selectedIndex].slug;
      router.push(targetSlug ? `/${targetSlug}` : "/");
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/30 backdrop-blur-xs animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
        {/* Search Header */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3.5" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-semibold focus:outline-none"
            placeholder="Search documentation, guides, APIs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-700 mr-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] font-bold text-slate-500 bg-[#F3F4F7] px-2.5 py-1 rounded-xl hover:bg-slate-200/60 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 divide-y divide-slate-100">
          {loading && (
            <div className="p-8 text-center text-xs font-semibold text-slate-500">
              Searching docs...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center text-xs font-semibold text-slate-500">
              No results found for &ldquo;<span className="text-slate-900">{query}</span>&rdquo;
            </div>
          )}

          {!query && (
            <div className="p-6 text-center text-xs font-medium text-slate-400 leading-relaxed">
              Type at least 2 characters to search across developer guides, architecture, & API reference.
            </div>
          )}

          {results.map((res, index) => {
            const href = res.slug ? `/${res.slug}` : "/";
            const isSelected = index === selectedIndex;
            return (
              <Link
                key={`${res.slug}-${index}`}
                href={href}
                onClick={onClose}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex items-start gap-3.5 p-3.5 rounded-2xl transition-all duration-150 ${
                  isSelected ? "bg-[#F3F4F7] border border-slate-200/80" : "hover:bg-slate-50"
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${isSelected ? "bg-[#E8F2FF] text-[#3B82F6]" : "bg-[#F3F4F7] text-slate-500"}`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B82F6]">
                      {res.section}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">{res.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-1">
                    {res.snippet}
                  </p>
                </div>
                {isSelected && (
                  <CornerDownLeft className="w-4 h-4 text-[#3B82F6] shrink-0 self-center" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#F8F9FA] border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-700 shadow-2xs">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-700 shadow-2xs">↵</kbd> Select
            </span>
          </div>
          <span className="text-slate-400">Tower Exchange Docs</span>
        </div>
      </div>
    </div>
  );
}
