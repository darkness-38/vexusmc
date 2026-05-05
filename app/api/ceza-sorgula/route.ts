import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ message: "Kullanıcı adı gerekli" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return NextResponse.json({ status: "not_found", penalties: [] });
  }

  const penalties = await prisma.penalty.findMany({
    where: { username, isActive: true },
    orderBy: { createdAt: "desc" },
  });

  if (penalties.length === 0) {
    return NextResponse.json({ status: "clean", penalties: [] });
  }

  return NextResponse.json({ status: "has_penalty", penalties });
}

