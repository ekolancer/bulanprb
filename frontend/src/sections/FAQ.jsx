import React, { useState, useMemo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X } from 'lucide-react';
import { faqItems, faqCategories } from '../data';

const FAQItem = ({ item, isOpen, onToggle, panelId, triggerId }) => (
  <div className="bg-white rounded-2xl shadow-soft border border-slate-100/80 overflow-hidden transition-all duration-200 hover:border-primary/20 hover:shadow-soft-hover">
    <button
      id={triggerId}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={panelId}
      className="w-full px-5 py-4 flex items-start justify-between text-left gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    >
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
          {item.category}
        </span>
        <span className="text-sm font-semibold text-text-primary leading-snug">{item.question}</span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.22 }}
        className="shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <ChevronDown className="w-5 h-5 text-text-secondary" />
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed border-t border-slate-50 pt-3">
            {item.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQ = () => {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return faqItems.filter((item) => {
      const matchesCat = activeCategory === 'Semua' || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      aria-label="Tanya jawab Bulan PRB 2026"
      className="py-16 sm:py-20 lg:py-24 bg-background"
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
          <span className="section-label text-primary">Bantuan</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
            Tanya jawab (FAQ)
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Temukan jawaban cepat atas pertanyaan umum seputar Bulan PRB 2026.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <label htmlFor="faq-search" className="sr-only">Cari pertanyaan FAQ</label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="faq-search"
              type="search"
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white shadow-soft text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Category filter pills */}
        <div
          className="flex gap-2 overflow-x-auto pb-1 mb-8 sm:justify-center no-scrollbar"
          role="tablist"
          aria-label="Filter kategori FAQ"
        >
          {faqCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-slate-50 text-text-secondary hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ list — 2-col on desktop */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
            {filtered.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                triggerId={`${uid}-trigger-${i}`}
                panelId={`${uid}-panel-${i}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary">
            <Search className="w-10 h-10 mx-auto mb-4 opacity-25" aria-hidden="true" />
            <p className="text-sm font-semibold">
              Tidak ada hasil untuk &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
              className="mt-3 text-primary text-sm font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              Reset pencarian
            </button>
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-center text-[10px] text-text-secondary mt-6 font-medium" aria-live="polite">
            Menampilkan {filtered.length} dari {faqItems.length} pertanyaan
          </p>
        )}

      </div>
    </section>
  );
};
