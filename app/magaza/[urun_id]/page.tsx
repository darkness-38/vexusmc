import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { urun_id: string };
}) {
  const product = await prisma.product.findUnique({ where: { id: params.urun_id } });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id } },
    take: 3,
  });

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <Card>
        <div className="grid gap-6 md:grid-cols-[120px_1fr_260px]">
          <div className="grid h-28 w-28 place-items-center rounded-xl bg-[var(--bg-tertiary)] text-5xl">{product.icon}</div>
          <div>
            <h1 className="font-orbitron text-3xl">{product.name}</h1>
            <p className="mt-3 text-[var(--text-secondary)]">{product.description}</p>
            <ul className="mt-4 space-y-1 text-sm text-[var(--text-secondary)]">
              <li>✅ Anında teslim</li>
              <li>✅ Oyun içi otomatik aktivasyon</li>
              <li>✅ Destek ekibi yardımı</li>
            </ul>
          </div>
          <Card>
            <p className="text-sm text-[var(--text-secondary)]">Fiyat</p>
            <p className="my-2 text-3xl">{product.vcPrice ? `${product.vcPrice} VC` : `${product.price}₺`}</p>
            <Button className="w-full">Satın Al</Button>
          </Card>
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="mb-3 font-orbitron text-2xl">İlgili Ürünler</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {related.map((item) => (
            <Card key={item.id}>
              <p>{item.icon} {item.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

