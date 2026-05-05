import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  amountTl: z.number().min(10).max(10000),
  method: z.enum(["kredi", "papara", "havale"]),
  vcAmount: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Yetkisiz" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Geçersiz ödeme verisi" }, { status: 400 });
  }

  const transaction = await prisma.transaction.create({
    data: {
      userId: session.user.id,
      type: "yukleme",
      amount: parsed.data.amountTl,
      vcAmount: parsed.data.vcAmount,
      method: parsed.data.method,
      status: "tamamlandi",
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      balance: {
        increment: parsed.data.vcAmount,
      },
    },
  });

  return NextResponse.json({ success: true, transaction });
}

