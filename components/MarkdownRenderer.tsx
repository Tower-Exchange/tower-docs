"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Check, Copy, Info, AlertTriangle, Lightbulb, ExternalLink, X, Maximize2 } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<{ src: string; alt?: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeImage) {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  const handleCopy = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="prose max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#70B2FF] prose-a:no-underline hover:prose-a:underline prose-code:text-slate-800 prose-code:bg-[#F3F4F7] prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0 prose-img:rounded-3xl prose-img:border prose-img:border-slate-200/80 shadow-2xs">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ children, ...props }) => {
            const text = String(children).replace(/[*_`]/g, "").trim();
            const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return (
              <h1 id={id} className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-6 mb-4 border-b border-slate-100 pb-3" {...props}>
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const text = String(children).replace(/[*_`]/g, "").trim();
            const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return (
              <h2 id={id} className="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-100/80 pb-2 flex items-center gap-2" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children).replace(/[*_`]/g, "").trim();
            const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return (
              <h3 id={id} className="text-lg font-bold text-slate-900 mt-6 mb-3" {...props}>
                {children}
              </h3>
            );
          },
          h4: ({ children, ...props }) => {
            const text = String(children).replace(/[*_`]/g, "").trim();
            const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            return (
              <h4 id={id} className="text-base font-bold text-slate-900 mt-5 mb-2" {...props}>
                {children}
              </h4>
            );
          },
          p: ({ children }) => (
            <p className="text-slate-600 font-medium leading-relaxed my-4 text-xs sm:text-sm">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-600 font-medium text-xs sm:text-sm my-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-6 space-y-2 text-slate-600 font-medium text-xs sm:text-sm my-4">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#70B2FF] bg-[#F8F9FA] pl-4 py-2.5 my-6 text-slate-700 italic rounded-r-2xl border-t border-b border-r border-slate-100">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-[#F8F9FA] text-slate-800 border-b border-slate-200/80">{children}</thead>,
          th: ({ children }) => <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-slate-500">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 border-t border-slate-100 text-slate-700 font-medium">{children}</td>,
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 text-[#70B2FF] hover:underline font-semibold transition-colors"
              >
                <span>{children}</span>
                {isExternal && <ExternalLink className="w-3 h-3 text-[#70B2FF]/80 shrink-0" />}
              </a>
            );
          },
          img: ({ src, alt, width, height, ...props }) => {
            if (!src) return null;
            const imageSrc = String(src);
            return (
              <figure className="my-6">
                <div 
                  className="relative inline-block max-w-full overflow-hidden rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 cursor-zoom-in group"
                  onClick={() => setActiveImage({ src: imageSrc, alt: alt ? String(alt) : undefined })}
                >
                  <img
                    src={imageSrc}
                    alt={alt || "Documentation image"}
                    className="w-full max-w-full h-auto rounded-2xl block transition-transform duration-200 group-hover:scale-[1.01] object-contain"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Click to expand
                    </span>
                  </div>
                </div>
                {alt && <figcaption className="text-xs text-slate-500 text-center font-medium mt-2">{alt}</figcaption>}
              </figure>
            );
          },
          div: ({ node, className, children, ...props }) => {
            if (className?.includes("gitbook-hint")) {
              let icon = <Info className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />;
              let borderClass = "border-[#70B2FF]/30 bg-[#E8F2FF] text-slate-800";

              if (className.includes("gitbook-hint-warning") || className.includes("danger")) {
                icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />;
                borderClass = "border-amber-200 bg-amber-50 text-amber-900";
              } else if (className.includes("gitbook-hint-tip") || className.includes("success")) {
                icon = <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />;
                borderClass = "border-emerald-200 bg-emerald-50 text-emerald-900";
              }

              return (
                <div className={`my-6 p-4 rounded-2xl border flex items-start gap-3.5 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${borderClass}`}>
                  {icon}
                  <div className="flex-1">{children}</div>
                </div>
              );
            }
            return <div className={className} {...props}>{children}</div>;
          },
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const isMultiLine = codeString.includes("\n") || Boolean(match);

            if (!isMultiLine) {
              return (
                <code className="px-2 py-0.5 rounded-lg bg-[#F3F4F7] border border-slate-200/60 text-slate-900 text-xs font-semibold" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="relative group my-6 rounded-2xl border border-slate-800 bg-[#0F172A] overflow-hidden shadow-md">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#1E293B] border-b border-slate-800 text-xs text-slate-300 font-semibold">
                  <span className="uppercase tracking-wider text-[11px] text-slate-400">{match ? match[1] : "code"}</span>
                  <button
                    onClick={() => handleCopy(codeString)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {copiedCode === codeString ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-semibold">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 overflow-x-auto text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                  <pre className="!bg-transparent !p-0 !m-0">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center">
            <div className="absolute -top-12 right-0 flex items-center gap-2">
              <a
                href={activeImage.src}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-slate-300 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
                title="Open full size in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setActiveImage(null)}
                className="p-2 text-slate-300 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={activeImage.src}
              alt={activeImage.alt || "Expanded view"}
              className="max-w-full max-h-[82vh] w-auto h-auto rounded-2xl shadow-2xl object-contain border border-slate-700/60 bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            />

            {activeImage.alt && (
              <p className="text-xs text-slate-300 font-medium mt-3 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800">
                {activeImage.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
