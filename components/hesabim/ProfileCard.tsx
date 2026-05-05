import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface ProfileCardProps {
  username: string;
  rank: string;
  balance: number;
  orderCount: number;
  createdAt: string;
  lastLoginAt?: string | null;
}

export function ProfileCard(props: ProfileCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar username={props.username} size={128} />
          <div>
            <h1 className="font-orbitron text-3xl">{props.username}</h1>
            <Badge>{props.rank}</Badge>
          </div>
        </div>
        <Avatar username={props.username} size={200} body />
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-[var(--border)] p-3">Bakiye: {props.balance} VC</div>
        <div className="rounded-lg border border-[var(--border)] p-3">Sipariş: {props.orderCount}</div>
        <div className="rounded-lg border border-[var(--border)] p-3">Üyelik: {new Date(props.createdAt).toLocaleDateString("tr-TR")}</div>
        <div className="rounded-lg border border-[var(--border)] p-3">Son Giriş: {props.lastLoginAt ? new Date(props.lastLoginAt).toLocaleDateString("tr-TR") : "-"}</div>
      </div>
    </Card>
  );
}

