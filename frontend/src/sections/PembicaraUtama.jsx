import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { pembicara } from '../data';

const TeamBlock = ({ speaker, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center text-center gap-3"
  >
    {/* Avatar */}
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-1 ring-black/5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <img
        src={speaker.photo}
        alt={`Foto ${speaker.name}`}
        loading="lazy"
        className="w-full h-full object-cover object-top"
      />
    </div>

    {/* Role pill */}
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary bg-primary/[0.06] ring-1 ring-primary/15">
      {speaker.institution}
    </span>

    {/* Name */}
    <h3 className="text-sm sm:text-base font-semibold text-text-primary leading-snug">
      {speaker.name}
    </h3>

    {/* Title */}
    <p className="text-xs text-text-secondary font-normal leading-snug -mt-1">
      {speaker.title}
    </p>
  </motion.div>
);

export const PembicaraUtama = () => {
  return (
    <section
      id="pembicara"
      aria-label="Pembicara utama Bulan PRB 2026"
      className="py-24 sm:py-32 lg:py-40 bg-app-gradient"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row — left stack + right button, same baseline */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 max-w-xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.1] text-balance">
              Pembicara utama
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Para ahli kebencanaan, praktisi lapangan, dan pakar internasional yang akan berbagi ilmu di Bulan PRB 2026.
            </p>
          </motion.div>
        </div>

        {/* Transparent container — 4x2 grid, no shadow/border */}
        <div className="bg-transparent">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 sm:gap-y-16">
            {pembicara.map((spk, i) => (
              <TeamBlock key={spk.id} speaker={spk} delay={(i % 4) * 0.06} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
