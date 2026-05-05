import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { GameModesSection } from "@/components/landing/GameModesSection";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { HowToJoin } from "@/components/landing/HowToJoin";
import { StatsSection } from "@/components/landing/StatsSection";
import { LIVE_STATS_MARQUEE } from "@/lib/constants";

export default function Home() {
  return (
    <div className="noise">
      <HeroSection />
      <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--bg-secondary)] py-3">
        <div className="flex w-max min-w-max animate-[marquee_18s_linear_infinite] text-sm text-[var(--text-secondary)]">
          <div className="flex shrink-0 items-center gap-12 whitespace-nowrap px-6">
            {LIVE_STATS_MARQUEE.map((item) => (
              <span key={item} className="shrink-0">
                {item}
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-12 whitespace-nowrap px-6" aria-hidden="true">
            {LIVE_STATS_MARQUEE.map((item) => (
              <span key={`${item}-clone`} className="shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      <FeaturesSection />
      <GameModesSection />
      <PricingPreview />
      <HowToJoin />
      <StatsSection />
    </div>
  );
}
