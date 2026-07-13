import React from 'react';
import { Hero } from '../sections/Hero';
import { Countdown } from '../sections/Countdown';
import { GerakanPRB } from '../sections/GerakanPRB';
import { PuncakPeringatan } from '../sections/PuncakPeringatan';
import { RoadToPRB } from '../sections/RoadToPRB';
import { PRBTahunKeTahun } from '../sections/PRBTahunKeTahun';
import { FAQ } from '../sections/FAQ';
import { MitraSponsor } from '../sections/MitraSponsor';
import { motion } from 'framer-motion';

export const LandingPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <>
      <Hero />
      <Countdown />
      <motion.div variants={pageVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-100px' }}>
        <GerakanPRB />
      </motion.div>
      <motion.div variants={pageVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-100px' }}>
        <PuncakPeringatan />
      </motion.div>
      <motion.div variants={pageVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-100px' }}>
        <RoadToPRB />
      </motion.div>
      <motion.div variants={pageVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-100px' }}>
        <PRBTahunKeTahun />
      </motion.div>
      <motion.div variants={pageVariants} initial="initial" whileInView="animate" viewport={{ once: true, margin: '-100px' }}>
        <FAQ />
      </motion.div>
      <MitraSponsor />
    </>
  );
};
