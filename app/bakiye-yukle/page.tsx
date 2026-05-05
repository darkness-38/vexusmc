"use client";

import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

const packs = [
  { tl: 50, vc: 250, bonus: "+%0 bonus" },
  { tl: 100, vc: 550, bonus: "+%10 bonus", tag: "Önerilen" },
  { tl: 200, vc: 1200, bonus: "+%20 bonus" },
  { tl: 500, vc: 3500, bonus: "+%40 bonus", tag: "En Değerli" },
];

export default function BakiyeYuklePage() {
  const [selected, setSelected] = useState(packs[0]);
  const [custom, setCustom] = useState(false);
  const [customTl, setCustomTl] = useState(100);
  const [method, setMethod] = useState<"kredi" | "papara" | "havale">("kredi");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const selectedTl = custom ? customTl : selected.tl;
  const selectedVc = useMemo(() => {
    if (!custom) return selected.vc;
    if (customTl >= 500) return Math.floor(customTl * 7);
    if (customTl >= 200) return Math.floor(customTl * 6);
    if (customTl >= 100) return Math.floor(customTl * 5.5);
    return Math.floor(customTl * 5);
  }, [custom, selected, customTl]);

  const completePayment = async () => {
    setLoading(true);
    const res = await fetch("/api/odeme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amountTl: selectedTl, method, vcAmount: selectedVc }),
    });
    setLoading(false);

    if (!res.ok) {
      toast.error("Ödeme tamamlanamadı.");
      return;
    }

    confetti({ particleCount: 120, spread: 80 });
    setOpen(true);
  };

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <h1 className="font-orbitron text-4xl">Bakiye Yükle</h1>

      <Card>
        <h2 className="mb-3 text-xl font-semibold">1) Paket Seç</h2>
        <div className="grid gap-3 md:grid-cols-4">
          {packs.map((pack) => (
            <button
              key={pack.tl}
              onClick={() => {
                setCustom(false);
                setSelected(pack);
              }}
              className={`rounded-xl border p-4 text-left transition-all duration-300 ${selected.tl === pack.tl && !custom ? "border-[var(--accent-green)]" : "border-[var(--border)]"}`}
            >
              <p className="font-orbitron text-2xl">{pack.tl}₺</p>
              <p>{pack.vc} VC</p>
              <p className="text-xs text-[var(--text-secondary)]">{pack.bonus}</p>
              {pack.tag ? <span className="mt-2 inline-block text-xs text-[var(--accent-green)]">{pack.tag}</span> : null}
            </button>
          ))}
        </div>

        <label className="mt-4 inline-flex items-center gap-2">
          <input type="checkbox" checked={custom} onChange={(event) => setCustom(event.target.checked)} /> Özel Tutar
        </label>

        {custom ? (
          <div className="mt-3 max-w-xs">
            <Input
              type="number"
              min={10}
              max={10000}
              value={customTl}
              onChange={(event) => setCustomTl(Number(event.target.value))}
            />
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Hesaplanan VC: {selectedVc}</p>
          </div>
        ) : null}
      </Card>

      <Card>
        <h2 className="mb-3 text-xl font-semibold">2) Ödeme Yöntemi</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { key: "kredi", label: "💳 Kredi / Banka Kartı", chip: "Anlık" },
            { key: "papara", label: "📱 Papara", chip: "TR'ye özel" },
            { key: "havale", label: "🏦 Havale / EFT", chip: "Manuel onay" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setMethod(item.key as "kredi" | "papara" | "havale")}
              className={`rounded-xl border p-4 text-left ${method === item.key ? "border-[var(--accent-green)]" : "border-[var(--border)]"}`}
            >
              <p>{item.label}</p>
              <p className="text-xs text-[var(--text-secondary)]">{item.chip}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-4 text-sm text-[var(--text-secondary)]">
          {method === "kredi" ? "Kart bilgileri simüle edilir. Gerçek ödeme alınmaz." : null}
          {method === "papara" ? "Papara No: 1234567890 | Açıklama: VEXUS-PPR" : null}
          {method === "havale" ? "IBAN: TR00 0000 0000 0000 0000 00 | Açıklama: VEXUS-HVL" : null}
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-xl font-semibold">3) Onay</h2>
        <p className="text-[var(--text-secondary)]">Toplam: {selectedTl}₺ • Yöntem: {method} • Yüklenecek: {selectedVc} VC</p>
        <Button className="mt-4" onClick={completePayment} disabled={loading}>
          {loading ? "Ödeme işleniyor..." : "Ödemeyi Tamamla"}
        </Button>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="Ödeme Başarılı">
        <p className="mb-4">+{selectedVc} VC bakiyenize eklendi!</p>
        <a href="/hesabim"><Button>Hesabıma Git</Button></a>
      </Modal>
    </section>
  );
}

