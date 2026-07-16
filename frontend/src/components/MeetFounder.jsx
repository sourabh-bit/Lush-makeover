import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { founderAccordions } from '../mock';
import { ChevronDown } from 'lucide-react';
import { sectionReveal, staggerContainer, staggerItem } from './motion';

const founderBg = encodeURI('/ChatGPT Image Jul 8, 2026, 02_36_18 AM.png');

const MeetFounder = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const renderAccordions = (titleClassName = 'text-[20px] sm:text-[22px]', bodyClassName = 'text-[14px] sm:text-[15px]') => (
    <motion.div className="mt-10 border-t border-[#d9d2c6]" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      {founderAccordions.slice(1).map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <motion.div key={item.title} className="border-b border-[#d9d2c6]" variants={staggerItem}>
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className={`font-script italic text-[#3a3a3a] ${titleClassName}`}>
                {item.title}
              </span>
              <ChevronDown
                size={18}
                strokeWidth={1.25}
                className={`text-[#6b6760] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
              <p className={`text-[#4a4742] ${bodyClassName} leading-[1.85] font-serif-body pr-2`}>
                {item.content}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );

  return (
    <motion.section className="relative w-full overflow-hidden py-20 md:py-28 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal}>
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${founderBg})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/80" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/70 to-white/85" aria-hidden="true" />

      <div className="relative z-10 max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="md:hidden -mx-4 sm:-mx-6">
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[74%] bg-[#6a5d56]" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[#faf8f3]" aria-hidden="true" />
            <div className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20" style={{ backgroundImage: `url(${founderBg})` }} aria-hidden="true" />

            <div className="relative z-30 px-6 sm:px-8 pt-8 pb-10">
              <motion.div className="mx-auto w-[78vw] max-w-[310px] shadow-[0_24px_48px_-34px_rgba(35,24,18,0.5)]" whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                <OptimizedImage
                  src="/founder-photo.jpg"
                  alt="Founder with bride"
                  className="w-full aspect-[3/4] object-cover"
                />
              </motion.div>
            </div>
          </div>

          <div className="px-6 sm:px-8 mt-8 text-center">
            <h3 className="font-display text-[#3a3a3a] text-[28px] sm:text-[34px] tracking-[0.08em] leading-[0.95]">
              Meet <span className="font-script italic tracking-normal">Our Founder</span>
            </h3>
          </div>

          <div className="px-6 sm:px-8 mt-5 text-center">
            <p className="mx-auto max-w-[520px] text-[#4a4742] text-[15px] sm:text-[16px] font-serif-body italic leading-[1.9]">
              Thank you for being here — if you&apos;re planning your bridal look, you&apos;re in the right hands.
            </p>
          </div>

          <div className="px-6 sm:px-8">
            {renderAccordions('text-[20px] sm:text-[22px]', 'text-[14px] sm:text-[15px]')}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div className="md:pr-6" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <h3 className="font-display text-[#3a3a3a] text-[44px] md:text-[60px] tracking-[0.08em] leading-[0.95] max-w-[420px]">
              Meet <span className="font-script italic tracking-normal">Our Founder</span>
            </h3>
            <p className="mt-8 max-w-[520px] text-[#4a4742] text-[15px] md:text-[16px] font-serif-body italic leading-[1.9]">
              Thank you for being here — if you&apos;re planning your bridal look, you&apos;re in the right hands.
            </p>

            {renderAccordions('text-[20px] md:text-[22px]', 'text-[14px] md:text-[15px]')}
          </motion.div>

          <motion.div className="img-zoom" whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
            <OptimizedImage
              src="/founder-photo.jpg"
              alt="Founder with bride"
              className="w-full h-[480px] md:h-[620px] object-cover"
            />
            <div className="text-right text-[#6b6760] text-[10px] italic tracking-wider mt-2">
              Behind the Scenes Photo
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MeetFounder;
