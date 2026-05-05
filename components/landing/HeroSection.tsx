"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ParticleCanvas } from "@/components/landing/ParticleCanvas";
import { SERVER_IP } from "@/lib/constants";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    } catch {
      setCopied(false);
    }
  };

  const reveal = {
    hidden: { y: 22, opacity: 0 },
    show: (delay: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, delay },
    }),
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <ParticleCanvas />
      <div className="absolute inset-y-0 left-0 z-10 w-1 bg-gradient-to-r from-transparent via-[var(--accent-green)]/40 to-transparent animate-scanline" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.div initial="hidden" animate="show" variants={reveal} custom={0}>
          <Badge className="mb-4 bg-[var(--accent-green)]/10 text-[var(--accent-green)]">🟢 98 Oyuncu Çevrimiçi</Badge>
        </motion.div>
        <motion.h1 className="font-orbitron text-4xl md:text-7xl" initial="hidden" animate="show" variants={reveal} custom={0.1}>
          VEXUSMC&apos;YE <span className="text-[var(--accent-green)] [text-shadow:var(--glow-green)]">HOŞ GELDİN</span>
        </motion.h1>
        <motion.p className="mx-auto mt-5 max-w-2xl text-[var(--text-secondary)]" initial="hidden" animate="show" variants={reveal} custom={0.2}>
          Türkiye&apos;nin en güçlü Minecraft deneyimi. Eşsiz oyun modları, adil ekonomi, gerçek topluluk.
        </motion.p>
        <motion.button className="mx-auto mt-6 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 transition-all duration-300 hover:border-[var(--border-hover)]" initial="hidden" animate="show" variants={reveal} custom={0.3} onClick={copyIp}>
          {SERVER_IP} {copied ? <Check size={16} className="text-[var(--accent-green)]" /> : <Copy size={16} />}
          <span className="text-[var(--accent-green)]">{copied ? "Kopyalandı!" : "Kopyala"}</span>
        </motion.button>
        <motion.div className="mt-8 flex justify-center gap-3" initial="hidden" animate="show" variants={reveal} custom={0.4}>
          <Link href="/magaza"><Button>Mağazayı Keşfet</Button></Link>
          <Link href="/giris"><Button variant="secondary">Giriş Yap</Button></Link>
        </motion.div>
        <motion.div className="mt-14 flex justify-center text-[var(--text-muted)]" initial="hidden" animate="show" variants={reveal} custom={0.5}>
          <ChevronDown className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}


