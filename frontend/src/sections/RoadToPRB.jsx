import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { Lightbox } from '../components/Lightbox';
import { roadToPRBItems } from '../data';

export const RoadToPRB = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth ?? 280;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
  };

  const lightboxImages = roadToPRBItems.map((i) => ({ src: i.src, caption: i.caption }));

  return (
    <section
      id="road-to-prb"
      aria-label="Galeri Road to PRB 2026"
      className="py-16 sm:py-20 lg:py-24 bg-app-gradient overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2 max-w-lg"
          >
            <span className="section-label rounded-full px-4 py-1.5 text-[11px] bg-primary/[0.06] ring-1 ring-primary/15 w-fit text-primary">Galeri</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight tracking-tight">
              Road to PRB
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Dokumentasi kegiatan pra-event Bulan PRB yang diselenggarakan di berbagai daerah.
            </p>
          </motion.div>

          <div className="hidden sm:flex items-center gap-2 shrink-0" aria-label="Navigasi galeri">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Foto sebelumnya"
              className="w-10 h-10 rounded-xl bg-white shadow-soft border border-slate-100 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/20 hover:-translate-y-px transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Foto berikutnya"
              className="w-10 h-10 rounded-xl bg-white shadow-soft border border-slate-100 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/20 hover:-translate-y-px transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
          role="list"
          aria-label="Foto galeri Road to PRB"
        >
          {roadToPRBItems.map((item, i) => (
            <motion.button
              key={item.id}
              role="listitem"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Buka foto: ${item.caption}`}
              className="group snap-start shrink-0 w-64 sm:w-72 md:w-80 rounded-2xl overflow-hidden shadow-soft border border-slate-100/80 bg-white text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover"
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
                <div className="flex items-center gap-3 text-[10px] text-text-secondary font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent-orange shrink-0" aria-hidden="true" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary shrink-0" aria-hidden="true" />
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="sm:hidden text-center text-[10px] text-text-secondary mt-3 font-medium">
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
