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
    transition={{ delay: 1.4, duration: 0.7, ease: 'easeOut' }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
  >
    {/* Label */}
    <motion.span
      className="text-xxs font-semibold tracking-[0.2em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.7, duration: 0.5 }}
    >
      Gulir ke bawah
    </motion.span>

    {/* Mouse shell */}
    <div className="relative w-6 h-9 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors duration-300 flex items-start justify-center pt-1.5 overflow-hidden">
      {/* Scroll dot — bounces inside mouse */}
      <motion.div
        className="w-1 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300"
        animate={{
          y: [0, 14, 0],
          opacity: [1, 0.2, 1],
        }}
        transition={{
          duration: 1.6,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 0.3,
        }}
      />
    </div>

    {/* Chevron trio — staggered fade + drop */}
    <div className="flex flex-col items-center -mt-0.5 gap-0">
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/40 group-hover:text-white/70 transition-colors duration-300"
          animate={{
            opacity: [0.2, 1, 0.2],
            y: [0, 3, 0],
          }}
          transition={{
            duration: 1.4,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: i * 0.18,
          }}
        >
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </div>
  </motion.button>
);

// ─── Main component ────────────────────────────────────────────────────────
export const Hero = () => {
  const sectionRef = useRef(null);

  // Parallax — bg moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.75, 0.92]);

  const scrollToNext = () => {
    if (!sectionRef.current) return;
    const next = sectionRef.current.nextElementSibling;
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <motion.img
          src={heroBg}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── Dark gradient overlay, deepens on scroll ── */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/80 pointer-events-none"
      />

      {/* ── Bottom fade to page background ── */}
      <div className="absolute bottom-0 inset-x-0 z-10 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* ── Vignette edges ── */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 inset-x-0 z-20 flex justify-center">
        <ScrollIndicator onClick={scrollToNext} />
      </div>
    </section>
  );
};
