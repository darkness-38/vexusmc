import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { OrdersTable } from "@/components/hesabim/OrdersTable";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function SiparislerPage() {
  const session = await auth();
  const orders = await prisma.order.findMany({
    where: { userId: session?.user?.id },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    return (
      <div className="card-base p-8 text-center">
        <p className="mb-3">Henüz sipariş yok</p>
        <Link href="/magaza"><Button>Mağazaya Git</Button></Link>
      </div>
    );
  }

  return (
    <OrdersTable
      data={orders.map((order) => ({
        id: order.id,
        name: `${order.product.icon} ${order.product.name}`,
        createdAt: order.createdAt.toLocaleDateString("tr-TR"),
        amount: order.amount,
        status: order.status,
      }))}
    />
  );
}

