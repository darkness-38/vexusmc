const steps = [
  { title: "Minecraft'ı Aç", desc: "Java veya Bedrock Edition" },
  { title: "IP'yi Ekle", desc: "oyna.vexusmc.tech" },
  { title: "Oynamaya Başla", desc: "Topluluğa katıl!" },
];

export function HowToJoin() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-center font-orbitron text-3xl">Nasıl Katılırım?</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <article key={step.title} className="card-base p-5 text-center">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-[var(--accent-green)] text-black">{i + 1}</div>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

