"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";

interface DiscordMember {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  status: "online" | "idle" | "dnd";
  avatar_url: string;
}

interface DiscordWidgetData {
  id: string;
  name: string;
  instant_invite: string;
  presence_count: number;
  members: DiscordMember[];
}

export function DiscordWidget() {
  const [data, setData] = useState<DiscordWidgetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1494737331528269940/widget.json")
      .then((res) => {
        if (!res.ok) throw new Error("Discord API Hatası");
        return res.json();
      })
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Discord widget fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-32 rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl animate-pulse"></div>
    );
  }

  // Eğer widget verisi yüklenemezse veya sunucuda widget aktif değilse gizle
  if (!data || !data.id) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full p-6 rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl relative overflow-hidden">
      {/* Hafif Premium Glow Efekti */}
      <div className="absolute inset-0 bg-[#5865F2]/5 rounded-2xl pointer-events-none"></div>
      
      {/* Sol Bölüm: Bilgi ve Eylem */}
      <div className="flex flex-col space-y-4 z-10 w-full md:w-auto text-center md:text-left">
        <div>
          <h3 className="text-2xl font-bold text-white">{data.name}</h3>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-zinc-400">
              Şu an <span className="text-zinc-200">{data.presence_count}</span> kişi çevrimiçi
            </span>
          </div>
        </div>
        
        <a 
          href={data.instant_invite || "https://discord.gg"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-all duration-200 w-full md:w-fit"
        >
          <Users size={18} />
          Sunucuya Katıl
        </a>
      </div>

      {/* Sağ Bölüm: Aktif Üyeler */}
      <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end z-10 w-full md:w-auto">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Çevrimiçi Üyeler</span>
        <div className="flex -space-x-3 p-1">
          {data.members.slice(0, 12).map((member) => (
            <div key={member.id} className="relative inline-block rounded-full ring-2 ring-zinc-900 bg-zinc-800 group">
              {member.avatar_url ? (
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    src={member.avatar_url}
                    alt={member.username}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
                  {member.username.charAt(0).toUpperCase()}
                </div>
              )}
              
              {/* Durum Noktası (Status Indicator) */}
              <span 
                className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-zinc-900 ${
                  member.status === "online" ? "bg-emerald-500" :
                  member.status === "idle" ? "bg-amber-500" :
                  member.status === "dnd" ? "bg-rose-500" : "bg-zinc-500"
                }`}
              ></span>
              
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                {member.username}
              </div>
            </div>
          ))}
          
          {/* Geri kalan üyeler için +X simgesi */}
          {data.presence_count > 12 && (
            <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-zinc-900 bg-zinc-800 text-xs font-bold text-zinc-300">
              +{data.presence_count - 12}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
