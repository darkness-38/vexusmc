"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/magaza/ProductCard";
import { ProductFilter } from "@/components/magaza/ProductFilter";
import { CartModal } from "@/components/magaza/CartModal";
import { Input } from "@/components/ui/Input";
import { useCartStore } from "@/store/cartStore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  vcPrice: number | null;
  category: string;
  icon: string;
}

export default function MagazaPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");
  const { data: products = [] } = useSWR<Product[]>("/api/magaza/urunler", fetcher);

  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const toggleCart = useCartStore((state) => state.toggleCart);

  const filtered = useMemo(() => {
    const list = products.filter((product) => {
      const categoryOk = category === "all" || product.category === category;
      const queryOk = product.name.toLowerCase().includes(query.toLowerCase());
      return categoryOk && queryOk;
    });

    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, category, query, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-orbitron text-4xl">Mağaza</h1>
        <select
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="popular">Popülerlik</option>
          <option value="asc">Fiyat (artan)</option>
          <option value="desc">Fiyat (azalan)</option>
        </select>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <Input placeholder="Ürün ara..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <ProductFilter category={category} onCategory={setCategory} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <button
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[var(--accent-green)] text-black"
        onClick={toggleCart}
      >
        <ShoppingCart />
        {cartCount > 0 ? <span className="absolute -right-1 -top-1 rounded-full bg-black px-2 py-0.5 text-xs text-white">{cartCount}</span> : null}
      </button>

      <CartModal />
    </section>
  );
}


