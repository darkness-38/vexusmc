"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const schema = z.object({
  fullName: z.string().min(3),
  username: z.string().min(3),
  subject: z.string().min(2),
  message: z.string().min(20),
});

type FormData = z.infer<typeof schema>;

const faq = [
  "Sunucuya nasıl bağlanırım?",
  "Hesap oluşturmam gerekiyor mu?",
  "Satın aldığım rank ne zaman tanımlanır?",
  "Haksız yere ceza aldım, ne yapmalıyım?",
  "Hangi Minecraft sürümleri desteklenir?",
  "Ödeme yaptım ama bakiyem gelmedi?",
];

export default function IletisimPage() {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-10">
      <h1 className="font-orbitron text-4xl">İletişim & Destek</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card-base p-5">
          <a href="https://discord.gg" className="mb-4 inline-block rounded-xl bg-[var(--accent-purple)] px-4 py-3">Discord&apos;a Katıl</a>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li>🎮 Discord: Anlık destek</li>
            <li>📧 E-posta: destek@vexusmc.tech</li>
            <li>🐦 Twitter: @VexusMC</li>
          </ul>
          <p className="mt-4 text-sm text-[var(--text-muted)]">Moderatör ekibimiz 09:00 - 23:00 arası aktiftir.</p>
        </div>

        <form
          className="card-base space-y-3 p-5"
          onSubmit={form.handleSubmit(() => {
            toast.success("Mesajın alındı. En kısa sürede dönüş yapacağız.");
            form.reset();
          })}
        >
          <Input placeholder="Ad Soyad" {...form.register("fullName")} />
          <Input placeholder="Minecraft Kullanıcı Adı" {...form.register("username")} />
          <select className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2" {...form.register("subject")}>
            <option>Teknik Sorun</option>
            <option>Ödeme Sorunu</option>
            <option>Haksız Ceza</option>
            <option>Öneri</option>
            <option>Diğer</option>
          </select>
          <textarea className="h-32 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] px-4 py-2" placeholder="Mesajınız" {...form.register("message")} />
          <Button>Gönder</Button>
        </form>
      </div>

      <div className="card-base p-5">
        <h2 className="mb-4 font-orbitron text-2xl">SSS</h2>
        <div className="space-y-2">
          {faq.map((question, index) => (
            <div key={question} className="rounded-lg border border-[var(--border)] p-3">
              <button onClick={() => setOpen(open === index ? null : index)}>{question}</button>
              <AnimatePresence>
                {open === index ? (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 overflow-hidden text-sm text-[var(--text-secondary)]">
                    Bu konuda destek ekibimiz Discord ve e-posta üzerinden yardımcı olur.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


