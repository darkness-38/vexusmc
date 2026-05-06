import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { GameModesSection } from "@/components/landing/GameModesSection";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { HowToJoin } from "@/components/landing/HowToJoin";
import { StatsSection } from "@/components/landing/StatsSection";

export default function Home() {
  return (
    <div className="noise">
      <HeroSection />
      <FeaturesSection />
      <GameModesSection />
      <PricingPreview />
      <HowToJoin />
      <StatsSection />
    </div>
  );
}
