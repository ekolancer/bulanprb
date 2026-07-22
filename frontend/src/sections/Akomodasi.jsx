import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Building, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { hotels, hotelCategories, sortOptions } from '../data';

const HotelCard = ({ hotel, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.7, delay, ease: [0.32, 0.72, 0, 1] }}
    className="group p-1 rounded-[1.5rem] bg-black/[0.03] ring-1 ring-black/5"
    aria-label={hotel.name}
  >
    <div className="rounded-[calc(1.5rem-0.25rem)] bg-white overflow-hidden flex flex-col shadow-[0_1px_1px_rgba(0,0,0,0.02),0_10px_24px_-14px_rgba(15,23,42,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-[0_1px_1px_rgba(0,0,0,0.02),0_18px_36px_-14px_rgba(15,23,42,0.18)] group-hover:-translate-y-1">
      {/* Photo */}
      <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
        <img
          src={hotel.photo}
          alt={`Foto hotel ${hotel.name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-semibold uppercase tracking-[0.12em] text-text-primary">
          <Building className="w-2.5 h-2.5" aria-hidden="true" />
          {hotel.category}
        </div>
      </div>

      {/* Details */}
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-xs sm:text-sm font-bold text-text-primary leading-snug tracking-tight line-clamp-2">
          {hotel.name}
        </h3>

        {/* Footer actions */}
        <div className="mt-1 flex items-center gap-1.5">
          <a
            href={`tel:${hotel.phone}`}
            aria-label={`Hubungi ${hotel.name} via telepon`}
            className="group/cta flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-full bg-primary/[0.06] hover:bg-primary/[0.12] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-w-0"
          >
            <Phone className="w-3 h-3 text-primary shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:-translate-y-0.5" aria-hidden="true" />
            <span className="text-[11px] font-bold text-primary truncate">{hotel.phone}</span>
          </a>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(hotel.address || hotel.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Lihat lokasi ${hotel.name} (${hotel.distanceKm} km dari venue)`}
            className="group/loc w-9 h-9 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-orange/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
          >
            <MapPin className="w-3.5 h-3.5 text-accent-orange transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/loc:translate-x-0.5 group-hover/loc:-translate-y-0.5 group-hover/loc:scale-105" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </motion.article>
);

// Filter pill sub-component
const FilterPill = ({ active, onClick, children, activeColor = 'bg-primary text-white shadow-soft' }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
      active ? activeColor : 'bg-slate-50 text-text-secondary hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
);

export const Akomodasi = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [activeSort, setActiveSort] = useState(sortOptions[0].value);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = hotels.filter((h) => activeCategory === 'Semua' || h.category === activeCategory);

    return [...result].sort((a, b) => {
      if (activeSort === 'distance')   return a.distanceKm - b.distanceKm;
      if (activeSort === 'price_asc')  return a.priceMin - b.priceMin;
      if (activeSort === 'price_desc') return b.priceMax - a.priceMax;
      if (activeSort === 'rating')     return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, activeSort]);

  const FilterGroup = ({ label, icon: Icon }) => (
    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
      {Icon && <Icon className="w-3 h-3" aria-hidden="true" />}
      {label}
    </span>
  );

  return (
    <section
      id="akomodasi"
      aria-label="Rekomendasi akomodasi peserta Bulan PRB 2026"
      className="py-16 sm:py-20 lg:py-24 bg-app-gradient"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center max-w-xl mx-auto mb-10"
        >
          {/* <span className="section-label text-primary">Penginapan</span> */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
            Rekomendasi Penginapan
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Daftar Pilihan Penginanap disekitar Venue.
          </p>
        </motion.div>

        {/* Mobile filter toggle */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-soft border border-slate-100 text-xs font-bold text-text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            Filter &amp; urutkan
          </button>
        </div>

        {/* Results count */}
        {/* <p className="text-[10px] text-text-secondary font-medium mb-6" aria-live="polite">
          Menampilkan <strong className="text-text-primary">{filtered.length}</strong> penginapan
        </p> */}

        {/* Hotel cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeSort}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            role="list"
            aria-label="Daftar penginapan"
          >
            {filtered.length > 0 ? (
              filtered.map((hotel, i) => (
                <div key={hotel.id} role="listitem">
                  <HotelCard hotel={hotel} delay={i * 0.06} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-14 text-text-secondary" role="status">
                <p className="text-sm font-semibold">Tidak ada penginapan yang cocok dengan filter ini.</p>
                <button
                  onClick={() => setActiveCategory('Semua')}
                  className="mt-3 text-primary text-sm font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  Reset filter
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
