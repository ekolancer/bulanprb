import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const PuncakPeringatan = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="puncak"
      aria-label="Puncak Peringatan Bulan PRB 2026"
      className="relative py-20 sm:py-28 lg:py-36 bg-white overflow-hidden"
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
          backgroundPosition: '0 0',
        }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered stack */}
        <div className="flex flex-col items-center text-center">
          
          {/* Heading - constrained to 672px with paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[972px] flex flex-col gap-5"
          >
            <span className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary bg-primary/[0.06] ring-1 ring-primary/15 w-fit mx-auto">
              Kaleidoskop
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent tracking-tight leading-[1.5] pb-2 text-balance">
              Peringatan Bulan PRB 2026
            </h2>

            {/* Paragraph - same 672px constraint */}
            <p className="text-text-secondary text-base sm:text-lg font-medium leading-relaxed">
              Merajut kolaborasi, merangkum aksi nyata, dan memperkuat komitmen bersama untuk membangun bangsa yang tangguh dan siap siaga menghadapi bencana.
            </p>
          </motion.div>

          {/* CTA buttons row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
          >
          </motion.div>

          {/* Framed video container */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl"
          >
            <div className="bg-slate-900 p-3 sm:p-4 rounded-3xl shadow-2xl">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800">
                {isPlaying ? (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Video puncak peringatan Bulan PRB 2026"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <button
                    className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-inset group"
                    onClick={() => setIsPlaying(true)}
                    aria-label="Putar video demonstrasi"
                  >
                    {/* Thumbnail image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590402449133-79d5085f3475?auto=format&fit=crop&q=80&w=1280')` }}
                      aria-hidden="true"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />

                    {/* Play button */}
                    <div
                      className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    >
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-primary fill-primary ml-1" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
