import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, ChevronDown } from 'lucide-react';
import { rundownSchedule, rundownDays } from '../data';

const CardContent = ({ item, expanded, setExpanded, triggerId, panelId }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Category Color Mapper
  const getCategoryStyles = (category) => {
    const cat = (category || '').toLowerCase();
    switch (cat) {
      case 'registrasi':
        return 'bg-slate-100 text-slate-700 border-slate-200/50';
      case 'seremonial':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100/50';
      case 'istirahat':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100/50';
      case 'pameran':
        return 'bg-purple-50 text-purple-700 border-purple-100/50';
      case 'media':
        return 'bg-pink-50 text-pink-700 border-pink-100/50';
      case 'simulasi':
        return 'bg-amber-50 text-amber-700 border-amber-100/50';
      case 'talkshow':
        return 'bg-blue-50 text-blue-700 border-blue-100/50';
      case 'sharing':
        return 'bg-teal-50 text-teal-700 border-teal-100/50';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  // Status Indicator Mapper
  const getStatusBadge = (status) => {
    if (status === 'Selesai') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-success border border-emerald-200/50">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          Selesai
        </span>
      );
    }
    if (status === 'Berlangsung') {
      return (
        <span className="relative inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-warning border border-amber-200/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-warning"></span>
          </span>
          Berlangsung
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-text-secondary border border-slate-200/30">
        <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
        Akan Datang
      </span>
    );
  };

  return (
    <div className="relative group">
      <button
        id={triggerId}
        onClick={() => setExpanded(!expanded)}
        onMouseMove={handleMouseMove}
        aria-expanded={expanded}
        aria-controls={panelId}
        style={{
          '--x': `${coords.x}px`,
          '--y': `${coords.y}px`,
        }}
        className="w-full text-left bg-white rounded-2xl shadow-soft border border-slate-100 p-5 sm:p-6 hover:border-slate-200/80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary spotlight-border-orange hover:-translate-y-0.5"
      >
        <div className="flex flex-col gap-3">
          {/* Header Row: Category & Status */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase border ${getCategoryStyles(item.category)}`}>
              {item.category}
            </span>
            {/* {getStatusBadge(item.status)} */}
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
                <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {item.time}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight leading-snug group-hover:text-primary transition-colors duration-200">
                {item.title}
              </h3>
              <span className="flex items-center gap-1.5 text-xs text-text-secondary font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-accent-orange" aria-hidden="true" />
                {item.location}
              </span>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-primary/5 transition-colors duration-300 mt-1 shrink-0">
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </motion.div>
            </div>
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-2.5 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 text-xs sm:text-sm text-text-secondary leading-relaxed">
              <p className="font-bold text-text-primary mb-1.5 tracking-tight flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Deskripsi Kegiatan:
              </p>
              <p className="pl-3 border-l-2 border-slate-200">
                {item.description || 'Tidak ada deskripsi kegiatan.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const panelId = `rundown-panel-${item.id}`;
  const triggerId = `rundown-trigger-${item.id}`;
  const isEven = index % 2 === 0;

  const isOngoing = item.status === 'Berlangsung';
  const isCompleted = item.status === 'Selesai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex gap-4 sm:gap-6 relative md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-8"
    >
      {/* Card Left (Desktop only, for even items) */}
      {isEven ? (
        <div className="hidden md:block w-full">
          <CardContent item={item} expanded={expanded} setExpanded={setExpanded} triggerId={triggerId} panelId={panelId} />
        </div>
      ) : (
        <div className="hidden md:block w-full" aria-hidden="true" />
      )}

      {/* Timeline dot & line */}
      <div className="flex flex-col items-center shrink-0 h-full relative" aria-hidden="true">
        <div className={`w-6 h-6 rounded-full border-2 z-10 flex items-center justify-center bg-white shrink-0 transition-all duration-300 ${
          isOngoing
            ? 'border-warning shadow-[0_0_12px_rgba(217,119,6,0.4)] animate-pulse'
            : isCompleted
              ? 'border-success bg-success/5'
              : 'border-slate-300'
        }`}>
          <span className={`w-2.5 h-2.5 rounded-full block transition-colors duration-300 ${
            isOngoing
              ? 'bg-warning'
              : isCompleted
                ? 'bg-success'
                : 'bg-slate-300'
          }`} />
        </div>
        <div className="w-0.5 h-full bg-gradient-to-b from-slate-200 via-slate-200 to-transparent absolute top-6 bottom-0" />
      </div>

      {/* Card Right (Mobile default, or Desktop for odd items) */}
      {!isEven ? (
        <div className="flex-1 pb-8 md:pb-12 w-full">
          <CardContent item={item} expanded={expanded} setExpanded={setExpanded} triggerId={triggerId} panelId={panelId} />
        </div>
      ) : (
        <div className="flex-1 pb-8 md:pb-12 w-full md:hidden">
          <CardContent item={item} expanded={expanded} setExpanded={setExpanded} triggerId={triggerId} panelId={panelId} />
        </div>
      )}

      {/* Spacer for desktop even items */}
      {isEven && (
        <div className="hidden md:block w-full" aria-hidden="true" />
      )}
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
      className="py-20 sm:py-24 lg:py-28 bg-app-gradient relative overflow-hidden"
    >
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-orange/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 text-center max-w-xl mx-auto mb-12 sm:mb-16"
        >
          {/* <span className="section-label text-primary font-mono tracking-wider">Jadwal Acara</span> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tracking-tight text-balance">
            Rundown Kegiatan
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Ikuti seluruh rangkaian kegiatan dari hari pertama hingga penutupan resmi.
          </p>
        </motion.div>

        {/* Day pill filters */}
        <div className="flex justify-center mb-12">
          <div
            className="flex items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-2xl overflow-x-auto no-scrollbar border border-slate-200/50 max-w-full sm:max-w-max"
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
                  className={`relative shrink-0 flex flex-col items-center gap-0.5 px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? 'text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDayTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{day}</span>
                  <span className={`relative z-10 text-[10px] font-semibold transition-colors duration-300 ${isActive ? 'text-white/75' : 'text-text-muted'}`}>
                    {d.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day tagline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold border border-primary/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {dayData.tagline} · {dayData.items.length} Sesi Kegiatan
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Timeline */}
        <div
          className="max-w-2xl md:max-w-4xl mx-auto"
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
              transition={{ duration: 0.25 }}
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
