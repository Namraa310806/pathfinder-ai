import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = {
      studentsGuided: "10k+",
      careerMatches: "94%",
      successRate: "92%",
      avgRating: "4.8",
    };

    return NextResponse.json(stats);
  } catch (err) {
    console.error("[api/stats]", err);
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}
