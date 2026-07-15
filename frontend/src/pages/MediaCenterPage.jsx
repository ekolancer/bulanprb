import React from 'react';
import { motion } from 'framer-motion';
import { GaleriFoto } from '../sections/GaleriFoto';
import { TwibbonAjakan } from '../sections/TwibbonAjakan';
import { KumpulanDokumen } from '../sections/KumpulanDokumen';

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const MediaCenterPage = () => (
  <>
    <GaleriFoto />
    <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-80px' }}>
      <TwibbonAjakan />
    </motion.div>
    <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-80px' }}>
      <KumpulanDokumen />
    </motion.div>
  </>
);
