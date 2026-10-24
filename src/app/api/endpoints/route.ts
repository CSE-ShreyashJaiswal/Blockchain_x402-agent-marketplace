import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_APIS } from "@/lib/data";

/**
 * GET /api/endpoints
 * Returns all available API endpoints in the marketplace.
 * 
 * In a production x402 implementation, this endpoint itself could be
 * protected with x402 middleware to require payment for marketplace access.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "popular";

  let apis = [...SAMPLE_APIS];

  // Filter by category
  if (category && category !== "all") {
    apis = apis.filter((api) => api.category === category);
  }

  // Filter by search
  if (search) {
    const q = search.toLowerCase();
    apis = apis.filter(
      (api) =>
        api.name.toLowerCase().includes(q) ||
        api.description.toLowerCase().includes(q) ||
        api.provider.toLowerCase().includes(q)
    );
  }

  // Sort
  switch (sort) {
    case "popular":
      apis.sort((a, b) => b.totalCalls - a.totalCalls);
      break;
    case "cheapest":
      apis.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "rating":
      apis.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      apis.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return NextResponse.json({
    endpoints: apis,
    total: apis.length,
    facilitator: "https://x402.org/facilitator",
    protocol: "x402/v2",
  });
}
