import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galeriFotoData } from '../data';

const sizeToSpan = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  square: '',
};

export const GaleriFoto = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const openAt = (i) => setActiveIndex(i);
  const close = () => setActiveIndex(null);
  const prev = () => setActiveIndex((i) => (i - 1 + galeriFotoData.length) % galeriFotoData.length);
  const next = () => setActiveIndex((i) => (i + 1) % galeriFotoData.length);

  return (
    <section
      id="galeri-foto"
      aria-label="Galeri foto Bulan PRB 2026"
      className="relative py-24 sm:py-32 lg:py-40 bg-app-gradient overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #1E40AF 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 max-w-2xl mb-14 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.1] text-balance">
            Galeri Dokumentasi
          </h2>
          <p className="text-text-secondary text-base leading-relaxed">
            Rangkaian momen dari Apel Kesiapsiagaan, Pameran Teknologi Kebencanaan, hingga Simulasi Evakuasi Mandiri Bulan PRB 2026.
          </p>
        </motion.div>

        {/* Bento masonry grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {galeriFotoData.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => openAt(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative rounded-2xl overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${sizeToSpan[item.size]}`}
              aria-label={`Lihat foto: ${item.caption}`}
            >
              {/* Outer shell / double bezel edge */}
              <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl z-10 pointer-events-none" />

              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Category pill */}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold text-text-primary uppercase tracking-wide">
                {item.category}
              </span>

              {/* Expand affordance */}
              <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                <Expand className="w-3.5 h-3.5 text-white" strokeWidth={1.5} aria-hidden="true" />
              </span>

              {/* Caption */}
              <span className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-semibold text-white leading-snug">
                {item.caption}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Pratinjau foto"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          >
            <button
              onClick={close}
              aria-label="Tutup pratinjau"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              onClick={prev}
              aria-label="Foto sebelumnya"
              className="absolute left-4 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4 max-w-3xl"
            >
              <img
                src={galeriFotoData[activeIndex].src}
                alt={galeriFotoData[activeIndex].caption}
                className="max-h-[72vh] rounded-2xl object-contain shadow-2xl"
              />
              <p className="text-white text-sm font-medium text-center">
                {galeriFotoData[activeIndex].caption}
              </p>
            </motion.div>

            <button
              onClick={next}
              aria-label="Foto berikutnya"
              className="absolute right-4 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
