import Link from "next/link";
import { SERVER_IP } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-orbitron text-xl">⚡VEXUS<span className="text-[var(--accent-green)]">MC</span></p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Türkiye&apos;nin en iyi Minecraft sunucusu</p>
          <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm">IP: {SERVER_IP}</div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Hızlı Linkler</h4>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <Link href="/">Ana Sayfa</Link><br />
            <Link href="/magaza">Mağaza</Link><br />
            <Link href="/liderlik">Liderlik</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Destek</h4>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <Link href="/iletisim">İletişim</Link><br />
            <Link href="/kurallar">Kurallar</Link><br />

          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Sosyal</h4>
          <p className="text-sm text-[var(--text-secondary)]">Discord, Twitter, YouTube, Instagram</p>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-3 text-center text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} VexusMC. Minecraft, Mojang Studios&apos;un tescilli markasıdır.
      </div>
    </footer>
  );
}


