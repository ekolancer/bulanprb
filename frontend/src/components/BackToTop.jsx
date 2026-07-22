import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const APPEAR_THRESHOLD = 0.2; // 20% of page scrolled

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  // scrollYProgress: 0 -> 1 across the full document height
  const { scrollYProgress } = useScroll();

  // Smooth spring-damped progress so the ring never jitters on fast scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setVisible(latest > APPEAR_THRESHOLD);
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.85, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 24, scale: 0.85, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-fixed"
        >
          {/* Outer shell — double-bezel frame */}
          <div className="relative p-1.5 rounded-full bg-white/60 backdrop-blur-xl ring-1 ring-slate-900/5 shadow-soft-lg">
            <motion.button
              type="button"
              onClick={handleClick}
              aria-label="Kembali ke atas halaman"
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              {/* Progress ring */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 56 56"
                aria-hidden="true"
              >
                <circle
                  cx="28"
                  cy="28"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-100"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-primary"
                  style={{ pathLength: smoothProgress }}
                  strokeDasharray="1 1"
                  pathOffset={0}
                />
              </svg>

              {/* Nested inner icon — kinetic tension on hover */}
              <motion.span
                className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
                initial={false}
                whileHover={{ y: -1 }}
              >
                <ArrowUp className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.25} />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
