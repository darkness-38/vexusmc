import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BalanceCard } from "@/components/hesabim/BalanceCard";
import { OrdersTable } from "@/components/hesabim/OrdersTable";

export default async function BakiyePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session?.user?.id } });
  const transactions = await prisma.transaction.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <BalanceCard balance={user?.balance ?? 0} />
      <OrdersTable
        data={transactions.map((tx) => ({
          id: tx.id,
          name: tx.type,
          createdAt: tx.createdAt.toLocaleDateString("tr-TR"),
          amount: tx.amount,
          status: tx.status,
        }))}
      />
    </div>
  );
}

