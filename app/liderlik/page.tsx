"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Podium } from "@/components/liderlik/Podium";
import { LeaderboardTable } from "@/components/liderlik/LeaderboardTable";

const tabs = ["genel", "survival", "skyblock", "bedwars", "kitpvp"];
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LeaderboardEntry {
  username: string;
  score: number;
  rank: string;
}

export default function LiderlikPage() {
  const [mode, setMode] = useState("genel");
  const { data = [], isLoading } = useSWR<LeaderboardEntry[]>(
    `/api/liderlik?mode=${mode}`,
    fetcher,
  );
  const { data: session } = useSession();

  const topThree = useMemo(() => data.slice(0, 3), [data]);
  const rest = useMemo(() => data.slice(3), [data]);

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-10">
      <h1 className="font-orbitron text-4xl">Liderlik Tablosu</h1>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className="relative rounded-lg border border-[var(--border)] px-4 py-2 text-sm"
          >
            {tab[0]?.toUpperCase() + tab.slice(1)}
            {mode === tab ? (
              <motion.span
                layoutId="active-tab"
                className="absolute inset-0 -z-10 rounded-lg bg-[var(--accent-green)]/15"
              />
            ) : null}
          </button>
        ))}
      </div>

      {isLoading ? <div className="card-base p-4">Liderlik verileri yükleniyor...</div> : null}
      {!isLoading && data.length === 0 ? (
        <div className="card-base p-4">Bu mod için henüz liderlik verisi bulunamadı.</div>
      ) : null}
      {!isLoading && data.length > 0 ? (
        <>
          <Podium topThree={topThree} />
          <LeaderboardTable
            rows={rest}
            startRank={4}
            currentUser={session?.user?.username}
          />
        </>
      ) : null}
    </section>
  );
}

