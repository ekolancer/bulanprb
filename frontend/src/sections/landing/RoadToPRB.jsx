import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { Lightbox } from '../../components/Lightbox';
import { roadToPRBItems } from '../../data';

export const RoadToPRB = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth ?? 280;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  };

  const lightboxImages = roadToPRBItems.map((i) => ({ src: i.src, caption: i.caption }));

  return (
    <section
      id="road-to-prb"
      aria-label="Galeri Road to PRB 2026"
      className="relative py-20 sm:py-28 lg:py-36 bg-white overflow-hidden"
    >
      {/* Subtle geometric pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}
        aria-hidden="true"
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 max-w-lg"
          >
            <span className="section-label rounded-full px-4 py-1.5 text-xs bg-primary/[0.06] ring-1 ring-primary/15 w-fit text-primary">Galeri</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight tracking-tight">
              Road to PRB
            </h2>
            <p className="text-text-secondary text-base leading-relaxed">
              Dokumentasi kegiatan pra-event Bulan PRB yang diselenggarakan di berbagai daerah.
            </p>
          </motion.div>

          <div className="hidden sm:flex items-center gap-3 shrink-0" aria-label="Navigasi galeri">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Foto sebelumnya"
              className="w-11 h-11 rounded-xl bg-white shadow-soft border border-slate-100 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/20 hover:-translate-y-px transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Foto berikutnya"
              className="w-11 h-11 rounded-xl bg-white shadow-soft border border-slate-100 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/20 hover:-translate-y-px transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll carousel — 2 rows per column, up to 16 photos */}
        <div
          ref={scrollRef}
          className="grid grid-rows-2 grid-flow-col auto-cols-[minmax(15rem,15rem)] sm:auto-cols-[minmax(17rem,17rem)] gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
          role="list"
          aria-label="Foto galeri Road to PRB"
        >
          {roadToPRBItems.slice(0, 16).map((item, i) => (
            <motion.button
              key={item.id}
              role="listitem"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Buka foto: ${item.caption}`}
              className="group snap-start rounded-2xl overflow-hidden shadow-soft border border-slate-100/80 bg-white text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                {/* Category pill */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/92 text-[10px] font-bold text-primary shadow-soft">
                  {item.category}
                </span>
              </div>

              {/* Caption */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-sm font-bold text-text-primary leading-snug group-hover:text-primary transition-colors">
                  {item.caption}
                </h3>
                <div className="flex flex-col gap-1 text-[10px] text-text-secondary font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-accent-orange shrink-0" aria-hidden="true" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="sm:hidden text-center text-xs text-text-secondary mt-4 font-medium">
          Geser untuk melihat lebih banyak
        </p>

      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex(
            (lightboxIndex - 1 + roadToPRBItems.length) % roadToPRBItems.length
          )
        }
        onNext={() =>
          setLightboxIndex((lightboxIndex + 1) % roadToPRBItems.length)
        }
      />
    </section>
  );
};
