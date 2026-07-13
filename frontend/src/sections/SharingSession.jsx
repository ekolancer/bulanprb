import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/Card';
import { Clock, MapPin, Tag, User } from 'lucide-react';
import { sharingSessions, pembicara, rundownDays } from '../data';

const SESSION_DAY_ALL = 'Semua';

export const SharingSession = () => {
  const [activeDay, setActiveDay] = useState(SESSION_DAY_ALL);

  const dayOptions = [SESSION_DAY_ALL, ...rundownDays];

  const filteredSessions = useMemo(() => {
    if (activeDay === SESSION_DAY_ALL) return sharingSessions;
    return sharingSessions.filter((s) => s.day === activeDay);
  }, [activeDay]);

  const getSpeakers = (ids) => ids.map((id) => pembicara.find((p) => p.id === id)).filter(Boolean);

  return (
    <section id="sharing" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-xs font-bold text-accent-orange uppercase tracking-widest">Knowledge Sharing</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary">
            Jadwal Sharing Session
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Temui para ahli kebencanaan yang siap berbagi ilmu dan pengalaman lapangan.
          </p>
        </motion.div>

        {/* Day filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-8 sm:justify-center
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {dayOptions.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeDay === day
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white text-text-secondary hover:bg-gray-50 border border-gray-100'
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
          >
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, i) => {
                const speakers = getSpeakers(session.speakerIds);
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                  >
                    <Card className="p-5 sm:p-6 text-left border border-gray-50 flex flex-col gap-4 h-full">

                      {/* Day + time */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-1 rounded-full bg-primary/5 text-primary text-xxs font-bold">
                          {session.day}
                        </span>
                        <span className="flex items-center gap-1 text-xxs text-text-secondary font-medium">
                          <Clock className="w-3 h-3 shrink-0 text-accent-orange" />
                          {session.time}
                        </span>
                        <span className="flex items-center gap-1 text-xxs text-text-secondary font-medium">
                          <MapPin className="w-3 h-3 shrink-0 text-primary" />
                          {session.location}
                        </span>
                      </div>

                      {/* Theme & description */}
                      <div className="flex flex-col gap-2 flex-1">
                        <h3 className="text-base sm:text-lg font-extrabold text-text-primary leading-snug">
                          {session.theme}
                        </h3>
                        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                          {session.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {session.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 text-text-secondary text-xxs font-bold"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Speakers */}
                      <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                        <span className="flex items-center gap-1.5 text-xxs font-bold text-text-secondary uppercase tracking-wider">
                          <User className="w-3 h-3" />
                          Pembicara
                        </span>
                        <div className="flex flex-col gap-2.5">
                          {speakers.map((spk) => (
                            <div key={spk.id} className="flex items-center gap-3">
                              <img
                                src={spk.photo}
                                alt={spk.name}
                                className="w-9 h-9 rounded-full object-cover object-top bg-gray-100 shrink-0"
                              />
                              <div>
                                <p className="text-xs font-bold text-text-primary leading-tight">{spk.name}</p>
                                <p className="text-xxs text-text-secondary font-medium">{spk.title}</p>
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
              <div className="col-span-2 text-center py-14 text-text-secondary">
                <p className="text-sm font-semibold">Belum ada sesi untuk {activeDay}.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
