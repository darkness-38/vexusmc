import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="coming-soon-shell">
      <motion.div
        className="coming-soon-container"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="stars-bg" />

        <motion.div className="brand-mark-large" variants={itemVariants}>
          <span>V</span>
        </motion.div>

        <motion.h1 variants={itemVariants}>VexusMC</motion.h1>

        <motion.p className="subtitle" variants={itemVariants}>
          Premium Minecraft deneyimi yakinda geliyor
        </motion.p>

        <motion.div className="divider" variants={itemVariants} />

        <motion.div className="features-preview" variants={itemVariants}>
          <div className="feature-item">
            <span className="dot" />
            <span>Ozel oyun modlari</span>
          </div>
          <div className="feature-item">
            <span className="dot" />
            <span>Premium ekonomi</span>
          </div>
          <div className="feature-item">
            <span className="dot" />
            <span>Rekabetci ortam</span>
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit} className="email-form" variants={itemVariants}>
          <input
            type="email"
            placeholder="E-postanizi girin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email adresi"
          />
          <button type="submit" className="btn-notify">
            {submitted ? 'Kaydedildi! ✓' : 'Bildirim Al'}
          </button>
        </motion.form>

        <motion.p className="countdown-text" variants={itemVariants}>
          {submitted ? 'Harika! Geliste biz seni haberdar edicegiz.' : 'Sunucu cok yakininda online olacak.'}
        </motion.p>
      </motion.div>

      <footer className="coming-soon-footer">
        <p>
          © {new Date().getFullYear()} VexusMC. Made with <Heart size={14} className="heart" /> for gamers.
        </p>
      </footer>
    </div>
  );
}

