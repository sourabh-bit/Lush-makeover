import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { philosophyImage, homeHero } from '../mock';
import { sectionReveal } from './motion';

const Philosophy = () => {
  return (
    <motion.section
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionReveal}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <motion.div className="img-zoom h-[420px] md:h-[640px]" whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
          <OptimizedImage
            src={philosophyImage}
            alt="Bride in elegant gown"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          className="bg-white flex items-center justify-center px-8 py-16 md:py-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-[480px]">
            <h3 className="font-display text-[#3a3a3a] text-[44px] md:text-[64px] tracking-[0.14em] leading-[0.95]">
              MY
            </h3>
            <div className="font-script italic text-[#3a3a3a] text-[48px] md:text-[68px] leading-none mt-2">
              philosophy
            </div>
            <div className="mt-10 text-[#4a4742] text-[15px] md:text-[16px] leading-[1.9] font-serif-body max-w-[560px]">
              <p>{homeHero.philosophy}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Philosophy;
