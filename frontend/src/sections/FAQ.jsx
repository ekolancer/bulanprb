import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { faqItems } from '../data';

const FAQItem = ({ item, isOpen, onToggle, panelId, triggerId }) => (
  <div className="bg-white rounded-2xl shadow-soft border border-slate-100/80 overflow-hidden transition-all duration-200 hover:border-primary/20 hover:shadow-soft-hover">
    <button
      id={triggerId}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={panelId}
      className="w-full px-5 py-4 flex items-center justify-between text-left gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
          <span className="text-primary font-bold text-sm">?</span>
        </div>
        <span className="text-sm font-bold text-text-primary leading-snug">{item.question}</span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.22 }}
        className="shrink-0"
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
          <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed border-t border-slate-50 pt-4 max-w-lg">
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
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      aria-label="Tanya jawab Bulan PRB 2026"
      className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
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

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left column - Intro & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            {/* Heading */}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.1] text-balance">
                Tanya jawab seputar Bulan PRB
              </h2>

              {/* Supporting paragraph */}
              <p className="text-text-secondary text-base leading-relaxed max-w-md">
                Temukan jawaban atas pertanyaan umum seputar kegiatan, partisipasi, dan informasi penting Bulan Pengurangan Risiko Bencana 2026.
              </p>
            </div>

            {/* Contact button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-primary text-white font-bold text-sm rounded-full shadow-lg shadow-primary/25 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 transition-all duration-200 w-fit mt-2"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Hubungi Kami
            </motion.a>
          </motion.div>

          {/* Right column - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                triggerId={`${uid}-trigger-${i}`}
                panelId={`${uid}-panel-${i}`}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
