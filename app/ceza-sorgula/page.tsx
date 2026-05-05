"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

type Result =
  | { status: "idle" }
  | { status: "clean" }
  | { status: "not_found" }
  | { status: "has_penalty"; penalties: PenaltyRow[] };

interface PenaltyRow {
  id: string;
  type: string;
  reason: string;
  createdAt: string;
  duration: string | null;
  isActive: boolean;
}

export default function CezaSorgulaPage() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<Result>({ status: "idle" });
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("vexus-penalty-history");
    if (raw) setHistory(JSON.parse(raw));
  }, []);

  const saveHistory = (name: string) => {
    const next = [name, ...history.filter((entry) => entry !== name)].slice(0, 5);
    setHistory(next);
    localStorage.setItem("vexus-penalty-history", JSON.stringify(next));
  };

  const search = async (name: string) => {
    if (!name) return;
    const response = await fetch(`/api/ceza-sorgula?username=${name}`);
    const data = await response.json();
    saveHistory(name);
    setResult(data);
  };

  return (
    <section className="mx-auto max-w-4xl space-y-4 px-4 py-10">
      <h1 className="font-orbitron text-4xl">Ceza Sorgula</h1>
      <div className="flex gap-2">
        <Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Minecraft kullanıcı adı" />
        <Button onClick={() => search(username)}>Sorgula</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <button key={item} onClick={() => search(item)} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">
            {item}
          </button>
        ))}
      </div>

      {result.status === "clean" ? (
        <Card className="border-[var(--success)]">✅ Bu oyuncu için aktif ceza bulunmamaktadır.</Card>
      ) : null}
      {result.status === "not_found" ? (
        <Card className="border-[var(--warning)]">Kullanıcı bulunamadı.</Card>
      ) : null}
      {result.status === "has_penalty" ? (
        <Card className="border-[var(--danger)]">
          <p className="mb-3">🚫 Aktif cezalar</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Ceza Türü</th>
                  <th className="text-left">Sebep</th>
                  <th className="text-left">Tarih</th>
                  <th className="text-left">Bitiş</th>
                  <th className="text-left">Durum</th>
                </tr>
              </thead>
              <tbody>
                {result.penalties.map((penalty) => (
                  <tr key={penalty.id}>
                    <td>{penalty.type}</td>
                    <td>{penalty.reason}</td>
                    <td>{new Date(penalty.createdAt).toLocaleDateString("tr-TR")}</td>
                    <td>{penalty.duration ?? "-"}</td>
                    <td>{penalty.isActive ? "Aktif" : "Pasif"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}
    </section>
  );
}


