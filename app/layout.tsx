import React from "react";
import "./globals.css";
import DocsLayoutShell from "@/components/DocsLayoutShell";
import { getDocsNavigation } from "@/lib/docs";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata = {
  title: "Tower Exchange Documentation",
  description: "Official documentation for Tower Exchange, Developer Console, APIs, and Smart Routing.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = getDocsNavigation();

  return (
    <html lang="en" className={sora.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${sora.variable} min-h-screen bg-white text-slate-900 selection:bg-[#70B2FF]/30 font-sans flex flex-col antialiased`} suppressHydrationWarning>
        <DocsLayoutShell sections={sections}>
          {children}
        </DocsLayoutShell>
      </body>
    </html>
  );
}
