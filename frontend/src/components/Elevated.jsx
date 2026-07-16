import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { elevatedImage } from '../mock';
import { sectionReveal, staggerContainer, staggerItem, blurItem, curtainLeft, curtainImage, viewportOnce } from './motion';

const Elevated = () => {
  const bgImage = encodeURI('/ChatGPT Image Jul 8, 2026, 02_36_18 AM.png');

  return (
    <motion.section
      className="w-full py-20 md:py-28 relative overflow-hidden bg-[#fcfaf7]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#fcfaf7]/80" aria-hidden="true" />
      <div className="relative z-10 max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="divider-line mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div className="overflow-hidden" variants={curtainLeft}>
              <motion.div variants={curtainImage}>
                <OptimizedImage
                  src={elevatedImage}
                  alt="Elegant bride seated"
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="text-center md:text-left md:pl-6 md:pt-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 'some', margin: '10% 0px 10% 0px' }}
          >
            <motion.h3 variants={blurItem} className="font-display text-[#3a3a3a] text-[44px] md:text-[64px] tracking-[0.16em] leading-[0.95] max-w-[360px] mx-auto md:mx-0">
              ELEVATED &amp;
            </motion.h3>
            <motion.div variants={staggerItem} className="font-script italic text-[#3a3a3a] text-[44px] md:text-[56px] leading-none mt-2 md:mt-3 max-w-[360px] mx-auto md:mx-0">
              refined
            </motion.div>

            <div className="mt-8 md:mt-10 max-w-[480px] mx-auto md:mx-0 text-[#4a4742] text-[15px] md:text-[16px] leading-[1.9] font-serif-body">
              <motion.p variants={staggerItem}>
                Rooted in Vijayawada and serving brides across Andhra Pradesh,
                Lush Makeovers specialises in timeless, natural bridal beauty
                for brides who value an elevated, personalised experience.
              </motion.p>
              <motion.p variants={staggerItem} className="mt-5">
                Known for our individualised approach and signature
                aesthetic - refined, elegant and effortless. Our airbrush
                precision, calming presence and standout expertise make us the
                artist of choice for brides seeking a high-end, luxury beauty
                experience.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Elevated;
