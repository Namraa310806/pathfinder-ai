import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/lib/env";

export async function GET() {
  try {
    const isProd = process.env.NODE_ENV === "production";
    const clerkKeyless = !isProd && !isClerkConfigured();

    return NextResponse.json({ clerkKeyless });
  } catch (err) {
    console.error("[api/dev/status]", err);
    return NextResponse.json({ clerkKeyless: false }, { status: 500 });
  }
}
