"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const total = 900;
    const step = Math.max(1, Math.floor(value / 45));
    const timer = setInterval(() => {
      setDisplay((prev) => {
        const next = prev + step;
        if (next >= value) {
          clearInterval(timer);
          return value;
        }
        return next;
      });
    }, total / 45);

    return () => clearInterval(timer);
  }, [started, value]);

  const formatted = useMemo(
    () => `${display.toLocaleString("tr-TR")}${suffix}`,
    [display, suffix],
  );

  return (
    <span ref={ref} className="font-orbitron text-4xl text-[var(--accent-green)]">
      {formatted}
    </span>
  );
}

