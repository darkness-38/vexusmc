"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, Wallet, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

        <div className="hidden lg:block relative" ref={dropdownRef}>
          {session?.user ? (
            <div className="flex items-center">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm transition-colors hover:bg-[var(--bg-tertiary)] rounded-full pr-3 p-1"
              >
                <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] px-3 py-1 mr-1">
                  <span className="font-bold text-[var(--accent-green)]">{session.user.balance}</span>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">VC</span>
                </div>
                <Avatar username={session.user.username} size={32} />
                <span className="font-medium">{session.user.username}</span>
                <ChevronDown size={16} className={cn("transition-transform", userMenuOpen ? "rotate-180" : "")} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-14 w-56 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-lg overflow-hidden flex flex-col"
                  >
                    <Link href="/hesabim" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[var(--bg-tertiary)] transition-colors">
                      <User size={16} className="text-[var(--text-secondary)]" />
                      Profilim
                    </Link>
                    <Link href="/bakiye-yukle" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[var(--bg-tertiary)] transition-colors group">
                      <Wallet size={16} className="text-[var(--accent-green)] group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-[var(--accent-green)]">Bakiye Yükle</span>
                    </Link>
                    <div className="h-[1px] bg-[var(--border)] w-full" />
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors w-full text-left">
                      <LogOut size={16} />
                      Çıkış Yap
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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
            className="border-t border-[var(--border)] bg-[var(--bg-secondary)] p-4 lg:hidden max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <hr className="border-[var(--border)]" />
              {session?.user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2 p-2 bg-[var(--bg-tertiary)] rounded-lg">
                    <Avatar username={session.user.username} size={40} />
                    <div>
                      <div className="font-medium">{session.user.username}</div>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <span className="font-bold text-[var(--accent-green)]">{session.user.balance}</span>
                        <span className="text-[var(--text-secondary)]">VC Bakiye</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/hesabim" onClick={() => setOpen(false)} className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-tertiary)] transition-colors">
                    <User size={18} className="text-[var(--text-secondary)]" />
                    Profilim
                  </Link>
                  <Link href="/bakiye-yukle" onClick={() => setOpen(false)} className="flex items-center gap-2 p-3 rounded-lg border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/10 hover:bg-[var(--accent-green)]/20 transition-colors">
                    <Wallet size={18} className="text-[var(--accent-green)]" />
                    <span className="font-semibold text-[var(--accent-green)]">Bakiye Yükle</span>
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center justify-center gap-2 p-3 mt-2 rounded-lg bg-[var(--danger)]/10 text-[var(--danger)] hover:bg-[var(--danger)]/20 transition-colors w-full">
                    <LogOut size={18} />
                    Çıkış Yap
                  </button>
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
