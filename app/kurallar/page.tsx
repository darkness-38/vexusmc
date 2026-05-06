"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


const sections = [
  { title: "📋 Genel Kurallar", items: ["Sunucu düzenini bozmak yasaktır.", "Yetkililere saygısızlık yapılamaz.", "Hesap paylaşımı önerilmez.", "Bug kullanımı yasaktır.", "Sunucu reklamı yasaktır.", "Diğer oyuncuların oyun keyfini bozma.", "Kural ihlalinde yaptırım uygulanır.", "Karar yetkililerindir."] },
  { title: "⚔️ PvP & Oyun Kuralları", items: ["Teaming limitlerine uy.", "Spawn kill yasaktır.", "Arena dışı exploit yasaktır.", "Etkinliklerde hile yasaktır.", "Farm bot yasaktır."] },
  { title: "💬 Sohbet & Davranış Kuralları", items: ["Küfür ve hakaret yasaktır.", "Irkçı/ayrımcı dil yasaktır.", "Spam/flood yasaktır.", "Kışkırtıcı içerik yasaktır.", "Kişisel bilgi paylaşımı yasaktır.", "Topluluk diline uyum zorunludur."] },
  { title: "🔧 Hile & Exploit Kuralları", items: ["X-Ray, KillAura vb. yasaktır.", "Makro ve otomasyon yasaktır.", "Client exploitleri yasaktır.", "Duplication yasaktır.", "Hile raporları kanıtla yapılmalıdır."] },
  { title: "🛒 Mağaza & Ödeme Kuralları", items: ["Satın alımlar dijital üründür.", "İade koşulları destek ekibince değerlendirilir.", "Ödeme açıklaması doğru yazılmalıdır.", "Çalıntı kart kullanımı kalıcı ban sebebidir."] },
];

export default function KurallarPage() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-5xl space-y-4 px-4 py-10">
      <h1 className="font-orbitron text-4xl">Kurallar</h1>
      {sections.map((section, index) => (
        <article key={section.title} className={`card-base p-4 ${active === index ? "border-[var(--accent-green)]" : ""}`}>
          <button className="w-full text-left font-semibold" onClick={() => setActive(active === index ? null : index)}>
            {section.title}
          </button>
          <AnimatePresence>
            {active === index ? (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 space-y-2 overflow-hidden text-sm text-[var(--text-secondary)]"
              >
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>
        </article>
      ))}
    </section>
  );
}

