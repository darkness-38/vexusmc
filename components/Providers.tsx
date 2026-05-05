"use client";

import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </SessionProvider>
  );
}

