import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Lightbox } from '../components/Lightbox';
import { prbHistory } from '../data';

export const PRBTahunKeTahun = () => {
  const [selectedYear, setSelectedYear] = useState(prbHistory[0].year);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const currentData = prbHistory.find((h) => h.year === selectedYear);

  return (
    <section className="min-h-screen flex flex-col justify-center relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary bg-primary/[0.06] ring-1 ring-primary/15 w-fit mx-auto">
              REKAM JEJAK
            </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary">
            PRB Dari Tahun ke Tahun
          </h2>
        </motion.div>

        {/* Year pills — scroll on mobile */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 mb-12 sm:mb-14 sm:justify-center
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {prbHistory.map((h) => (
            <button
              key={h.year}
              onClick={() => setSelectedYear(h.year)}
              className={`shrink-0 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
          >
            {/* Left: Year details */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-text-secondary text-sm font-semibold">
                <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
                <span>{currentData.location}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary leading-tight">
                {currentData.theme}
              </h3>
              <p className="text-text-secondary text-base leading-relaxed">
                {currentData.description}
              </p>
            </div>

            {/* Right: Photo grid 2x2 */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 sm:gap-5 max-w-[90%] mx-auto lg:mx-0">
                {currentData.images.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    aria-label={img.caption}
                    className="group rounded-2xl overflow-hidden shadow-soft border border-gray-100/60 bg-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={img.src}
                        alt={img.caption}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-sm font-semibold">{img.caption}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* <p className="text-xs text-text-secondary text-center">
                {currentData.images.length} foto · Klik untuk memperbesar
              </p> */}
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
