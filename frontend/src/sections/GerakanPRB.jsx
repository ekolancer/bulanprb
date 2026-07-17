import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { koboFormUrl, koboDashboardUrl } from '../data';

export const GerakanPRB = () => {
  return (
    <section id="gerakan" className="py-20 sm:py-28 bg-background relative overflow-hidden">
      {/* Decorative blurred background shape */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent-orange/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Integrated directly with the section background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center items-center text-center lg:items-end lg:text-right"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight tracking-tight text-balance">
              Gerakan Nasional <span className="text-accent-orange">Pengurangan Risiko Bencana</span>
            </h2>
            
            {/* Divider under heading */}
            <div className="w-20 h-1 bg-accent-orange my-5 rounded-full" />
            
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
              Mengajak seluruh lapisan masyarakat, komunitas, pemerintah daerah, dan akademisi untuk aktif mendaftarkan aksi mitigasi dan kesiapsiagaan bencana di lingkungan masing-masing demi Indonesia tangguh.
            </p>

            <Button
              variant="primary"
              size="lg"
              className="w-fit"
              onClick={() => window.open(koboFormUrl, '_blank', 'noopener noreferrer')}
              aria-label="Daftar Gerakan PRB — membuka tab baru"
            >
              Daftar Gerakan PRB
            </Button>
          </motion.div>

          {/* Right Column: KoboToolbox Dashboard Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[725px]">
              <div className="p-1 rounded-[2rem] bg-black/[0.03] ring-1 ring-black/5">
                <div className="bg-slate-900 p-1.5 rounded-[calc(2rem-0.25rem)] shadow-[0_1px_1px_rgba(255,255,255,0.15)_inset,0_24px_48px_-16px_rgba(15,23,42,0.35)]">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800">
                    <iframe
                      className="w-full h-full"
                      src={koboDashboardUrl}
                      title="Dashboard statistik Gerakan PRB — KoboToolbox"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <p className="text-text-secondary text-xs font-medium mt-3 text-center">
                Data statistik pendaftaran diperbarui secara real-time via KoboToolbox.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
