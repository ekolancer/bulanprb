import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CheckCircle, Users, Map, Activity } from 'lucide-react';
import { gerakanStats, gerakanBenefits, koboFormUrl } from '../data';

const iconComponents = {
  CheckCircle,
  Users,
  Map,
  Activity,
};

const colorMap = {
  success:        'text-success bg-success/8',
  primary:        'text-primary bg-primary/8',
  'accent-orange':'text-accent-orange bg-accent-orange/8',
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

const StatCard = ({ stat, delay }) => {
  const Icon = iconComponents[stat.icon];
  const colorClass = colorMap[stat.color] ?? 'text-primary bg-primary/8';
  const { count, start } = useCountUp(stat.value);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        elevated
        className="p-6 sm:p-7 flex flex-col gap-4 text-left h-full spotlight-border"
      >
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
          {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
        </div>
        <div>
          <h4
            className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight tabular-nums font-mono"
            aria-label={`${count.toLocaleString('id-ID')} ${stat.label}`}
          >
            {count.toLocaleString('id-ID')}
            {stat.suffix && (
              <span className="text-lg font-bold text-text-secondary">{stat.suffix}</span>
            )}
          </h4>
          <p className="text-text-secondary text-sm font-medium mt-1">{stat.label}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export const GerakanPRB = () => {
  return (
    <section id="gerakan" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-5 text-left"
          >
            {/* <span className="section-label text-accent-orange">Program Nasional</span> */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight tracking-tight text-balance">
              Gerakan Nasional{' '}
              <span className="text-accent-orange">Pengurangan Risiko Bencana</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Gerakan ini mengajak seluruh lapisan masyarakat, komunitas, pemerintah daerah, dan akademisi untuk aktif mendaftarkan aksi mitigasi dan kesiapsiagaan bencana di lingkungan masing-masing.
            </p>

            <ul className="flex flex-col gap-3 mt-1" role="list">
              {gerakanBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full bg-success/12 flex items-center justify-center text-success shrink-0 mt-0.5 text-[10px] font-bold"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <p className="text-text-primary text-sm font-semibold">{benefit}</p>
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              size="lg"
              className="w-fit mt-2"
              onClick={() => window.open(koboFormUrl, '_blank', 'noopener noreferrer')}
              aria-label="Daftar Gerakan PRB — membuka tab baru"
            >
              Daftar Gerakan PRB
            </Button>
          </motion.div>

          {/* Stats 2×2 grid */}
          <div
            className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5"
            role="list"
            aria-label="Statistik Gerakan PRB"
          >
            {gerakanStats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={i * 0.09} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
