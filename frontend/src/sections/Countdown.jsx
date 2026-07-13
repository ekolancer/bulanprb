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
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      {/* Card */}
      <div className="relative w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28" style={{ perspective: '600px' }}>
        {/* Static base (current value) */}
        <div className="absolute inset-0 rounded-2xl bg-white shadow-soft border border-gray-100 flex items-center justify-center overflow-hidden">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tabular-nums select-none leading-none">
            {current}
          </span>
          {/* Separator line */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-gray-100 z-10" />
        </div>

        {/* Flip flap — old value folds away downward */}
        {flipping && (
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-white border border-gray-100 border-b-0 flex items-end justify-center overflow-hidden origin-bottom z-20"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{ duration: 0.26, ease: 'easeIn' }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tabular-nums select-none leading-none pb-0.5">
              {prev}
            </span>
          </motion.div>
        )}
      </div>

      {/* Label */}
      <span className="text-xxs sm:text-xs font-bold text-text-secondary uppercase tracking-[0.15em]">
        {label}
      </span>
    </div>
  );
};

// ─── Stagger variants ─────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Main component ────────────────────────────────────────────────────────
export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set ke 13 Oktober 2026 sesuai permintaan
    const targetDate = new Date('2026-10-13T09:00:00').getTime();
    const tick = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-[#fafbfc] overflow-hidden">

      {/* ── Subtle decorative blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.035]"
        style={{ background: 'radial-gradient(circle, #1E40AF 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-orange uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5" />
            Menghitung Mundur
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight">
            Acara Puncak Bulan PRB 2026
          </h2>
          <p className="mt-3 text-sm text-text-secondary font-medium max-w-md">
            {heroConfig.eventLabel}
          </p>
        </motion.div>

        {/* ── Main grid — card LEFT, countdown RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Info card ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-6 sm:p-8 flex flex-col gap-6">

              {/* Header */}
              <div>
                <span className="text-xxs font-bold text-accent-orange uppercase tracking-widest">
                  Detail Acara
                </span>
                <h3 className="text-xl font-extrabold text-text-primary mt-1 leading-tight">
                  {heroConfig.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  {heroConfig.description}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Date row */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-secondary">Tanggal Acara</p>
                  <p className="text-sm font-extrabold text-text-primary">13–15 Oktober 2026</p>
                </div>
              </div>

              {/* Venue row */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent-orange" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-secondary">Lokasi</p>
                  <p className="text-sm font-extrabold text-text-primary">{heroConfig.venue}</p>
                  <p className="text-xxs text-text-secondary font-medium">{heroConfig.location}</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── RIGHT: Flip countdown — vertically centered ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 flex items-center justify-center lg:justify-start"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8">
                {units.map((unit, i) => (
                  <React.Fragment key={unit.label}>
                    <FlipDigit value={unit.value} label={unit.label} />
                    {i < units.length - 1 && (
                      <div className="flex flex-col gap-2 pb-8 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
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
