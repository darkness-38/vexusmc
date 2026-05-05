"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const menu = [
  { href: "/hesabim", label: "Profilim" },
  { href: "/hesabim/bakiye", label: "Bakiyem" },
  { href: "/hesabim/siparisler", label: "Siparişlerim" },
  { href: "/hesabim/guvenlik", label: "Güvenlik" },
];

export function Sidebar({ username, rank }: { username: string; rank: string }) {
  const pathname = usePathname();

  return (
    <aside className="card-base h-fit p-4">
      <div className="mb-5 flex items-center gap-3">
        <Avatar username={username} />
        <div>
          <p className="font-semibold">{username}</p>
          <Badge>{rank}</Badge>
        </div>
      </div>
      <nav className="grid gap-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-all duration-300",
              pathname === item.href ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

