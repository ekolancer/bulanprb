import React from 'react';
import { motion } from 'framer-motion';
import { mitraUtama, mitraStrategis, allMitra } from '../data';

export const MitraSponsor = () => {
  // Duplicate list for seamless loop
  const marqueeItems = [...allMitra, ...allMitra];

  return (
    <section id="mitra" className="py-16 sm:py-20 bg-background overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center max-w-xl mx-auto"
        >
          <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
            Didukung Oleh
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            Mitra & Dukungan Strategis
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Bulan PRB 2025 terlaksana atas kolaborasi lintas sektor dan dukungan penuh dari berbagai instansi nasional dan internasional.
          </p>
        </motion.div>
      </div>

      {/* Mitra Utama grid — desktop shows 4 col, tablet 2, mobile scroll */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest text-center mb-6">
          Mitra Utama
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {mitraUtama.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white rounded-2xl shadow-soft border border-gray-50 p-6 flex flex-col items-center gap-3 hover:shadow-soft-lg transition-shadow duration-300"
            >
              {/* Logo placeholder — replace with <img> when assets available */}
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center">
                <span className="text-xl font-extrabold text-primary">{m.name[0]}</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-text-primary">{m.name}</p>
                <p className="text-xxs text-text-secondary font-medium mt-0.5 leading-snug">{m.fullName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mitra Strategis grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <p className="text-xs font-bold text-text-secondary uppercase tracking-widest text-center mb-6">
          Mitra Strategis
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {mitraStrategis.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="bg-white rounded-xl shadow-soft border border-gray-50 p-4 flex flex-col items-center gap-2 hover:shadow-soft-lg transition-shadow duration-300 text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <span className="text-sm font-extrabold text-text-secondary">{m.name[0]}</span>
              </div>
              <p className="text-xs font-bold text-text-primary leading-tight">{m.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee — all partners */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-6 w-max py-3"
          style={{
            animation: 'marquee 35s linear infinite',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {marqueeItems.map((p, i) => (
            <div
              key={i}
              className="h-14 px-5 bg-white rounded-2xl shadow-soft border border-gray-50 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xxs font-extrabold text-primary">{p.name[0]}</span>
              </div>
              <span className="text-xs font-bold text-text-secondary">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
