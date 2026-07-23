import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/Card';
import { Clock, MapPin, Tag, User } from 'lucide-react';
import { sharingSessions, pembicara, rundownDays } from '../../data';

const SESSION_DAY_ALL = 'Semua';

export const SharingSession = () => {
  const [activeDay, setActiveDay] = useState(SESSION_DAY_ALL);
  const dayOptions = [SESSION_DAY_ALL, ...rundownDays];

  const filteredSessions = useMemo(() => {
    if (activeDay === SESSION_DAY_ALL) return sharingSessions;
    return sharingSessions.filter((s) => s.day === activeDay);
  }, [activeDay]);

  const getSpeakers = (ids) =>
    ids.map((id) => pembicara.find((p) => p.id === id)).filter(Boolean);

  return (
    <section
      id="sharing"
      aria-label="Jadwal sharing session Bulan PRB 2026"
      className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center max-w-xl mx-auto mb-10"
        >
          {/* <span className="section-label text-accent-orange">Knowledge Sharing</span> */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
            Jadwal sharing session
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Temui para ahli kebencanaan yang siap berbagi ilmu dan pengalaman lapangan.
          </p>
        </motion.div>

        {/* Day filter pills */}
        <div
          className="flex gap-2 overflow-x-auto pb-1 mb-8 sm:justify-center no-scrollbar"
          role="tablist"
          aria-label="Filter hari sharing session"
        >
          {dayOptions.map((day) => (
            <button
              key={day}
              role="tab"
              aria-selected={activeDay === day}
              onClick={() => setActiveDay(day)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeDay === day
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white text-text-secondary hover:bg-slate-50 border border-slate-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Session cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            role="list"
            aria-label={`Sesi ${activeDay}`}
          >
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, i) => {
                const speakers = getSpeakers(session.speakerIds);
                return (
                  <motion.div
                    key={session.id}
                    role="listitem"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                  >
                    <Card elevated className="p-5 sm:p-6 text-left flex flex-col gap-4 h-full">

                      {/* Day + time + location */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold">
                          {session.day}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-text-secondary font-medium">
                          <Clock className="w-3 h-3 shrink-0 text-accent-orange" aria-hidden="true" />
                          {session.time}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-text-secondary font-medium">
                          <MapPin className="w-3 h-3 shrink-0 text-primary" aria-hidden="true" />
                          {session.location}
                        </span>
                      </div>

                      {/* Theme & description */}
                      <div className="flex flex-col gap-2 flex-1">
                        <h3 className="text-base sm:text-lg font-extrabold text-text-primary leading-snug tracking-tight">
                          {session.theme}
                        </h3>
                        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                          {session.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5" role="list" aria-label="Topik sesi">
                        {session.tags.map((tag) => (
                          <span
                            key={tag}
                            role="listitem"
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 text-text-secondary text-[10px] font-bold"
                          >
                            <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Speakers */}
                      <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                          <User className="w-3 h-3" aria-hidden="true" />
                          Pembicara
                        </span>
                        <div className="flex flex-col gap-2.5">
                          {speakers.map((spk) => (
                            <div key={spk.id} className="flex items-center gap-3">
                              <img
                                src={spk.photo}
                                alt={`Foto ${spk.name}`}
                                className="w-9 h-9 rounded-full object-cover object-top bg-slate-100 shrink-0"
                              />
                              <div>
                                <p className="text-xs font-bold text-text-primary leading-tight">{spk.name}</p>
                                <p className="text-[10px] text-text-secondary font-medium">{spk.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-14 text-text-secondary" role="status">
                <p className="text-sm font-semibold">Belum ada sesi untuk {activeDay}.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
