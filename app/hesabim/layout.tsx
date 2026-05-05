import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function HesabimLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/giris");

  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <Sidebar username={session.user.username} rank={session.user.rank} />
      <div>{children}</div>
    </section>
  );
}

