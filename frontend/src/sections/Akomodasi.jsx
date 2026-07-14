import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../components/Badge';
import { Star, MapPin, Phone, Building, Wifi, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { hotels, hotelCategories, priceRanges, sortOptions } from '../data';

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);

const HotelCard = ({ hotel, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    className="bg-white rounded-3xl shadow-soft border border-slate-100/80 overflow-hidden flex flex-col hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-300"
    aria-label={hotel.name}
  >
    {/* Photo */}
    <div className="aspect-[16/9] overflow-hidden relative bg-slate-100">
      <img
        src={hotel.photo}
        alt={`Foto hotel ${hotel.name}`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
      />
      {hotel.recommended && (
        <div className="absolute top-3 left-3">
          <Badge variant="success">Rekomendasi Panitia</Badge>
        </div>
      )}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-text-primary flex items-center gap-1 shadow-soft">
        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
        <span aria-label={`Rating ${hotel.rating}`}>{hotel.rating}</span>
      </div>
    </div>

    {/* Details */}
    <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
        <Building className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        {hotel.category}
        {hotel.stars > 0 && (
          <span className="ml-1 text-yellow-500" aria-label={`${hotel.stars} bintang`}>
            {'★'.repeat(hotel.stars)}
          </span>
        )}
      </div>

      <h3 className="text-sm sm:text-base font-bold text-text-primary leading-snug">{hotel.name}</h3>

      <address className="not-italic text-[10px] text-text-secondary font-medium flex items-start gap-1.5 leading-snug">
        <MapPin className="w-3.5 h-3.5 text-accent-orange shrink-0 mt-0.5" aria-hidden="true" />
        {hotel.address}
      </address>

      <div className="flex items-center justify-between py-2 border-y border-slate-50">
        <span className="text-[10px] text-text-secondary font-medium">Jarak ke Venue:</span>
        <span className="text-xs font-bold text-text-primary">{hotel.distanceKm} km</span>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-1.5" role="list" aria-label="Fasilitas">
        {hotel.amenities.map((a) => (
          <span
            key={a}
            role="listitem"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 text-[10px] font-semibold text-text-secondary"
          >
            <Wifi className="w-2.5 h-2.5" aria-hidden="true" />
            {a}
          </span>
        ))}
      </div>
    </div>

    {/* Footer */}
    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-slate-50 flex items-center justify-between gap-3">
      <div>
        <span className="text-[10px] text-text-secondary font-medium block">Mulai dari</span>
        <p className="text-sm font-extrabold text-primary">
          {formatPrice(hotel.priceMin)}
          <span className="text-[10px] font-medium text-text-secondary">/malam</span>
        </p>
      </div>
      <a
        href={`tel:${hotel.phone}`}
        aria-label={`Hubungi ${hotel.name} via telepon`}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 hover:-translate-y-px text-primary font-bold text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
        Hubungi
      </a>
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
  const [activePriceRange, setActivePriceRange] = useState(priceRanges[0]);
  const [activeSort, setActiveSort] = useState(sortOptions[0].value);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = hotels.filter((h) => {
      const matchCat   = activeCategory === 'Semua' || h.category === activeCategory;
      const matchPrice = h.priceMin <= activePriceRange.max && h.priceMax >= activePriceRange.min;
      return matchCat && matchPrice;
    });

    return [...result].sort((a, b) => {
      if (activeSort === 'distance')   return a.distanceKm - b.distanceKm;
      if (activeSort === 'price_asc')  return a.priceMin - b.priceMin;
      if (activeSort === 'price_desc') return b.priceMax - a.priceMax;
      if (activeSort === 'rating')     return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, activePriceRange, activeSort]);

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
      className="py-16 sm:py-20 lg:py-24 bg-white"
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
            Tempat penginapan peserta
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Rekomendasi akomodasi terdekat di sekitar venue untuk kenyamanan menginap Anda.
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

        {/* Filters */}
        <div id="filter-panel">
          {/* Mobile collapsible */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="flex flex-col gap-4 mb-8 bg-white/70 p-4 rounded-2xl border border-slate-100">
                  <div className="flex flex-col gap-2">
                    <FilterGroup label="Tipe" />
                    <div className="flex gap-2 flex-wrap">
                      {hotelCategories.map((cat) => (
                        <FilterPill key={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
                          {cat}
                        </FilterPill>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <FilterGroup label="Kisaran Harga" />
                    <div className="flex gap-2 flex-wrap">
                      {priceRanges.map((range) => (
                        <FilterPill
                          key={range.label}
                          active={activePriceRange.label === range.label}
                          onClick={() => setActivePriceRange(range)}
                          activeColor="bg-accent-orange text-white shadow-soft"
                        >
                          {range.label}
                        </FilterPill>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <FilterGroup label="Urutkan" icon={ArrowUpDown} />
                    <div className="flex gap-2 flex-wrap">
                      {sortOptions.map((opt) => (
                        <FilterPill
                          key={opt.value}
                          active={activeSort === opt.value}
                          onClick={() => setActiveSort(opt.value)}
                          activeColor="bg-success text-white shadow-soft"
                        >
                          {opt.label}
                        </FilterPill>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop filters */}
          <div className="hidden lg:flex flex-col gap-4 mb-8">
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex flex-col gap-2">
                <FilterGroup label="Tipe" />
                <div className="flex gap-2">
                  {hotelCategories.map((cat) => (
                    <FilterPill key={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)}>
                      {cat}
                    </FilterPill>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FilterGroup label="Kisaran Harga" />
                <div className="flex gap-2">
                  {priceRanges.map((range) => (
                    <FilterPill
                      key={range.label}
                      active={activePriceRange.label === range.label}
                      onClick={() => setActivePriceRange(range)}
                      activeColor="bg-accent-orange text-white shadow-soft"
                    >
                      {range.label}
                    </FilterPill>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FilterGroup label="Urutkan" icon={ArrowUpDown} />
                <div className="flex gap-2">
                  {sortOptions.map((opt) => (
                    <FilterPill
                      key={opt.value}
                      active={activeSort === opt.value}
                      onClick={() => setActiveSort(opt.value)}
                      activeColor="bg-success text-white shadow-soft"
                    >
                      {opt.label}
                    </FilterPill>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[10px] text-text-secondary font-medium mb-6" aria-live="polite">
          Menampilkan <strong className="text-text-primary">{filtered.length}</strong> penginapan
        </p>

        {/* Hotel cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activePriceRange.label}-${activeSort}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
              <div className="col-span-3 text-center py-14 text-text-secondary" role="status">
                <p className="text-sm font-semibold">Tidak ada penginapan yang cocok dengan filter ini.</p>
                <button
                  onClick={() => { setActiveCategory('Semua'); setActivePriceRange(priceRanges[0]); }}
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
