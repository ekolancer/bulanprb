import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, CalendarDays } from 'lucide-react';
import { heroConfig } from '../data';

// ─── Flip digit ───────────────────────────────────────────────────────────
const FlipDigit = ({ value, label }) => {
  const display = String(value).padStart(2, '0');
  const [prev, setPrev] = useState(display);
  const [current, setCurrent] = useState(display);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (display !== current) {
      setPrev(current);
      setFlipping(true);
      const t = setTimeout(() => {
        setCurrent(display);
        setFlipping(false);
      }, 260);
      return () => clearTimeout(t);
    }
  }, [display, current]);

  return (
    <div
      className="flex flex-col items-center gap-2 sm:gap-3"
      aria-label={`${value} ${label}`}
    >
      {/* Card */}
      <div
        className="relative w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28"
        style={{ perspective: '600px' }}
        aria-hidden="true"
      >
        {/* Static base */}
        <div className="absolute inset-0 rounded-2xl bg-white shadow-soft-lg border border-slate-100/80 flex items-center justify-center overflow-hidden">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tabular-nums select-none leading-none font-mono">
            {current}
          </span>
          {/* Center separator */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-slate-100 z-10" />
          {/* Subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
        </div>

        {/* Flip flap — old value folds away */}
        {flipping && (
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-white border border-slate-100 border-b-0 flex items-end justify-center overflow-hidden origin-bottom z-20"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{ duration: 0.26, ease: 'easeIn' }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tabular-nums select-none leading-none pb-0.5 font-mono">
              {prev}
            </span>
          </motion.div>
        )}
      </div>

      {/* Label */}
      <span className="text-[10px] sm:text-xs font-bold text-text-secondary uppercase tracking-[0.15em]">
        {label}
      </span>
    </div>
  );
};

// ─── Stagger variants ─────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Main component ────────────────────────────────────────────────────────
export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-13T09:00:00').getTime();
    const tick = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Hari',  value: timeLeft.days },
    { label: 'Jam',   value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      aria-label="Countdown menuju acara puncak Bulan PRB 2026"
      className="relative py-20 sm:py-24 lg:py-28 bg-white overflow-hidden"
    >
      {/* Ambient blob left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #1E40AF 0%, transparent 70%)' }}
      />
      {/* Ambient blob right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #E8621A 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-orange uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            Menghitung Mundur
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight tracking-tight">
            Acara Puncak Bulan PRB 2026
          </h2>
        </motion.div>

        {/* Main grid — info card LEFT, countdown RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT: Info card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl shadow-soft-lg border border-slate-100/80 p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-bold text-accent-orange uppercase tracking-widest">
                  Detail Acara
                </span>
                <h3 className="text-xl font-extrabold text-text-primary mt-1 leading-tight tracking-tight">
                  {heroConfig.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  {heroConfig.description}
                </p>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Date row */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-secondary">Tanggal Acara</p>
                  <p className="text-sm font-extrabold text-text-primary">13–15 Oktober 2026</p>
                </div>
              </div>

              {/* Venue row */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-orange/8 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent-orange" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-secondary">Lokasi</p>
                  <p className="text-sm font-extrabold text-text-primary">{heroConfig.venue}</p>
                  <p className="text-[10px] text-text-secondary font-medium mt-0.5">{heroConfig.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Flip countdown */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 flex items-center justify-center lg:justify-start"
          >
            <motion.div variants={fadeUp}>
              {/* Live region — screen reader announces time changes */}
              <div
                role="timer"
                aria-live="off"
                aria-label={`${timeLeft.days} hari ${timeLeft.hours} jam ${timeLeft.minutes} menit ${timeLeft.seconds} detik menuju acara`}
                className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8"
              >
                {units.map((unit, i) => (
                  <React.Fragment key={unit.label}>
                    <FlipDigit value={unit.value} label={unit.label} />
                    {i < units.length - 1 && (
                      <div className="flex flex-col gap-2 pb-8 shrink-0" aria-hidden="true">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
