import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Calendar, MapPin, ChevronDown, Users, CheckCircle, Map, Activity } from 'lucide-react';
import { heroConfig, heroStats } from '../data';
import heroBg from '../assets/hero.png';

// ─── Animated counter ────────────────────────────────────────────────────────
const useCountUp = (target, duration = 1400) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
};

const iconMap = {
  CheckCircle: CheckCircle,
  Users: Users,
  Map: Map,
  Activity: Activity,
};

const StatBadge = ({ stat, delay }) => {
  const { count, start } = useCountUp(stat.value, 1400);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  const Icon = iconMap[stat.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-1 px-3 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center"
    >
      {Icon && <Icon className="w-4 h-4 text-white/60 mb-0.5" />}
      <span className="text-lg sm:text-xl font-extrabold text-white leading-none tabular-nums">
        {count.toLocaleString('id-ID')}{stat.suffix}
      </span>
      <span className="text-xxs text-white/60 font-semibold leading-tight">{stat.label}</span>
    </motion.div>
  );
};

// ─── Stagger container variants ─────────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.25,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }, // custom ease-out expo
  },
};

// ─── Main component ──────────────────────────────────────────────────────────
export const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(heroConfig.eventDate).getTime();
    const interval = setInterval(() => {
      const diff = targetDate - Date.now();
      if (diff <= 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Background image ── */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── Dark gradient overlay ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      {/* Subtle color tint at bottom for section transition */}
      <div className="absolute bottom-0 inset-x-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── LEFT: Copy, staggered slide-up ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 flex flex-col gap-5 text-left"
          >
            {/* Event badge */}
            <motion.div variants={slideUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white font-bold text-xs sm:text-sm">
                <Calendar className="w-4 h-4 shrink-0" />
                Oktober 2025 · Jakarta
              </span>
            </motion.div>

            {/* Tagline pill */}
            <motion.div variants={slideUp}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-orange/90 text-white font-extrabold text-sm sm:text-base tracking-wide">
                🔥 {heroConfig.tagline}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={slideUp}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm"
            >
              {heroConfig.title} <br />
              <span className="text-primary-light">{heroConfig.year}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={slideUp}
              className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl"
            >
              {heroConfig.description}
            </motion.p>

            {/* Location */}
            <motion.div
              variants={slideUp}
              className="flex items-center gap-2 text-white/70 text-sm font-semibold"
            >
              <MapPin className="w-4 h-4 text-accent-orange shrink-0" />
              <span>{heroConfig.location}</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={slideUp} className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => document.getElementById('gerakan')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Partisipasi Gerakan
              </Button>
              {/* White outline secondary for dark bg */}
              <button
                onClick={() => window.location.href = '/rundown'}
                className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/40 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
              >
                Lihat Jadwal
              </button>
            </motion.div>

            {/* Stats — 2×2 on mobile, 4-col on sm+ */}
            <motion.div
              variants={slideUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1"
            >
              {heroStats.map((stat, i) => (
                <StatBadge key={stat.label} stat={stat} delay={0.6 + i * 0.06} />
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Countdown card, slide-up with longer delay ── */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-3xl w-full max-w-sm flex flex-col gap-6 text-center shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
            >
              {/* Card header */}
              <div className="flex flex-col gap-1">
                <span className="text-xxs font-bold text-accent-orange uppercase tracking-widest">
                  Menghitung Mundur
                </span>
                <h3 className="font-extrabold text-white text-base sm:text-lg leading-tight">
                  Acara Puncak Bulan PRB 2025
                </h3>
              </div>

              {/* Countdown boxes */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {countdownUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="bg-white/10 border border-white/15 rounded-2xl p-2 sm:p-3 flex flex-col items-center gap-1"
                  >
                    <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tabular-nums leading-none">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-xxs text-white/55 font-semibold uppercase tracking-wider">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="flex flex-col gap-2 border-t border-white/15 pt-4">
                <p className="text-xs text-white/65 font-semibold">{heroConfig.eventLabel}</p>
                <div className="w-full bg-white/15 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="bg-primary-light h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xxs text-white/45">72% persiapan selesai</p>
              </div>

              {/* Venue */}
              <div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white/80" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{heroConfig.venue}</p>
                  <p className="text-xxs text-white/55 font-medium">{heroConfig.location}</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50"
      >
        <span className="text-xxs font-semibold tracking-widest uppercase">Gulir ke bawah</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>

    </section>
  );
};
