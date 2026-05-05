import { Crown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

interface PodiumUser {
  username: string;
  score: number;
}

export function Podium({ topThree }: { topThree: PodiumUser[] }) {
  const slots = [topThree[1], topThree[0], topThree[2]];

  return (
    <div className="grid items-end gap-4 md:grid-cols-3">
      {slots.map((player, index) => {
        if (!player) return <div key={index} />;
        const place = index === 1 ? 1 : index === 0 ? 2 : 3;
        const medal = place === 1 ? "🥇" : place === 2 ? "🥈" : "🥉";
        const height = place === 1 ? "md:min-h-64" : "md:min-h-56";
        return (
          <div key={player.username} className={`card-base ${height} p-4 text-center ${place === 1 ? "border-[var(--accent-gold)] shadow-glowGreen" : ""}`}>
            <p className="mb-1 text-xl">{medal}</p>
            <Crown className="mx-auto mb-2" color={place === 1 ? "#f59e0b" : "#94a3b8"} />
            <div className="mx-auto w-fit"><Avatar username={player.username} size={64} /></div>
            <p className="mt-2 font-semibold">{player.username}</p>
            <p className="text-sm text-[var(--text-secondary)]">{player.score.toLocaleString("tr-TR")} skor</p>
            <p className="mt-2 text-xs text-[var(--text-muted)]">{place}. sıra</p>
          </div>
        );
      })}
    </div>
  );
}

