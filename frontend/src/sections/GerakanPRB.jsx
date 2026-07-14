import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { CheckCircle, Users, Map, Activity } from 'lucide-react';
import { gerakanStats, koboFormUrl } from '../data';

const iconComponents = {
  CheckCircle,
  Users,
  Map,
  Activity,
};

const useCountUp = (target, duration = 1400) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
};

const StatItem = ({ stat, delay }) => {
  const Icon = iconComponents[stat.icon];
  const { count, start } = useCountUp(stat.value);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4 w-full"
    >
      {/* Icon Box */}
      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center shrink-0 text-slate-700">
        {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
      </div>

      {/* Value, Line & Label */}
      <div className="flex-1 min-w-0">
        <h4 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight font-mono">
          {count.toLocaleString('id-ID')}
          {stat.suffix || (stat.value > 100 ? '+' : '')}
        </h4>
        <div className="w-full h-px bg-slate-200 my-2" />
        <p className="text-text-secondary text-xs sm:text-sm font-medium tracking-wide">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
};

export const GerakanPRB = () => {
  return (
    <section id="gerakan" className="py-20 sm:py-24 bg-background relative overflow-hidden">
      {/* Decorative blurred background shape */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent-orange/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Integrated directly with the section background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight tracking-tight text-balance">
              Gerakan Nasional <span className="text-accent-orange">Pengurangan Risiko Bencana</span>
            </h2>
            
            {/* Divider under heading */}
            <div className="w-20 h-1 bg-accent-orange my-5 rounded-full" />
            
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
              Mengajak seluruh lapisan masyarakat, komunitas, pemerintah daerah, dan akademisi untuk aktif mendaftarkan aksi mitigasi dan kesiapsiagaan bencana di lingkungan masing-masing demi Indonesia tangguh.
            </p>

            <Button
              variant="primary"
              size="lg"
              className="w-fit"
              onClick={() => window.open(koboFormUrl, '_blank', 'noopener noreferrer')}
              aria-label="Daftar Gerakan PRB — membuka tab baru"
            >
              Daftar Gerakan PRB
            </Button>
          </motion.div>

          {/* Right Column: Vertical Stats Stack */}
          <div
            className="lg:col-span-6 flex flex-col justify-center gap-8 pl-0 lg:pl-8 lg:border-l border-slate-200"
            role="list"
            aria-label="Statistik Gerakan PRB"
          >
            {gerakanStats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} delay={i * 0.08} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
