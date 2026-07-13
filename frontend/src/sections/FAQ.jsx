import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X } from 'lucide-react';
import { faqItems, faqCategories } from '../data';

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100/50 transition-all duration-200 hover:border-primary/20">
    <button
      onClick={onToggle}
      className="w-full px-5 py-4 flex items-start justify-between text-left gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    >
      <div className="flex-1 min-w-0">
        <span className="text-xxs font-bold text-primary uppercase tracking-wider block mb-1">
          {item.category}
        </span>
        <span className="text-sm font-semibold text-text-primary leading-snug">{item.question}</span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25 }}
        className="shrink-0 mt-0.5"
      >
        <ChevronDown className="w-5 h-5 text-text-secondary" />
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed border-t border-gray-50 pt-3">
            {item.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return faqItems.filter((item) => {
      const matchesCat = activeCategory === 'Semua' || item.category === activeCategory;
      const matchesSearch = !q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Bantuan</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary">
            Tanya Jawab (FAQ)
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Temukan jawaban cepat atas pertanyaan umum seputar Bulan PRB 2025.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white shadow-soft text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category filter pills — scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-8 sm:justify-center
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-gray-50 text-text-secondary hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ list — 2 columns on desktop */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {filtered.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p className="text-sm font-semibold">Tidak ada hasil untuk &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
              className="mt-3 text-primary text-sm font-bold hover:underline"
            >
              Reset pencarian
            </button>
          </div>
        )}

        {/* Result count */}
        {filtered.length > 0 && (
          <p className="text-center text-xxs text-text-secondary mt-6 font-medium">
            Menampilkan {filtered.length} dari {faqItems.length} pertanyaan
          </p>
        )}

      </div>
    </section>
  );
};
