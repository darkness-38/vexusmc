"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faq = [
  {
    question: "Sunucuya nasıl bağlanırım?",
    answer: "Minecraft oyununu açın, 'Çok Oyunculu' (Multiplayer) menüsüne girin ve 'Sunucu Ekle' butonuna basarak 'oyna.vexusmc.tech' adresini kaydedin. Ardından sunucuya bağlanabilirsiniz."
  },
  {
    question: "Hesap oluşturmam gerekiyor mu?",
    answer: "Web sitesi üzerinden hesap oluşturulmaz. Sunucuya ilk kez bağlandığınızda oyun içerisinde '/register <şifre> <şifre>' komutuyla hesabınız otomatik olarak oluşturulur."
  },
  {
    question: "Satın aldığım rank ne zaman tanımlanır?",
    answer: "Satın alımlar genellikle 1-5 dakika içerisinde otomatik olarak teslim edilir. Eğer teslimat gecikirse lütfen Discord üzerinden bir destek talebi oluşturun."
  },
  {
    question: "Haksız yere ceza aldım, ne yapmalıyım?",
    answer: "Cezanızın haksız olduğunu düşünüyorsanız Discord sunucumuzdaki 'destek' kanalından itirazda bulunabilirsiniz. Kanıtlarınızla birlikte başvurmanız süreci hızlandıracaktır."
  },
  {
    question: "Hangi Minecraft sürümleri desteklenir?",
    answer: "Sunucumuz 1.18.2 ile 1.21.x arasındaki tüm sürümleri desteklemektedir. Ancak en iyi deneyim için 1.18.2 ile bağlanmanızı öneririz."
  },
  {
    question: "Ödeme yaptım ama bakiyem gelmedi?",
    answer: "Ödemeler bazen banka onayına bağlı olarak 15-20 dakikayı bulabilir. 1 saat geçmesine rağmen bakiyeniz yüklenmediyse ödeme dekontunuzla birlikte Discord'dan bize ulaşın."
  },
];

export default function IletisimPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10">
      <h1 className="font-orbitron text-4xl text-center mb-8">Sıkça Sorulan Sorular</h1>

      <div className="card-base p-6">
        <div className="space-y-3">
          {faq.map((item, index) => (
            <div key={item.question} className="rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)]/50 transition-all duration-300 hover:border-[var(--accent-green)]/50">
              <button
                className="w-full p-4 text-left font-medium transition-colors hover:text-[var(--accent-green)]"
                onClick={() => setOpen(open === index ? null : index)}
              >
                {item.question}
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
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-[var(--text-muted)]">
        <p>Sorunuzun cevabını bulamadınız mı? <a href="https://discord.gg/Qq5Yb9MsHY" className="text-[var(--accent-green)] hover:underline">Discord</a> sunucumuza katılın.</p>
      </div>
    </section>
  );
}
