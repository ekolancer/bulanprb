import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../components/Badge';
import { Clock, MapPin, ChevronDown, CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { rundownSchedule, rundownDays } from '../data';

const statusConfig = {
  Selesai:       { icon: CheckCircle, dot: 'bg-success border-success',                    badgeVariant: 'success' },
  Berlangsung:   { icon: AlertCircle, dot: 'bg-warning border-warning animate-pulse',      badgeVariant: 'warning' },
  'Akan Datang': { icon: Circle,      dot: 'bg-white border-slate-300',                    badgeVariant: 'info'    },
};

const TimelineItem = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = statusConfig[item.status] ?? statusConfig['Akan Datang'];
  const Icon = cfg.icon;
  const panelId = `rundown-panel-${item.id}`;
  const triggerId = `rundown-trigger-${item.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex gap-4 sm:gap-6 relative"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center shrink-0" aria-hidden="true">
        <div className={`w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center bg-white ${cfg.dot}`}>
          {item.status === 'Selesai'     && <span className="w-2 h-2 rounded-full bg-success block" />}
          {item.status === 'Berlangsung' && <span className="w-2 h-2 rounded-full bg-warning block animate-pulse" />}
        </div>
        <div className="w-px flex-1 bg-slate-200 mt-1" />
      </div>

      {/* Card */}
      <div className="flex-1 pb-6">
        <button
          id={triggerId}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="w-full text-left bg-white rounded-2xl shadow-soft border border-slate-100/80 p-4 sm:p-5 hover:border-primary/20 hover:shadow-soft-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {item.time}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-text-primary leading-snug">{item.title}</h3>
              <span className="flex items-center gap-1.5 text-xs text-text-secondary font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-accent-orange" aria-hidden="true" />
                {item.location}
              </span>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <Badge variant={cfg.badgeVariant}>{item.status}</Badge>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4 text-text-secondary" />
              </motion.div>
            </div>
          </div>
        </button>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-2 px-4 py-3 bg-primary/4 rounded-xl border border-primary/8 text-xs text-text-secondary leading-relaxed flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <span>
                  Sesi <strong className="text-text-primary">{item.category}</strong> ·{' '}
                  {item.status === 'Selesai'
                    ? 'Kegiatan ini telah selesai dilaksanakan.'
                    : item.status === 'Berlangsung'
                    ? 'Kegiatan sedang berlangsung saat ini.'
                    : 'Kegiatan akan segera dimulai sesuai jadwal.'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const RundownKegiatan = () => {
  const [activeDay, setActiveDay] = useState(rundownDays[0]);
  const dayData = rundownSchedule[activeDay];

  return (
    <section
      id="rundown"
      aria-label="Rundown kegiatan Bulan PRB 2026"
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
          <span className="section-label text-primary">Jadwal Acara</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
            Rundown kegiatan
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Ikuti seluruh rangkaian kegiatan dari hari pertama hingga penutupan resmi.
          </p>
        </motion.div>

        {/* Day pill filters */}
        <div
          className="flex items-center gap-3 overflow-x-auto pb-1 mb-10 sm:justify-center no-scrollbar"
          role="tablist"
          aria-label="Pilih hari"
        >
          {rundownDays.map((day) => {
            const d = rundownSchedule[day];
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${day}`}
                onClick={() => setActiveDay(day)}
                className={`shrink-0 flex flex-col items-center gap-0.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-primary text-white shadow-soft'
                    : 'bg-white text-text-secondary hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <span>{day}</span>
                <span className={`text-[10px] font-semibold ${isActive ? 'text-white/75' : 'text-text-secondary'}`}>
                  {d.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Day tagline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold">
              {dayData.tagline} · {dayData.items.length} sesi
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Timeline */}
        <div
          className="max-w-2xl mx-auto"
          id={`panel-${activeDay}`}
          role="tabpanel"
          aria-label={`Jadwal ${activeDay}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {dayData.items.map((item, i) => (
                <TimelineItem key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
