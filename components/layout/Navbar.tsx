"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/magaza", label: "Mağaza" },
  { href: "/liderlik", label: "Liderlik" },
  { href: "/kurallar", label: "Kurallar" },
  { href: "/iletisim", label: "İletişim" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-orbitron text-xl font-bold">
          ⚡VEXUS<span className="text-[var(--accent-green)]">MC</span>
        </Link>

        <nav className="hidden gap-6 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="relative pb-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--accent-green)]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link href="/hesabim" className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent-green)]">
                <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-1 mr-1">
                  <span className="font-bold text-[var(--accent-green)]">{session.user.balance}</span>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">VC</span>
                </div>
                <Avatar username={session.user.username} size={32} />
                <span className="font-medium">{session.user.username}</span>
              </Link>
              <Button variant="secondary" onClick={() => signOut({ callbackUrl: "/" })}>Çıkış</Button>
            </div>
          ) : (
            <Link href="/giris"><Button>Giriş Yap</Button></Link>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="border-t border-[var(--border)] bg-[var(--bg-secondary)] p-4 lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <hr className="border-[var(--border)]" />
              {session?.user ? (
                <div className="flex flex-col gap-3">
                  <Link href="/hesabim" className="flex items-center gap-2 text-sm" onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-1 mr-1">
                      <span className="font-bold text-[var(--accent-green)]">{session.user.balance}</span>
                      <span className="text-xs font-medium text-[var(--text-secondary)]">VC</span>
                    </div>
                    <Avatar username={session.user.username} size={32} />
                    <span className="font-medium">{session.user.username}</span>
                  </Link>
                  <Button variant="secondary" onClick={() => signOut({ callbackUrl: "/" })}>Çıkış</Button>
                </div>
              ) : (
                <Link href="/giris" onClick={() => setOpen(false)}><Button className="w-full">Giriş Yap</Button></Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
