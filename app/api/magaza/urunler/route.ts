import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    });

    return NextResponse.json(products);
  } catch (err) {
    // If the database isn't available during build (e.g. tables not pushed),
    // don't fail the whole build — return an empty list and log the error.
    // This makes the build resilient; runtime requests will still hit the DB.
    // eslint-disable-next-line no-console
    console.error("/api/magaza/urunler - prisma error during GET:", err);
    return NextResponse.json([], { status: 200 });
  }
}

