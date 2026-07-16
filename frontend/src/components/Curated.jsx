import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { curatedImage, curatedPoints } from '../mock';
import { sectionReveal, staggerContainer, staggerItem } from './motion';

const Curated = () => {
  return (
    <motion.section
      className="w-full bg-white py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionReveal}
    >
      <div className="max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div className="order-2 md:order-1 md:pr-4" variants={staggerContainer}>
            <div className="mx-auto md:mx-0 max-w-[620px]">
              <motion.div className="font-display text-[#2f2a27] text-[30px] sm:text-[38px] md:text-[50px] lg:text-[64px] tracking-[0.16em] leading-[0.95] uppercase text-center md:text-left" variants={staggerItem}>
                Why Brides Trust Us
              </motion.div>
              <motion.p className="mt-6 md:mt-8 text-[#4f4943] text-[15px] md:text-[17px] leading-[1.85] font-serif-body text-center md:text-left max-w-[560px]" variants={staggerItem}>
                At Lush Makeovers, the bridal morning is planned, calm, and beautifully on time.
              </motion.p>
              <motion.ul className="mt-8 md:mt-10 space-y-5 md:space-y-6" variants={staggerContainer}>
                {curatedPoints.map((point, index) => (
                  <motion.li key={index} className="border-l border-[#d8cec4] pl-4 md:pl-5 py-1" variants={staggerItem}>
                    <div className="font-display text-[#2f2a27] text-[17px] md:text-[20px] tracking-[0.08em] uppercase leading-[1.25]">
                      {point.strong}
                    </div>
                    <p className="mt-2 text-[#5d544d] text-[14px] md:text-[15px] leading-[1.85] font-serif-body max-w-[520px]">
                      {point.rest.replace(/^ - /, '')}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          <motion.div className="order-1 md:order-2 img-zoom" whileHover={{ scale: 1.01 }} transition={{ duration: 0.35 }}>
            <OptimizedImage
              src={curatedImage}
              alt="Bride elegant pose"
              className="w-full h-[460px] sm:h-[540px] md:h-[600px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Curated;
