import React from 'react';
import { motion } from 'framer-motion';
import { mitraUtama, mitraStrategis, allMitra } from '../data';

export const MitraSponsor = () => {
  // Duplicate for seamless marquee loop
  const marqueeItems = [...allMitra, ...allMitra];

  return (
    <section
      id="mitra"
      aria-label="Mitra dan dukungan strategis Bulan PRB 2026"
      className="py-16 sm:py-20 bg-background overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center max-w-xl mx-auto"
        >
          {/* <span className="section-label text-text-secondary">Didukung Oleh</span> */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Mitra &amp; Sponsor
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Bulan PRB 2026 terlaksana atas kolaborasi lintas sektor dan dukungan penuh dari berbagai instansi nasional dan internasional.
          </p>
        </motion.div>
      </div>

      {/* Mitra Utama grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="section-label text-text-secondary text-center mb-6">Mitra utama</p>
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          role="list"
          aria-label="Daftar mitra utama"
        >
          {mitraUtama.map((m, i) => (
            <motion.div
              key={m.id}
              role="listitem"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100/80 p-6 flex flex-col items-center gap-3 hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/6 flex items-center justify-center" aria-hidden="true">
                <span className="text-xl font-extrabold text-primary">{m.name[0]}</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-text-primary">{m.name}</p>
                <p className="text-[10px] text-text-secondary font-medium mt-0.5 leading-snug">{m.fullName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mitra Strategis grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <p className="section-label text-text-secondary text-center mb-6">Mitra strategis</p>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
          role="list"
          aria-label="Daftar mitra strategis"
        >
          {mitraStrategis.map((m, i) => (
            <motion.div
              key={m.id}
              role="listitem"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="bg-white rounded-xl shadow-soft border border-slate-100/80 p-4 flex flex-col items-center gap-2 hover:shadow-soft-hover transition-shadow duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center" aria-hidden="true">
                <span className="text-sm font-extrabold text-text-secondary">{m.name[0]}</span>
              </div>
              <p className="text-xs font-bold text-text-primary leading-tight">{m.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee — all partners */}
      <div className="relative" aria-label="Semua mitra Bulan PRB 2026" aria-hidden="true">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-5 w-max py-3"
          style={{ animation: 'marquee 38s linear infinite' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {marqueeItems.map((p, i) => (
            <div
              key={i}
              className="h-13 px-5 bg-white rounded-2xl shadow-soft border border-slate-100/80 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <div className="w-6 h-6 rounded-md bg-primary/8 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-extrabold text-primary">{p.name[0]}</span>
              </div>
              <span className="text-xs font-bold text-text-secondary">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
