"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6).max(50),
    confirmPassword: z.string().min(6),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Şifreler eşleşmiyor",
  });

type FormValues = z.infer<typeof schema>;

export function PasswordForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });
  const newPassword = form.watch("newPassword") ?? "";

  const score = useMemo(() => {
    const value = newPassword;
    let total = 0;
    if (value.length >= 8) total++;
    if (/[A-Z]/.test(value)) total++;
    if (/[a-z]/.test(value)) total++;
    if (/[0-9]/.test(value)) total++;
    if (/[^a-zA-Z0-9]/.test(value)) total++;
    return total;
  }, [newPassword]);

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Şifren başarıyla güncellendi.");
      form.reset();
    }, 800);
  };

  return (
    <form className="card-base space-y-3 p-5" onSubmit={form.handleSubmit(onSubmit)}>
      <Input type="password" placeholder="Mevcut şifre" {...form.register("currentPassword")} />
      <Input type="password" placeholder="Yeni şifre" {...form.register("newPassword")} />
      <Input type="password" placeholder="Yeni şifre (tekrar)" {...form.register("confirmPassword")} />
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={`h-2 rounded ${index < score ? "bg-[var(--accent-green)]" : "bg-[var(--bg-tertiary)]"}`} />
        ))}
      </div>
      <Button disabled={loading} className="w-full">{loading ? "Güncelleniyor..." : "Şifreyi Değiştir"}</Button>
    </form>
  );
}


