import React, { useState } from 'react';
import { Play, Calendar, MapPin } from 'lucide-react';

export const PuncakPeringatan = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-text-primary">Puncak Peringatan Bulan PRB</h2>
          <p className="text-text-secondary text-sm font-medium">Saksikan siaran langsung, highlight, dan dokumentasi resmi rangkaian acara puncak peringatan Bulan PRB 2025.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Video Player */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-soft bg-black group border border-white/50">
              {isPlaying ? (
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer" onClick={() => setIsPlaying(true)}>
                  {/* Decorative background image placeholder/render */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590402449133-79d5085f3475?auto=format&fit=crop&q=80&w=1280')` }} />
                  
                  {/* Play button */}
                  <div className="absolute z-20 w-20 h-20 rounded-full bg-white/90 shadow-2xl flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                    <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100/50 flex flex-col gap-6">
              <div>
                <span className="text-xs font-bold text-accent-orange uppercase tracking-wider">Highlight Utama</span>
                <h3 className="text-2xl font-extrabold text-text-primary mt-1">Acara Puncak & Apel Kebencanaan</h3>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed">
                Puncak peringatan tahun ini menghadirkan Apel Kesiapsiagaan Bencana Nasional, Pameran Teknologi Kebencanaan, Simulasi Evakuasi Mandiri, serta Penandatanganan Komitmen Bersama antar-lembaga.
              </p>

              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-text-primary">13 - 15 Oktober 2025</h5>
                    <p className="text-xxs text-text-secondary font-medium">08:00 - selesai WIB</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-orange/5 flex items-center justify-center text-accent-orange">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-text-primary">Gedung BNPB & Area Simulasi</h5>
                    <p className="text-xxs text-text-secondary font-medium">Jakarta Timur, DKI Jakarta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
