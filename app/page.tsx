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
        <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap text-sm text-[var(--text-secondary)]">
          {[...LIVE_STATS_MARQUEE, ...LIVE_STATS_MARQUEE].map((item, index) => (
            <span key={`${item}-${index}`} className="mx-6">{item}</span>
          ))}
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
