import React from 'react';
import { motion } from 'framer-motion';
import { ShuttleBus } from '../sections/ShuttleBus';
import { Akomodasi } from '../sections/Akomodasi';

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const AkomodasiPage = () => (
  <>
    <ShuttleBus />
    <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-80px' }}>
      <Akomodasi />
    </motion.div>
  </>
);
