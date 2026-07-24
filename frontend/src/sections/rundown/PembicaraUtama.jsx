import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Share2 } from 'lucide-react';
import { pembicara } from '../../data';

// Position offsets for 6 items around the central orb in desktop layout
// Angles: top-left (-135deg), top-right (-45deg), mid-left (-180deg), mid-right (0deg), bot-left (135deg), bot-right (45deg)
const desktopPositions = [
  'lg:col-start-1 lg:row-start-1 lg:justify-self-end lg:-translate-x-6 lg:translate-y-4', // 1: Top Left
  'lg:col-start-3 lg:row-start-1 lg:justify-self-start lg:translate-x-6 lg:translate-y-4', // 2: Top Right
  'lg:col-start-1 lg:row-start-2 lg:justify-self-end lg:-translate-x-12 lg:self-center',  // 3: Mid Left
  'lg:col-start-3 lg:row-start-2 lg:justify-self-start lg:translate-x-12 lg:self-center', // 4: Mid Right
  'lg:col-start-1 lg:row-start-3 lg:justify-self-end lg:-translate-x-6 lg:-translate-y-4',// 5: Bot Left
  'lg:col-start-3 lg:row-start-3 lg:justify-self-start lg:translate-x-6 lg:-translate-y-4',// 6: Bot Right
];

const SpeakerNode = ({ speaker, index, total }) => {
  // Determine if content text sits on left or right for balanced symmetry in radial view
  const isLeft = index % 2 === 0;

  const posClass = desktopPositions[index] || '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={`group relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${
        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } ${posClass} w-full max-w-sm lg:max-w-md p-4 rounded-3xl transition-all duration-500 hover:bg-white/40 dark:hover:bg-white/[0.04] backdrop-blur-sm`}
    >
      {/* Content Block */}
      <div
        className={`flex flex-col text-center sm:text-left ${
          isLeft ? 'lg:text-right' : 'lg:text-left'
        } space-y-1.5 flex-1 order-2 sm:order-1`}
      >
        <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-300 leading-snug tracking-tight">
          {speaker.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-text-secondary line-clamp-1">
          {speaker.title}
        </p>
        <p className="text-[11px] text-text-secondary/80 font-normal line-clamp-2 leading-relaxed hidden sm:block">
          GUEST STAR & PEMBICARA UTAMA PRB 2026
        </p>

        {/* Action / Social pill triggers */}
        <div
          className={`flex items-center justify-center sm:justify-start ${
            isLeft ? 'lg:justify-end' : 'lg:justify-start'
          } gap-2 pt-1`}
        >
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-primary bg-primary/10 border border-primary/20">
            {speaker.institution}
          </span>
          <button
            aria-label={`Lihat info ${speaker.name}`}
            className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/40 hover:scale-110 transition-all duration-300"
          >
            <Globe className="w-3 h-3" />
          </button>
          <button
            aria-label={`Bagikan profile ${speaker.name}`}
            className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/40 hover:scale-110 transition-all duration-300"
          >
            <Share2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Avatar Node with Double Bezel */}
      <div className="relative order-1 sm:order-2 shrink-0">
        {/* Outer Ring Accent */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/30 via-emerald-400/20 to-primary/5 opacity-80 group-hover:opacity-100 group-hover:scale-105 blur-sm transition-all duration-500" />

        {/* Double-Bezel Shell */}
        <div className="relative p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-primary/20 ring-4 ring-primary/10 transition-transform duration-500 group-hover:scale-[1.03]">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden relative">
            <img
              src={speaker.photo}
              alt={`Foto ${speaker.name}`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
            />
            {/* Subtle Overlay Lens */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PembicaraUtama = () => {
  const displaySpeakers = pembicara.slice(0, 6);

  return (
    <section
      id="pembicara"
      aria-label="Bintang Tamu Acara Puncak Bulan PRB 2026"
      className="relative py-24 sm:py-32 lg:py-40 bg-app-gradient overflow-hidden"
    >
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.1]"
          >
            Pengisi Acara
          </motion.h2>
        </div>

        {/* Radial Orbit Layout Container */}
        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* Central Highlight Orb (Desktop & Tablet focal center) */}
          <div className="hidden lg:flex absolute z-10 col-start-2 row-start-2 items-center justify-center pointer-events-none">
            {/* Outer Pulsing Aura Ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-primary/40 to-emerald-400/20 blur-xl"
            />

            {/* Core Circle Center Shield */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-primary via-primary-600 to-amber-600 text-white p-2 shadow-[0_20px_60px_rgba(16,185,129,0.35)] border-4 border-white/30 flex flex-col items-center justify-center text-center backdrop-blur-xl pointer-events-auto group cursor-pointer"
            >
              <div className="relative z-10 p-6 flex flex-col items-center justify-center space-y-2">
                <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  14 Oktober 2026
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                  Puncak Peringatan
                  <br />
                  Bulan PRB 2026
                </h3>
              </div>

              {/* Decorative subtle concentric SVG ring */}
              <svg
                className="absolute inset-0 w-full h-full text-white/20 animate-[spin_40s_linear_infinite]"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                />
              </svg>
            </motion.div>
          </div>

          {/* Orbit Grid Layout */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-8 lg:gap-y-6 items-center justify-items-center">
            {displaySpeakers.map((speaker, index) => (
              <SpeakerNode
                key={speaker.id}
                speaker={speaker}
                index={index}
                total={displaySpeakers.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

