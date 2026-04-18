import { motion, useReducedMotion } from 'framer-motion';
import { Crown, ShieldCheck, Sparkles, Swords, Users, Zap } from 'lucide-react';
import CopyIpButton from './components/CopyIpButton';

const features = [
  {
    icon: ShieldCheck,
    title: 'Stabil ve Guvenli',
    description: 'Gelistirilmis anti-cheat, duzenli yedekleme ve optimize altyapi ile kesintisiz oyun.'
  },
  {
    icon: Sparkles,
    title: 'Premium Oynanis',
    description: 'Siniflar, ozel etkinlikler, sezonluk oduller ve ozgun ekonomi sistemi bir arada.'
  },
  {
    icon: Users,
    title: 'Guculu Topluluk',
    description: 'Aktif yonetim ekibi, gunluk etkinlikler ve rekabetci lig sistemiyle dolu bir ortam.'
  }
];

const stats = [
  { label: 'Aktif Oyuncu', value: '1.2K+' },
  { label: 'Gunluk Etkinlik', value: '10+' },
  { label: 'Online Sure', value: '99.9%' },
  { label: 'Yanit Suresi', value: '<20ms' }
];

const gameModes = [
  { icon: Swords, name: 'PvP Arenasi', detail: 'Sezonluk rank sistemi ve ozel oduller.' },
  { icon: Crown, name: 'Kingdoms', detail: 'Takim savaslari, bolge fethi ve strateji.' },
  { icon: Zap, name: 'SkyBlock+', detail: 'Gelistirilmis gorevler ve premium market.' }
];

function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="section-title">
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default function App() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">V</span>
          <div>
            <strong>VexusMC</strong>
            <small>Premium Minecraft Network</small>
          </div>
        </div>
        <a className="btn btn-ghost" href="#katil">
          Hemen Basla
        </a>
      </header>

      <main>
        <section className="hero" id="katil">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.65 }}
            className="hero-copy"
          >
            <span className="badge">TR Premium Server</span>
            <h1>
              VexusMC ile <em>next-level</em> Minecraft deneyimi
            </h1>
            <p>
              Ozel event altyapisi, optimize performans, premium kozmetik ve rekabetci oyun modlariyla
              siradan sunuculardan ayril.
            </p>
            <div className="hero-actions">
              <CopyIpButton />
              <a className="btn btn-ghost" href="#modlar">
                Modlari Kesfet
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.12 }}
            className="hero-card"
            aria-label="VexusMC durum karti"
          >
            <h3>Server Durumu</h3>
            <ul>
              <li>
                <span>IP</span>
                <strong>oyna.vexusmc.tech</strong>
              </li>
              <li>
                <span>Versiyon</span>
                <strong>1.8 - 1.20+</strong>
              </li>
              <li>
                <span>Durum</span>
                <strong className="online">Online</strong>
              </li>
            </ul>
          </motion.div>
        </section>

        <section className="stats">
          {stats.map((item) => (
            <article key={item.label}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </section>

        <section className="features">
          <SectionTitle
            kicker="Neden VexusMC?"
            title="Premium kalite, akici oynanis"
            subtitle="Hem casual hem competitive oyuncular icin ince ayarli bir deneyim."
          />

          <div className="feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="feature-card"
                >
                  <Icon size={24} />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="modes" id="modlar">
          <SectionTitle
            kicker="Oyun Modlari"
            title="Her tarz oyuncu icin farkli deneyim"
            subtitle="Rekabete gir, imparatorluk kur, adani buyut."
          />

          <div className="mode-grid">
            {gameModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <article key={mode.name} className="mode-card">
                  <Icon size={20} />
                  <h3>{mode.name}</h3>
                  <p>{mode.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="cta-panel">
          <h2>Hazirsan, sunucuda yerini al.</h2>
          <p>IP adresini kopyala, launcher'i ac ve VexusMC'ye baglan.</p>
          <CopyIpButton />
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} VexusMC. Tum haklari saklidir.</p>
      </footer>
    </div>
  );
}

