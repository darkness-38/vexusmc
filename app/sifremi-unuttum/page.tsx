"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({ username: z.string().min(3).max(16) });

type FormValues = z.infer<typeof schema>;

export default function SifremiUnuttumPage() {
  const [done, setDone] = useState(false);
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <div className="grid min-h-[calc(100vh-64px)] place-items-center px-4">
      <div className="glass w-full max-w-md p-6">
        <h1 className="mb-4 font-orbitron text-2xl">Şifremi Unuttum</h1>
        <form
          className="space-y-3"
          onSubmit={form.handleSubmit(() => {
            setDone(true);
          })}
        >
          <Input placeholder="Minecraft Kullanıcı Adı" {...form.register("username")} />
          <Button className="w-full">Sıfırlama Linki Gönder</Button>
        </form>
        {done ? (
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Eğer bu kullanıcı adı sistemde kayıtlıysa, kayıtlı e-posta adresinize sıfırlama bağlantısı gönderdik.
          </p>
        ) : null}
        <Link href="/giris" className="mt-4 inline-block text-sm text-[var(--accent-green)]">
          ← Giriş sayfasına dön
        </Link>
      </div>
    </div>
  );
}

