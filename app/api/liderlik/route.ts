import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("mode") ?? "genel";

  const where = mode === "genel" ? {} : { gameMode: mode };
  const entries = await prisma.leaderboardEntry.findMany({
    where,
    orderBy: { score: "desc" },
    take: 50,
  });

  return NextResponse.json(entries);
}

