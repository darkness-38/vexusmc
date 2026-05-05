"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-center font-orbitron text-3xl">Neden VexusMC?</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:-translate-y-1 hover:border-[var(--border-hover)]">
              <p className="mb-2 text-3xl">{feature.icon}</p>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

