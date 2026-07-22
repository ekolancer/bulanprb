import React from 'react';
import { motion } from 'framer-motion';
import { RundownKegiatan } from '../sections/RundownKegiatan';
import { SharingSession } from '../sections/SharingSession';
import { PembicaraUtama } from '../sections/PembicaraUtama';
import { ShuttleBus } from '../sections/ShuttleBus';
import { Akomodasi } from '../sections/Akomodasi';

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export const RundownPage = () => (
  <>
    <RundownKegiatan />
    <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-80px' }}>
      <SharingSession />
    </motion.div>
    <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-80px' }}>
      <PembicaraUtama />
    </motion.div>
    <ShuttleBus />
    <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-80px' }}>
      <Akomodasi />
    </motion.div>
  </>
);
