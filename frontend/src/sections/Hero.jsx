import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/hero.png';

// ─── Scroll indicator ─────────────────────────────────────────────────────
const ScrollIndicator = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    aria-label="Gulir ke bagian berikutnya"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl p-2"
  >
    <motion.span
      className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      Gulir ke bawah
    </motion.span>

    <div className="relative w-6 h-9 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors duration-300 flex items-start justify-center pt-1.5 overflow-hidden">
      <motion.div
        className="w-1 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300"
        animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.3 }}
      />
    </div>

    <div className="flex flex-col items-center -mt-0.5 gap-0">
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          width="12" height="7" viewBox="0 0 12 7" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/40 group-hover:text-white/70 transition-colors duration-300"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, 3, 0] }}
          transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, delay: i * 0.18 }}
          aria-hidden="true"
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      ))}
    </div>
  </motion.button>
);

// ─── Main component ────────────────────────────────────────────────────────
export const Hero = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.72, 0.90]);

  const scrollToNext = () => {
    if (!sectionRef.current) return;
    const next = sectionRef.current.nextElementSibling;
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Hero — Bulan PRB 2026"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        <motion.img
          src="/hero.jpeg"
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── Dark gradient overlay ── */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/75 pointer-events-none"
      />

      {/* ── Radial vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.40) 100%)',
        }}
      />

      {/* ── Bottom fade to page background ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 z-10 h-20 bg-gradient-to-t from-[#F4F5F7] to-transparent pointer-events-none"
      />

      {/* ── Grain overlay (subtle texture) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '128px 128px',
        }}
      />

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 inset-x-0 z-20 flex justify-center" aria-hidden="true">
        <ScrollIndicator onClick={scrollToNext} />
      </div>
    </section>
  );
};
