import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function BalanceCard({ balance }: { balance: number }) {
  return (
    <Card className="text-center">
      <p className="text-4xl [text-shadow:var(--glow-green)]">💰 {balance} VC</p>
      <Link href="/bakiye-yukle" className="mt-4 inline-block">
        <Button>Bakiye Yükle</Button>
      </Link>
    </Card>
  );
}

