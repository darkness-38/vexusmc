import { GAME_MODES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function GameModesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-orbitron text-3xl">Oyun Modları</h2>
        <a href="#" className="text-sm text-[var(--accent-green)]">Tüm modları gör →</a>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {GAME_MODES.map((mode) => (
          <article key={mode.key} className={`card-base bg-gradient-to-br ${mode.gradient} p-5`}>
            <h3 className="font-orbitron text-2xl">{mode.name}</h3>
            <p className="my-3 text-sm text-[var(--text-primary)]/90">{mode.description}</p>
            <Badge className="mb-3">{mode.online} Oyuncu Çevrimiçi</Badge>
            <Button variant="secondary" className="w-full">Oyna</Button>
          </article>
        ))}
      </div>
    </section>
  );
}

