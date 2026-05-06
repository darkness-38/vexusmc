"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faq = [
  "Sunucuya nasıl bağlanırım?",
  "Hesap oluşturmam gerekiyor mu?",
  "Satın aldığım rank ne zaman tanımlanır?",
  "Haksız yere ceza aldım, ne yapmalıyım?",
  "Hangi Minecraft sürümleri desteklenir?",
  "Ödeme yaptım ama bakiyem gelmedi?",
];

export default function IletisimPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <h1 className="font-orbitron text-4xl text-center mb-8">Sıkça Sorulan Sorular</h1>
      
      <div className="card-base p-6">
        <div className="space-y-3">
          {faq.map((question, index) => (
            <div key={question} className="rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)]/50 transition-all duration-300 hover:border-[var(--accent-green)]/50">
              <button 
                className="w-full p-4 text-left font-medium transition-colors hover:text-[var(--accent-green)]"
                onClick={() => setOpen(open === index ? null : index)}
              >
                {question}
              </button>
              <AnimatePresence>
                {open === index ? (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }} 
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                      Bu konuda daha detaylı bilgi almak için Discord sunucumuza katılabilir veya oyun içerisindeki yetkililere danışabilirsiniz. Ekibimiz size en kısa sürede yardımcı olacaktır.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center text-[var(--text-muted)]">
        <p>Sorunuzun cevabını bulamadınız mı? <a href="https://discord.gg" className="text-[var(--accent-green)] hover:underline">Discord</a> sunucumuza katılın.</p>
      </div>
    </section>
  );
}



