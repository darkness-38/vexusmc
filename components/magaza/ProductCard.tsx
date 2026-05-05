"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    vcPrice: number | null;
    category: string;
    icon: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Card className="hover:-translate-y-1 hover:border-[var(--border-hover)]">
      <div className="mb-3 flex items-start justify-between">
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-[var(--bg-tertiary)] text-2xl">{product.icon}</div>
        <Badge>{product.category}</Badge>
      </div>
      <h3 className="font-orbitron text-xl">{product.name}</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{product.description}</p>
      <p className="my-3 text-lg font-semibold">
        {product.vcPrice ? `${product.vcPrice} VC` : `${product.price}₺`}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() =>
            addItem({ id: product.id, name: product.name, price: product.price, icon: product.icon })
          }
        >
          Sepete Ekle
        </Button>
        <Link href={`/magaza/${product.id}`}>
          <Button className="w-full" variant="secondary">Detay</Button>
        </Link>
      </div>
    </Card>
  );
}

