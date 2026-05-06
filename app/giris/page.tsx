"use client";

import { Suspense, useState } from "react";


import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Sword } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  username: z.string().min(3).max(16).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(6).max(50),
});

type FormValues = z.infer<typeof schema>;

function GirisPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/hesabim";

  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        form.setError("root", { message: "Kullanıcı adı veya şifre hatalı." });
        setLoading(false);
        return;
      }

      if (result?.ok) {
        // Hard redirect — ensures the browser sends the fresh auth cookie
        // on the next request. router.push() (soft navigation) can hang
        // because the middleware doesn't see the cookie on a client-side nav.
        window.location.href = redirect;
        return;
      }

      // Fallback: unexpected response shape
      setShake(true);
      setTimeout(() => setShake(false), 500);
      form.setError("root", { message: "Bir hata oluştu. Lütfen tekrar deneyin." });
      setLoading(false);
    } catch {
      // Network error / timeout
      form.setError("root", { message: "Sunucuya bağlanılamadı. Lütfen tekrar deneyin." });
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-64px)] place-items-center px-4">
      <motion.div
        animate={shake ? { x: [0, -8, 8, -8, 0] } : { x: 0 }}
        className="glass w-full max-w-md p-6"
      >
        <h1 className="mb-6 text-center font-orbitron text-2xl">VexusMC&apos;ye Giriş Yap</h1>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="block text-sm">Kullanıcı Adı</label>
          <div className="relative">
            <Sword className="absolute left-3 top-2.5 text-[var(--text-muted)]" size={18} />
            <Input className="pl-10" {...form.register("username")} />
          </div>
          {form.formState.errors.username ? (
            <motion.p initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-sm text-[var(--danger)]">
              {form.formState.errors.username.message}
            </motion.p>
          ) : null}

          <label className="block text-sm">Şifre</label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} className="pr-10" {...form.register("password")} />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-2.5 text-[var(--text-muted)]">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {form.formState.errors.password ? (
            <motion.p initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-sm text-[var(--danger)]">
              {form.formState.errors.password.message}
            </motion.p>
          ) : null}

          {form.formState.errors.root ? <p className="text-sm text-[var(--danger)]">{form.formState.errors.root.message}</p> : null}

          <Button className="mt-2 w-full" disabled={loading}>
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>



        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-3 text-sm text-[var(--text-secondary)]">
          Henüz hesabın yok mu? Sunucuya ilk kez bağlandığınızda oyun içerisinde '/register <şifre> <şifre>' komutuyla hesabınız otomatik olarak oluşturulur.
          </div>
          </motion.div>
        </div>
        );
}

        export default function GirisPage() {
  return (
        <Suspense fallback={<div className="grid min-h-[calc(100vh-64px)] place-items-center">Yükleniyor...</div>}>
          <GirisPageContent />
        </Suspense>
        );
}




