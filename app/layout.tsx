import type { Metadata } from "next";
import { Orbitron, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { Toast } from "@/components/ui/Toast";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "VexusMC",
  description: "Türkiye'nin en güçlü Minecraft deneyimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${orbitron.variable} ${outfit.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
