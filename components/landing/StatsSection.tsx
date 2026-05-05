import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  { value: 2450, suffix: "+", label: "Kayıtlı Oyuncu" },
  { value: 98, suffix: "", label: "Anlık Çevrimiçi" },
  { value: 1200, suffix: "+", label: "Günlük Oyuncu" },
  { value: 847, suffix: "+", label: "VIP+ Üye" },
];

export function StatsSection() {
  return (
    <section className="bg-[var(--bg-secondary)] py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="text-center">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

