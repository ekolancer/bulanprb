import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Quote } from 'lucide-react';

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
      className="flex flex-col items-center gap-1.5 sm:gap-3"
      aria-label={`${value} ${label}`}
    >
      {/* Card */}
      <div
        className="relative w-14 h-[4.5rem] xs:w-16 xs:h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28"
        style={{ perspective: '600px' }}
        aria-hidden="true"
      >
        {/* Static base */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur-md shadow-soft-lg border border-white/25 flex items-center justify-center overflow-hidden">
          <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tabular-nums select-none leading-none font-mono">
            {current}
          </span>
          {/* Center separator */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/20 z-10" />
          {/* Subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        </div>

        {/* Flip flap — old value folds away */}
        {flipping && (
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl sm:rounded-t-2xl bg-white/15 backdrop-blur-md border border-white/25 border-b-0 flex items-end justify-center overflow-hidden origin-bottom z-20"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{ duration: 0.26, ease: 'easeIn' }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-primary tabular-nums select-none leading-none pb-0.5 font-mono">
              {prev}
            </span>
          </motion.div>
        )}
      </div>

      {/* Label */}
      <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-white/85 uppercase tracking-[0.1em] sm:tracking-[0.15em]">
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
      className="relative min-h-[100dvh] flex items-center py-16 xs:py-20 sm:py-24 lg:py-28 bg-[#033b80] overflow-hidden"
    >
      {/* Subtle geometric pattern background */}
      <div
        className="absolute inset-0 opacity-[0.06] text-white"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col items-center text-center mb-14 sm:mb-16"
        >
          <h2 className="flex flex-col tracking-wider px-2">
            <span
              className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent uppercase leading-relaxed"
              style={{ backgroundImage: 'linear-gradient(90deg, #ff9800 0%, #f44336 100%)' }}
            >
              Peringatan Bulan
            </span>
            <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 sm:mt-4 pb-2 leading-relaxed uppercase" style={{ color: '#fcf3e3' }}>
              Pengurangan Risiko Bencana (PRB)
            </span>
            <span
              className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold bg-clip-text text-transparent mt-3 sm:mt-4 leading-relaxed uppercase"
              style={{ backgroundImage: 'linear-gradient(90deg, #ff9800 0%, #f44336 100%)' }}
            >
              Tahun 2026
            </span>
          </h2>
        </motion.div>

        {/* Premium quote — testimonial style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-3 mb-14 sm:mb-16"
        >
          <div className="flex items-center justify-center w-11 h-11 xs:w-14 xs:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <Quote
              className="w-5 h-5 xs:w-6 xs:h-6 text-white/80 fill-white/20"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <p className="text-base xs:text-lg sm:text-xl lg:text-2xl font-semibold text-white italic tracking-wider max-w-xl px-4">
            "NGARIKSA BUMI BANTEN"
          </p>
        </motion.div>

        {/* Flip countdown — centered */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex items-center justify-center"
        >
          <motion.div variants={fadeUp}>
            {/* Live region — screen reader announces time changes */}
            <div
              role="timer"
              aria-live="off"
              aria-label={`${timeLeft.days} hari ${timeLeft.hours} jam ${timeLeft.minutes} menit ${timeLeft.seconds} detik menuju acara`}
              className="flex items-end justify-center gap-2 xs:gap-3 sm:gap-6 lg:gap-8"
            >
              {units.map((unit, i) => (
                <React.Fragment key={unit.label}>
                  <FlipDigit value={unit.value} label={unit.label} />
                  {i < units.length - 1 && (
                    <div className="flex flex-col gap-1.5 sm:gap-2 pb-6 sm:pb-16 shrink-0" aria-hidden="true">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/60" />
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/60" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
