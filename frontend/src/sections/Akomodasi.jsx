import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../components/Badge';
import { Star, MapPin, Phone, Building, Wifi, ArrowUpDown, SlidersHorizontal } from 'lucide-react';
import { hotels, hotelCategories, priceRanges, sortOptions } from '../data';

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

const HotelCard = ({ hotel, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden flex flex-col hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300"
  >
    {/* Photo */}
    <div className="aspect-[16/9] overflow-hidden relative bg-gray-100">
      <img
        src={hotel.photo}
        alt={hotel.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      {hotel.recommended && (
        <div className="absolute top-3 left-3">
          <Badge variant="success">⭐ Rekomendasi Panitia</Badge>
        </div>
      )}
      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-text-primary flex items-center gap-1 shadow-soft">
        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        {hotel.rating}
      </div>
    </div>

    {/* Details */}
    <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
      <div className="flex items-center gap-1.5 text-xxs font-bold text-primary uppercase tracking-wider">
        <Building className="w-3.5 h-3.5 shrink-0" />
        {hotel.category}
        {hotel.stars > 0 && (
          <span className="ml-1 text-yellow-500">{'★'.repeat(hotel.stars)}</span>
        )}
      </div>

      <h4 className="text-sm sm:text-base font-bold text-text-primary leading-snug">{hotel.name}</h4>

      <p className="text-xxs text-text-secondary font-medium flex items-start gap-1.5 leading-snug">
        <MapPin className="w-3.5 h-3.5 text-accent-orange shrink-0 mt-0.5" />
        {hotel.address}
      </p>

      {/* Distance */}
      <div className="flex items-center justify-between py-2 border-y border-gray-50">
        <span className="text-xxs text-text-secondary font-medium">Jarak ke Venue:</span>
        <span className="text-xs font-bold text-text-primary">{hotel.distanceKm} km</span>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-1.5">
        {hotel.amenities.map((a) => (
          <span
            key={a}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-50 text-xxs font-semibold text-text-secondary"
          >
            <Wifi className="w-2.5 h-2.5" />
            {a}
          </span>
        ))}
      </div>
    </div>

    {/* Footer */}
    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-gray-50 flex items-center justify-between gap-3">
      <div>
        <span className="text-xxs text-text-secondary font-medium block">Mulai dari</span>
        <p className="text-sm font-extrabold text-primary">{formatPrice(hotel.priceMin)}<span className="text-xxs font-medium text-text-secondary">/malam</span></p>
      </div>
      <a
        href={`tel:${hotel.phone}`}
        aria-label={`Hubungi ${hotel.name}`}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary font-bold text-xs transition-colors"
      >
        <Phone className="w-3.5 h-3.5" />
        Hubungi
      </a>
    </div>
  </motion.div>
);

export const Akomodasi = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [activePriceRange, setActivePriceRange] = useState(priceRanges[0]);
  const [activeSort, setActiveSort] = useState(sortOptions[0].value);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = hotels.filter((h) => {
      const matchCat = activeCategory === 'Semua' || h.category === activeCategory;
      const matchPrice = h.priceMin <= activePriceRange.max && h.priceMax >= activePriceRange.min;
      return matchCat && matchPrice;
    });

    result = [...result].sort((a, b) => {
      if (activeSort === 'distance') return a.distanceKm - b.distanceKm;
      if (activeSort === 'price_asc') return a.priceMin - b.priceMin;
      if (activeSort === 'price_desc') return b.priceMax - a.priceMax;
      if (activeSort === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [activeCategory, activePriceRange, activeSort]);

  return (
    <section id="akomodasi" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Penginapan</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary">
            Tempat Penginapan Peserta
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Rekomendasi akomodasi terdekat di sekitar venue untuk kenyamanan menginap Anda.
          </p>
        </motion.div>

        {/* Filter toggle (mobile) */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-soft border border-gray-100 text-xs font-bold text-text-secondary hover:text-primary transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter & Urutkan
          </button>
        </div>

        {/* Filters — always visible on lg, collapsible on mobile */}
        <AnimatePresence initial={false}>
          {(showFilters || typeof window === 'undefined') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:!h-auto lg:!opacity-100"
            >
              <div className="lg:block flex flex-col gap-4 mb-8 bg-white/70 p-4 rounded-2xl lg:p-0 lg:bg-transparent">
                {/* Category pills */}
                <div className="flex flex-col gap-2">
                  <span className="text-xxs font-bold text-text-secondary uppercase tracking-wider">Tipe</span>
                  <div className="flex gap-2 flex-wrap">
                    {hotelCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          activeCategory === cat
                            ? 'bg-primary text-white shadow-soft'
                            : 'bg-gray-50 text-text-secondary hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range pills */}
                <div className="flex flex-col gap-2">
                  <span className="text-xxs font-bold text-text-secondary uppercase tracking-wider">Kisaran Harga</span>
                  <div className="flex gap-2 flex-wrap">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => setActivePriceRange(range)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          activePriceRange.label === range.label
                            ? 'bg-accent-orange text-white shadow-soft'
                            : 'bg-gray-50 text-text-secondary hover:bg-gray-100'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="flex flex-col gap-2">
                  <span className="text-xxs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3" /> Urutkan
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setActiveSort(opt.value)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          activeSort === opt.value
                            ? 'bg-success text-white shadow-soft'
                            : 'bg-gray-50 text-text-secondary hover:bg-gray-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop filters — always visible */}
        <div className="hidden lg:flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex flex-col gap-2">
              <span className="text-xxs font-bold text-text-secondary uppercase tracking-wider">Tipe</span>
              <div className="flex gap-2">
                {hotelCategories.map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${activeCategory === cat ? 'bg-primary text-white shadow-soft' : 'bg-gray-50 text-text-secondary hover:bg-gray-100'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xxs font-bold text-text-secondary uppercase tracking-wider">Kisaran Harga</span>
              <div className="flex gap-2">
                {priceRanges.map((range) => (
                  <button key={range.label} onClick={() => setActivePriceRange(range)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${activePriceRange.label === range.label ? 'bg-accent-orange text-white shadow-soft' : 'bg-gray-50 text-text-secondary hover:bg-gray-100'}`}>
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xxs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1"><ArrowUpDown className="w-3 h-3" /> Urutkan</span>
              <div className="flex gap-2">
                {sortOptions.map((opt) => (
                  <button key={opt.value} onClick={() => setActiveSort(opt.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${activeSort === opt.value ? 'bg-success text-white shadow-soft' : 'bg-gray-50 text-text-secondary hover:bg-gray-100'}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xxs text-text-secondary font-medium mb-6">
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
          >
            {filtered.length > 0 ? (
              filtered.map((hotel, i) => (
                <HotelCard key={hotel.id} hotel={hotel} delay={i * 0.06} />
              ))
            ) : (
              <div className="col-span-3 text-center py-14 text-text-secondary">
                <p className="text-sm font-semibold">Tidak ada penginapan yang cocok dengan filter ini.</p>
                <button
                  onClick={() => { setActiveCategory('Semua'); setActivePriceRange(priceRanges[0]); }}
                  className="mt-3 text-primary text-sm font-bold hover:underline"
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
