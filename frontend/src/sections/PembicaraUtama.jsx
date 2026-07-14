import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building } from 'lucide-react';
import { pembicara } from '../data';

const SpeakerCard = ({ speaker, delay = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.45, delay }}
    className="bg-white rounded-3xl shadow-soft border border-slate-100/80 overflow-hidden flex flex-col
               hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-300 h-full"
  >
    {/* Photo */}
    <div className="aspect-[4/3] overflow-hidden relative bg-slate-50">
      <img
        src={speaker.photo}
        alt={`Foto ${speaker.name}`}
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.04]"
      />
      {/* Day badge */}
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-sm text-[10px] font-bold text-primary shadow-soft">
        {speaker.day}
      </span>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col gap-3 flex-1">
      {/* Institution */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent-orange uppercase tracking-wider">
        <Building className="w-3 h-3 shrink-0" aria-hidden="true" />
        {speaker.institution}
      </div>

      {/* Name & title */}
      <div>
        <h3 className="text-base font-extrabold text-text-primary leading-snug tracking-tight">{speaker.name}</h3>
        <p className="text-xs text-text-secondary font-medium mt-0.5">{speaker.title}</p>
      </div>

      {/* Bio */}
      <p className="text-xs text-text-secondary leading-relaxed flex-1 line-clamp-3">{speaker.bio}</p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-slate-50">
        {speaker.topics.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

export const PembicaraUtama = () => {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth ?? 260;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section
      id="pembicara"
      aria-label="Pembicara utama Bulan PRB 2026"
      className="py-16 sm:py-20 lg:py-24 bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header + arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <span className="section-label text-primary">Narasumber</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
              Pembicara utama
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-lg">
              Para ahli kebencanaan, praktisi lapangan, dan pakar internasional yang akan berbagi ilmu di Bulan PRB 2026.
            </p>
          </motion.div>

          {/* Arrow controls */}
          <div className="hidden sm:flex items-center gap-2 shrink-0" aria-label="Navigasi pembicara">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Pembicara sebelumnya"
              className="w-10 h-10 rounded-xl bg-white shadow-soft border border-slate-100 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/20 hover:-translate-y-px transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Pembicara berikutnya"
              className="w-10 h-10 rounded-xl bg-white shadow-soft border border-slate-100 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/20 hover:-translate-y-px transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile/tablet: horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth lg:hidden no-scrollbar"
          role="list"
          aria-label="Daftar pembicara"
        >
          {pembicara.map((spk) => (
            <div key={spk.id} role="listitem" className="snap-start shrink-0 w-64 sm:w-72">
              <SpeakerCard speaker={spk} delay={0} />
            </div>
          ))}
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6" role="list" aria-label="Daftar pembicara">
          {pembicara.map((spk, i) => (
            <div key={spk.id} role="listitem">
              <SpeakerCard speaker={spk} delay={i * 0.08} />
            </div>
          ))}
        </div>

        <p className="lg:hidden text-center text-[10px] text-text-secondary mt-4 font-medium">
          Geser untuk melihat semua pembicara
        </p>

      </div>
    </section>
  );
};
