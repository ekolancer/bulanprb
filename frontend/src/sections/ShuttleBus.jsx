import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/Card';
import { MapPin, Bus, Users, Clock, ExternalLink, Info } from 'lucide-react';
import { shuttleSchedule, shuttleDays, shuttleNotes, mapsUrl } from '../data';

const RouteCard = ({ route, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.07 }}
  >
    <Card elevated className="p-5 sm:p-6 flex flex-col gap-4 h-full">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
            <Bus className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary leading-tight">{route.type}</p>
            <span className="flex items-center gap-1 text-[10px] text-text-secondary font-medium mt-0.5">
              <Users className="w-3 h-3 shrink-0" aria-hidden="true" />
              Kapasitas: {route.capacity} kursi
            </span>
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="flex items-start gap-2 bg-slate-50 rounded-xl p-3">
        <MapPin className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-xs font-semibold text-text-primary leading-snug">{route.route}</p>
      </div>

      {/* Departure times */}
      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-wider">
          <Clock className="w-3 h-3" aria-hidden="true" />
          Jam keberangkatan
        </span>
        <div className="flex flex-wrap gap-2" role="list" aria-label="Jadwal keberangkatan">
          {route.times.map((t) => (
            <span
              key={t}
              role="listitem"
              className="px-3 py-1.5 rounded-xl bg-primary/5 text-primary text-xs font-extrabold tabular-nums font-mono"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Note */}
      {route.note && (
        <div className="flex items-start gap-2 text-[10px] text-text-secondary border-t border-slate-50 pt-3">
          <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span>{route.note}</span>
        </div>
      )}
    </Card>
  </motion.div>
);

export const ShuttleBus = () => {
  const [activeDay, setActiveDay] = useState(shuttleDays[1]);
  const dayData = shuttleSchedule[activeDay];

  return (
    <section
      id="shuttle"
      aria-label="Jadwal shuttle bus Bulan PRB 2026"
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
          {/* <span className="section-label text-primary">Transportasi Gratis</span> */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
            Jadwal shuttle bus
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Panitia menyediakan layanan transportasi gratis dari titik penjemputan utama menuju lokasi acara.
          </p>
        </motion.div>

        {/* Day tabs */}
        <div
          className="flex items-center gap-3 overflow-x-auto pb-1 mb-8 sm:justify-center no-scrollbar"
          role="tablist"
          aria-label="Pilih hari shuttle"
        >
          {shuttleDays.map((day) => {
            const d = shuttleSchedule[day];
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                role="tab"
                aria-selected={isActive}
                aria-controls={`shuttle-panel-${day}`}
                onClick={() => setActiveDay(day)}
                className={`shrink-0 flex flex-col items-center gap-0.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white text-text-secondary hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <span>{d.label}</span>
                <span className={`text-[10px] font-medium ${isActive ? 'text-white/75' : 'text-text-secondary'}`}>
                  {d.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Day content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            id={`shuttle-panel-${activeDay}`}
            role="tabpanel"
            aria-label={`Jadwal shuttle ${activeDay}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-center text-xs text-text-secondary font-medium mb-8" aria-live="polite">
              {dayData.description} — {dayData.routes.length} rute tersedia
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
              role="list"
              aria-label="Rute shuttle bus"
            >
              {dayData.routes.map((route, i) => (
                <div key={route.id} role="listitem">
                  <RouteCard route={route} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Notes & maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Notes */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-soft-lg border border-slate-100/80 p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-extrabold text-text-primary mb-5 tracking-tight">
              Catatan penting penjemputan
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              {shuttleNotes.map((note, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="w-6 h-6 rounded-full bg-primary/6 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="text-text-secondary text-sm leading-relaxed">{note}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Maps CTA */}
          <div className="lg:col-span-5 bg-primary rounded-3xl p-6 sm:p-8 flex flex-col gap-4 justify-between text-white shadow-[0_8px_32px_rgba(30,64,175,0.25)]">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/12 flex items-center justify-center">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold leading-tight tracking-tight">
                Lihat peta titik penjemputan
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">
                Temukan lokasi tepat setiap titik penjemputan shuttle bus di Google Maps.
              </p>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka peta titik penjemputan di Google Maps (membuka tab baru)"
              className="inline-flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-xl font-bold text-sm hover:bg-white/90 hover:-translate-y-px active:scale-[0.97] transition-all duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Buka Google Maps
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
