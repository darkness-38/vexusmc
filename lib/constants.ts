import type { FeatureItem, GameModeItem, RankPackage } from "@/types";

export const SERVER_IP = "oyna.vexusmc.tech";

export const LIVE_STATS_MARQUEE = [
  "⚔️ 2,450 Kayıtlı",
  "🌍 98 Çevrimiçi",
  "🏆 1,200 Günlük Oyuncu",
  "💎 847 VIP+ Üye",
  "🎮 4 Oyun Modu",
];

export const FEATURES: FeatureItem[] = [
  { icon: "⚔️", title: "Benzersiz Modlar", description: "Başka hiçbir yerde bulamayacağın özel oyun deneyimleri" },
  { icon: "🛡️", title: "Anti-Hile", description: "7/24 aktif hile koruması, adil oyun garantisi" },
  { icon: "💎", title: "Rank Sistemi", description: "VIP'ten MVP'ye kadar ayrıcalıklı paketler" },
  { icon: "⚡", title: "Yüksek Performans", description: "Düşük ping, yüksek TPS, kesintisiz oyun" },
  { icon: "🌍", title: "Türkçe Destek", description: "Tamamen Türkçe arayüz ve Türk moderatör ekibi" },
  { icon: "🎁", title: "Haftalık Etkinlikler", description: "Ödüllü turnuvalar ve özel etkinlikler" },
];

export const GAME_MODES: GameModeItem[] = [
  { key: "survival", name: "Survival", description: "Ekonomi, klanlar ve görev sistemi.", online: 41, gradient: "from-emerald-600/80 to-amber-700/60" },
  { key: "bedwars", name: "BedWars", description: "Takım savaşı ve hızlı aksiyon.", online: 22, gradient: "from-rose-600/70 to-blue-700/60" },
  { key: "skyblock", name: "SkyBlock", description: "Ada geliştir, ticaret yap, yüksel.", online: 19, gradient: "from-cyan-500/70 to-sky-700/50" },
  { key: "kitpvp", name: "KitPvP", description: "Hazır kitlerle anlık düello.", online: 16, gradient: "from-orange-600/80 to-zinc-900/80" },
];

export const RANK_PACKAGES: RankPackage[] = [
  { name: "VIP", price: "29₺", perks: ["Renkli Nick", "Özel Prefix", "Kit Bonusu: Küçük"] },
  { name: "VIP+", price: "59₺", popular: true, perks: ["Renkli Nick", "Özel Prefix", "Fly (Lobby)", "Kit Bonusu: Orta", "Öncelikli Giriş"] },
  { name: "MVP", price: "99₺", perks: ["Renkli Nick", "Özel Prefix", "Fly (Lobby)", "Kit Bonusu: Büyük", "Özel Efektler", "Öncelikli Giriş"] },
];

