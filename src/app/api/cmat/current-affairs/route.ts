import { NextRequest, NextResponse } from "next/server";
import { fetchCMATCurrentAffairs } from "@/lib/cmat/api-service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "ALL";

  try {
    // Backend fetches and sanitizes data from external API / fallback.
    // Secret keys are kept strictly on the server and never returned in response.
    const items = await fetchCMATCurrentAffairs(category);

    return NextResponse.json({
      success: true,
      category,
      lastUpdated: new Date().toISOString(),
      isLive: false,
      articles: items.map(article => ({
        id: article.id,
        title: article.title,
        summary: article.summary,
        category: article.category,
        eventDate: article.eventDate,
        source: article.source,
        importance: "HIGH",
        tags: article.tags,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch current affairs feed",
      },
      { status: 500 }
    );
  }
}
