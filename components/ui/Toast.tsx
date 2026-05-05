"use client";

import { Toaster } from "sonner";

export function Toast() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        style: {
          background: "#0d0d14",
          border: "1px solid rgba(255,255,255,0.07)",
          color: "#f1f5f9",
        },
      }}
    />
  );
}

