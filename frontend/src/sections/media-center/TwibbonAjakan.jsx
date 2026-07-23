import React from 'react';
import { motion } from 'framer-motion';
import { Frame, Download, Share2 } from 'lucide-react';

export const TwibbonAjakan = () => {
  return (
    <section
      id="twibbon"
      aria-label="Ajakan pasang twibbon Bulan PRB 2026"
      className="relative py-24 sm:py-32 lg:py-40 bg-white overflow-hidden"
    >
      {/* Subtle geometric pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #E8621A 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-orange bg-accent-orange/10 ring-1 ring-accent-orange/20 w-fit">
              <Frame className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
              Twibbon Resmi
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.1] text-balance">
              Pasang twibbon, sebar semangat siaga bencana
            </h2>

            <p className="text-text-secondary text-base leading-relaxed max-w-md">
              Unduh bingkai foto resmi Bulan PRB 2026, pasang di foto profilmu, dan ajak lebih banyak orang peduli kesiapsiagaan bencana.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <a
                href="#"
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-primary pl-6 pr-2 py-2 text-sm font-semibold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98]"
              >
                Pasang Twibbon
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                  <Download className="w-3.5 h-3.5 text-white" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </a>

              <a
                href="#"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors duration-300"
              >
                <Share2 className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                Bagikan ke media sosial
              </a>
            </div>
          </motion.div>

          {/* Right: Framed twibbon preview — Double Bezel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Outer shell */}
              <div className="rounded-[2rem] bg-black/[0.03] ring-1 ring-black/5 p-2">
                {/* Inner core */}
                <div className="relative aspect-square rounded-[calc(2rem-0.375rem)] overflow-hidden ring-1 ring-black/[0.03]">
                  <img
                    src="https://picsum.photos/seed/prb-twibbon-preview-portrait/720/720"
                    alt="Contoh foto profil dengan bingkai twibbon Bulan PRB 2026"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Twibbon frame ring overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      boxShadow: 'inset 0 0 0 14px rgba(232,98,26,0.85), inset 0 0 0 18px rgba(255,255,255,0.9)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-0.5" aria-hidden="true">
                    <span className="text-white font-extrabold text-sm tracking-tight drop-shadow">Bulan PRB 2026</span>
                    <span className="text-white/85 text-[10px] font-semibold tracking-[0.15em] uppercase drop-shadow">Siaga Bersama Banten</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
