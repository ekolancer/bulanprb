import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { CheckCircle, Users, Map, Activity } from 'lucide-react';
import { gerakanStats, gerakanBenefits, koboFormUrl } from '../data';

const iconComponents = {
  CheckCircle: CheckCircle,
  Users: Users,
  Map: Map,
  Activity: Activity,
};

const colorMap = {
  success: 'text-success bg-success/10',
  primary: 'text-primary bg-primary/10',
  'accent-orange': 'text-accent-orange bg-accent-orange/10',
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
      // ease out cubic
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
  const colorClass = colorMap[stat.color] ?? 'text-primary bg-primary/10';
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
      <Card className="p-6 sm:p-8 flex flex-col gap-4 text-left border border-gray-50/50 h-full">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <div>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight tabular-nums">
            {count.toLocaleString('id-ID')}
          </h4>
          <p className="text-text-secondary text-sm font-medium mt-1">{stat.label}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export const GerakanPRB = () => {
  return (
    <section id="gerakan" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Text & CTA — full width on mobile, 5/12 on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-5 text-left"
          >
            <span className="text-xs font-bold text-accent-orange uppercase tracking-widest">
              Program Nasional
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary leading-tight">
              Gerakan Nasional{' '}
              <span className="text-accent-orange">Pengurangan Risiko Bencana</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Gerakan ini mengajak seluruh lapisan masyarakat, komunitas, pemerintah daerah, dan akademisi untuk aktif mendaftarkan aksi mitigasi dan kesiapsiagaan bencana di lingkungan masing-masing.
            </p>

            <ul className="flex flex-col gap-3 mt-1">
              {gerakanBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center text-success shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <p className="text-text-primary text-sm font-semibold">{benefit}</p>
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              className="w-fit mt-2"
              onClick={() => window.open(koboFormUrl, '_blank')}
            >
              Daftar Gerakan PRB
            </Button>
          </motion.div>

          {/* Stats grid — 2×2, stacked full width on mobile */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            {gerakanStats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={i * 0.08} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
