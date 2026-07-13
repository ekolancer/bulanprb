import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Lightbox } from '../components/Lightbox';
import { prbHistory } from '../data';

export const PRBTahunKeTahun = () => {
  const [selectedYear, setSelectedYear] = useState(prbHistory[0].year);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  const currentData = prbHistory.find((h) => h.year === selectedYear);

  const scrollBy = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth ?? 240;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Rekam Jejak</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary">
            PRB Dari Tahun ke Tahun
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Melacak perjuangan, inovasi, dan kolaborasi peringatan Bulan PRB di Indonesia.
          </p>
        </motion.div>

        {/* Year pills — scroll on mobile */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 mb-10 sm:mb-12 sm:justify-center
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {prbHistory.map((h) => (
            <button
              key={h.year}
              onClick={() => setSelectedYear(h.year)}
              className={`shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                selectedYear === h.year
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-gray-50 text-text-secondary hover:bg-gray-100'
              }`}
            >
              Bulan PRB {h.year}
            </button>
          ))}
        </div>

        {/* Content — animated on year change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
          >
            {/* Left: Year details */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="text-xs font-bold text-accent-orange uppercase tracking-widest">
                Tuan Rumah
              </span>
              <div className="flex items-center gap-2 text-text-secondary text-sm font-semibold">
                <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
                <span>{currentData.location}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary leading-tight">
                {currentData.theme}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {currentData.description}
              </p>

              {/* Year badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl w-fit mt-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary">Tahun {currentData.year}</span>
              </div>
            </div>

            {/* Right: Photo carousel with arrows */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {/* Arrow + scroll wrapper */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollBy(-1)}
                  aria-label="Sebelumnya"
                  className="w-9 h-9 rounded-xl bg-white shadow-soft border border-gray-100 flex items-center justify-center text-text-secondary hover:text-primary transition-colors shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth
                    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1"
                >
                  {currentData.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      aria-label={img.caption}
                      className="group snap-start shrink-0 w-56 sm:w-64 lg:w-auto lg:flex-1 rounded-2xl overflow-hidden shadow-soft border border-gray-100/60 bg-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={img.src}
                          alt={img.caption}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <p className="text-white text-xs font-semibold">{img.caption}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scrollBy(1)}
                  aria-label="Berikutnya"
                  className="w-9 h-9 rounded-xl bg-white shadow-soft border border-gray-100 flex items-center justify-center text-text-secondary hover:text-primary transition-colors shrink-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xxs text-text-secondary text-center">
                {currentData.images.length} foto · Klik untuk memperbesar
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      <Lightbox
        images={currentData.images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((lightboxIndex - 1 + currentData.images.length) % currentData.images.length)}
        onNext={() => setLightboxIndex((lightboxIndex + 1) % currentData.images.length)}
      />
    </section>
  );
};
