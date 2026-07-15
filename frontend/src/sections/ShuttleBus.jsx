import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bus, Phone } from 'lucide-react';
import { shuttleSchedule, shuttleDays } from '../data';

export const ShuttleBus = () => {
  const [activeDay, setActiveDay] = useState(shuttleDays[1]);
  const dayData = shuttleSchedule[activeDay];

  return (
    <section
      id="shuttle"
      aria-label="Jadwal shuttle bus Bulan PRB 2026"
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

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-4 mb-14 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.1] text-balance">
            Jadwal shuttle bus
          </h2>
          <p className="text-text-secondary text-base leading-relaxed max-w-md">
            Layanan transportasi gratis dari titik penjemputan utama menuju lokasi acara.
          </p>
        </motion.div>

        {/* Day tabs */}
        <div
          className="flex items-center justify-center gap-2 mb-12 sm:mb-14"
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
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-text-secondary ring-1 ring-black/10 hover:bg-black/[0.03]'
                }`}
              >
                {d.label}
                <span className={`text-xs font-normal ${isActive ? 'text-white/70' : 'text-text-secondary/70'}`}>
                  {d.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Route table — Double-Bezel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            id={`shuttle-panel-${activeDay}`}
            role="tabpanel"
            aria-label={`Jadwal shuttle ${activeDay}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2rem] bg-black/[0.02] ring-1 ring-black/5 p-2"
          >
            {/* Inner core */}
            <div className="rounded-[calc(2rem-0.375rem)] bg-white ring-1 ring-black/[0.03] overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th scope="col" className="px-6 sm:px-8 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary text-center">
                      Armada
                    </th>
                    <th scope="col" className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary text-center">
                      Dari
                    </th>
                    <th scope="col" className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary text-center">
                      Tujuan
                    </th>
                    <th scope="col" className="px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary text-center">
                      Keberangkatan
                    </th>
                    <th scope="col" className="px-6 sm:px-8 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary text-center">
                      Kontak
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dayData.routes.map((route, i) => (
                    <motion.tr
                      key={route.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className={`${i !== dayData.routes.length - 1 ? 'border-b border-slate-50' : ''} hover:bg-black/[0.015] transition-colors duration-300`}
                    >
                      <td className="px-6 sm:px-8 py-5 align-top whitespace-nowrap">
                        <div className="flex items-left gap-3">
                          <div className="w-9 h-9 rounded-xl bg-primary/[0.06] ring-1 ring-primary/10 flex items-center justify-center shrink-0">
                            <Bus className="w-4 h-4 text-primary" strokeWidth={1.5} aria-hidden="true" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-bold text-text-primary leading-snug">{route.type}</span>
                            <span className="text-xs font-medium text-text-secondary/70 tabular-nums font-mono">{route.plateNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="flex items-start justify-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-accent-orange shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                          <span className="text-sm font-medium text-text-secondary leading-snug">{route.from}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="flex items-start justify-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                          <span className="text-sm font-medium text-text-secondary leading-snug">{route.to}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top whitespace-nowrap text-center">
                        <span className="px-2.5 py-1 rounded-full bg-primary/[0.06] ring-1 ring-primary/10 text-primary text-xs font-bold tabular-nums font-mono">
                          {route.departureTime}
                        </span>
                      </td>
                      <td className="px-6 sm:px-8 py-5 align-top whitespace-nowrap text-center">
                        <a
                          href={`https://wa.me/${route.contact.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-primary transition-colors duration-300"
                        >
                          <Phone className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
                          {route.contact}
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
