import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Building } from 'lucide-react';
import { pembicara } from '../data';

const SpeakerCard = ({ speaker, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-3xl shadow-soft border border-gray-100/60 overflow-hidden flex flex-col hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 h-full"
  >
    {/* Photo */}
    <div className="aspect-[4/3] overflow-hidden relative bg-gray-50">
      <img
        src={speaker.photo}
        alt={speaker.name}
        loading="lazy"
        className="w-full h-full object-cover object-top"
      />
      {/* Day badge */}
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xxs font-bold text-primary shadow-soft">
        {speaker.day}
      </span>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col gap-3 flex-1">
      {/* Institution */}
      <div className="flex items-center gap-1.5 text-xxs font-bold text-accent-orange uppercase tracking-wider">
        <Building className="w-3 h-3 shrink-0" />
        {speaker.institution}
      </div>

      {/* Name & title */}
      <div>
        <h4 className="text-base font-extrabold text-text-primary leading-snug">{speaker.name}</h4>
        <p className="text-xs text-text-secondary font-medium mt-0.5">{speaker.title}</p>
      </div>

      {/* Bio */}
      <p className="text-xs text-text-secondary leading-relaxed flex-1 line-clamp-3">{speaker.bio}</p>

      {/* Topic tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-gray-50">
        {speaker.topics.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full bg-primary/5 text-primary text-xxs font-bold"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export const PembicaraUtama = () => {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth ?? 260;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section id="pembicara" className="py-16 sm:py-20 lg:py-24 bg-white">
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
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Narasumber</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary">
              Pembicara Utama
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-lg">
              Para ahli kebencanaan, praktisi lapangan, dan pakar internasional yang akan berbagi ilmu di Bulan PRB 2025.
            </p>
          </motion.div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Sebelumnya"
              className="w-10 h-10 rounded-xl bg-white shadow-soft border border-gray-100 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Berikutnya"
              className="w-10 h-10 rounded-xl bg-white shadow-soft border border-gray-100 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll carousel — on mobile; auto grid on lg+ */}
        {/* Mobile/tablet: horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth lg:hidden
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {pembicara.map((spk, i) => (
            <div key={spk.id} className="snap-start shrink-0 w-64 sm:w-72">
              <SpeakerCard speaker={spk} delay={0} />
            </div>
          ))}
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {pembicara.map((spk, i) => (
            <SpeakerCard key={spk.id} speaker={spk} delay={i * 0.07} />
          ))}
        </div>

        <p className="lg:hidden text-center text-xxs text-text-secondary mt-3 font-medium">
          ← Geser untuk melihat semua pembicara →
        </p>

      </div>
    </section>
  );
};
