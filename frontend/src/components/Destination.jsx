import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { destinationImages } from '../mock';
import { sectionReveal, staggerContainer, staggerItem, curtainLeft, curtainRight, curtainImage, viewportOnce } from './motion';

const Destination = () => {
  return (
    <motion.section
      id="destination"
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionReveal}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[340px] md:min-h-[440px]">
        <motion.div
          className="h-[260px] md:h-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={curtainLeft} className="w-full h-full overflow-hidden">
            <motion.div variants={curtainImage} className="w-full h-full">
              <OptimizedImage
                src={destinationImages.left}
                alt="Destination beach bride"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-[#fafaf6] flex flex-col justify-center items-center px-8 py-14 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={staggerItem} className="max-w-[320px]">
            <div className="font-display text-[#8b7f72] text-[10px] tracking-[0.4em] uppercase mb-3">
              Now Booking
            </div>
            <div className="font-script italic text-[#3a3a3a] text-[24px] md:text-[30px] leading-snug">
              Brides across Andhra Pradesh &amp; Telangana
            </div>
            <div className="mt-2 font-serif-body text-[#6b6760] text-[13px] md:text-[14px] leading-relaxed">
              and destination weddings across India
            </div>
          </motion.div>
          <motion.div variants={staggerItem} className="mt-8 flex flex-col gap-3 w-[220px]">
            <a href="/inquire" className="btn-outline-thin">Book With Us</a>
            <a href="/services" className="btn-outline-thin">Destination Weddings</a>
          </motion.div>
        </motion.div>
        <motion.div
          className="h-[260px] md:h-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={curtainRight} className="w-full h-full overflow-hidden">
            <motion.div variants={curtainImage} className="w-full h-full">
              <OptimizedImage
                src={destinationImages.right}
                alt="Makeup artist with bride"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Destination;
