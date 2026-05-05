"use client";

import { Avatar } from "@/components/ui/Avatar";

interface Row {
  username: string;
  score: number;
  rank: string;
}

export function LeaderboardTable({
  rows,
  currentUser,
  startRank = 1,
}: {
  rows: Row[];
  currentUser?: string;
  startRank?: number;
}) {
  return (
    <div className="card-base overflow-x-auto p-4">
      <table className="w-full min-w-[680px] text-sm">
        <thead>
          <tr className="text-left text-[var(--text-secondary)]">
            <th className="px-2 py-2">Sıra</th>
            <th className="px-2 py-2">Oyuncu</th>
            <th className="px-2 py-2">Skor</th>
            <th className="px-2 py-2">Rank</th>
            <th className="px-2 py-2">Oyun Süresi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const order = startRank + index;
            const isTopTen = order >= 4 && order <= 10;
            const isCurrent = row.username === currentUser;
            return (
              <tr key={row.username + index} className={`border-t border-[var(--border)] transition-all duration-300 hover:bg-[var(--bg-tertiary)] ${isCurrent ? "bg-[var(--accent-green)]/10" : ""}`}>
                <td className={`px-2 py-2 font-semibold ${isTopTen ? "text-slate-300" : ""}`}>{order}</td>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar username={row.username} size={28} />
                    {row.username}
                  </div>
                </td>
                <td className="px-2 py-2">{row.score.toLocaleString("tr-TR")}</td>
                <td className="px-2 py-2">{row.rank}</td>
                <td className="px-2 py-2">{Math.floor(row.score / 12)} saat</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

