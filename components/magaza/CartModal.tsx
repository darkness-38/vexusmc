"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

export function CartModal() {
  const { items, isOpen, toggleCart, removeItem } = useCartStore();
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.aside
          initial={{ x: 340 }}
          animate={{ x: 0 }}
          exit={{ x: 340 }}
          className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-sm border-l border-[var(--border)] bg-[var(--bg-secondary)] p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-orbitron text-xl">Sepet</h3>
            <button onClick={toggleCart}>Kapat</button>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="rounded-lg border border-[var(--border)] p-3">
                <p>{item.icon} {item.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{item.quantity} x {item.price}₺</p>
                <button className="text-xs text-[var(--danger)]" onClick={() => removeItem(item.id)}>Kaldır</button>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="mb-3">Toplam: {total.toFixed(0)}₺</p>
            <Button className="w-full">Ödemeye Geç</Button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

