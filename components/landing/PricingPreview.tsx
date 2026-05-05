import { RANK_PACKAGES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function PricingPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-center font-orbitron text-3xl">Sunucuyu Destekle, Ayrıcalıkları Kazan</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {RANK_PACKAGES.map((pkg) => (
          <article key={pkg.name} className={`card-base p-5 ${pkg.popular ? "border-2 border-[var(--accent-green)]" : ""}`}>
            {pkg.popular ? <p className="mb-2 text-xs text-[var(--accent-green)]">⭐ En Popüler</p> : null}
            <h3 className="font-orbitron text-2xl">{pkg.name}</h3>
            <p className="my-3 text-3xl">{pkg.price}</p>
            <ul className="mb-4 space-y-2 text-sm text-[var(--text-secondary)]">
              {pkg.perks.map((perk) => (
                <li key={perk}>✅ {perk}</li>
              ))}
            </ul>
            <Button className="w-full">Satın Al</Button>
          </article>
        ))}
      </div>
    </section>
  );
}

