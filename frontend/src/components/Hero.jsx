import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { heroImage, homeHero } from '../mock';
import { sectionReveal, staggerContainer, staggerItem, EASE } from './motion';

const Hero = () => {
  return (
    <motion.section
      id="home"
      className="w-full bg-white pt-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={sectionReveal}
    >
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        <div className="relative w-full h-[430px] sm:h-[480px] md:h-[640px] lg:h-[720px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: EASE }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={heroImage}
              alt="Bride with veil"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />

          <motion.div
            className="absolute inset-x-0 top-6 sm:top-8 md:top-10 flex justify-center px-6"
            initial={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.3, duration: 1, ease: EASE }}
          >
            <div className="text-center">
              <h2 className="font-display text-black text-[38px] sm:text-[52px] md:text-[84px] leading-[0.9] tracking-[0.22em]">
                {homeHero.headline}
              </h2>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-x-4 bottom-4 sm:inset-x-auto sm:left-6 sm:bottom-6 md:left-10 md:bottom-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-row gap-2 sm:flex-col sm:gap-2.5 sm:w-[230px]">
              {[
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/academy', label: 'Academy' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <motion.div key={item.label} className="flex-1 sm:flex-none" variants={staggerItem} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={item.to}
                    className="flex w-full items-center justify-between gap-2 bg-white/95 backdrop-blur px-3.5 py-3 sm:px-5 sm:py-3.5 text-[#1f1f1f] text-[9px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.34em] uppercase font-display shadow-[0_14px_34px_-18px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:bg-[#1f1f1f] hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={13} strokeWidth={1.5} className="shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
