import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, MapPin } from 'lucide-react';

export const PuncakPeringatan = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="puncak"
      aria-label="Puncak Peringatan Bulan PRB 2026"
      className="py-20 sm:py-24 lg:py-28 bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col gap-3 text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <span className="section-label text-primary">Sorotan Utama</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight text-balance">
            Puncak peringatan Bulan PRB
          </h2>
          <p className="text-text-secondary text-sm font-medium leading-relaxed">
            Saksikan siaran langsung, highlight, dan dokumentasi resmi rangkaian acara puncak peringatan Bulan PRB 2026.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-soft-lg bg-slate-900 group border border-slate-200/60">
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
                  className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-inset"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Putar video puncak peringatan Bulan PRB 2026"
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590402449133-79d5085f3475?auto=format&fit=crop&q=80&w=1280')` }}
                    aria-hidden="true"
                  />
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-0 bg-primary/15 mix-blend-multiply" aria-hidden="true" />

                  {/* Play button */}
                  <div
                    className="relative z-10 w-20 h-20 rounded-full bg-white/92 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                  </div>

                  {/* Duration hint */}
                  <span className="absolute bottom-4 right-4 z-10 px-2.5 py-1 bg-black/60 rounded-lg text-white text-xs font-bold">
                    Tonton video
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Detail card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            <div className="bg-white p-7 sm:p-8 rounded-3xl shadow-soft-lg border border-slate-100/80 flex flex-col gap-6">
              <div>
                <span className="section-label text-accent-orange">Highlight utama</span>
                <h3 className="text-2xl font-extrabold text-text-primary mt-1.5 leading-tight tracking-tight">
                  Acara puncak &amp; apel kebencanaan
                </h3>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed">
                Puncak peringatan tahun ini menghadirkan Apel Kesiapsiagaan Bencana Nasional, Pameran Teknologi Kebencanaan, Simulasi Evakuasi Mandiri, serta Penandatanganan Komitmen Bersama antar-lembaga.
              </p>

              <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">13–15 Oktober 2026</h4>
                    <p className="text-[10px] text-text-secondary font-medium mt-0.5">08.00 WIB – selesai</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-orange/8 flex items-center justify-center text-accent-orange shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Gedung BNPB &amp; Area Simulasi</h4>
                    <p className="text-[10px] text-text-secondary font-medium mt-0.5">Jakarta Timur, DKI Jakarta</p>
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
