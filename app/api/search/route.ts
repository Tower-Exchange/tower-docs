import { NextRequest, NextResponse } from "next/server";
import { searchDocs } from "@/lib/docs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results = searchDocs(query);
  return NextResponse.json({ results });
}
