import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileCard } from "@/components/hesabim/ProfileCard";

export const dynamic = "force-dynamic";

export default async function HesabimPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: { orders: true },
  });

  if (!user) return <div className="card-base p-5">Kullanıcı bulunamadı.</div>;

  return (
    <ProfileCard
      username={user.username}
      rank={user.rank}
      balance={user.balance}
      orderCount={user.orders.length}
      createdAt={user.createdAt.toISOString()}
      lastLoginAt={user.lastLoginAt?.toISOString()}
    />
  );
}

