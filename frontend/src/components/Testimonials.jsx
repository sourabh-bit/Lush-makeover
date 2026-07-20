import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../mock';
import { Link } from 'react-router-dom';
import { sectionReveal, staggerContainer, staggerItem } from './motion';

const Testimonials = () => {
  return (
    <motion.section
      className="w-full pb-14 md:pb-20 pt-8 md:pt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
    >
      <div className="relative overflow-hidden border-y border-[#ece6da] bg-[#fafaf6] py-14 md:py-20">
        <img
          src="/floral-bg.png"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative max-w-[1180px] mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="font-display text-[#8b7f72] text-[11px] md:text-[12px] tracking-[0.45em] uppercase mb-3">
              Bride Stories
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[26px] md:text-[36px] tracking-[0.14em] uppercase">
              Kind Words
            </h2>
            <div className="font-script italic text-[#8a7656] text-[17px] md:text-[21px] mt-1">
              from the women we styled
            </div>
            <div className="flex items-center justify-center gap-3 mt-5 opacity-80">
              <span className="block w-12 h-px bg-[#b8a17a]" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
              <span className="block w-12 h-px bg-[#b8a17a]" />
            </div>
          </div>

          <motion.div
            className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((t) => (
              <motion.figure
                key={t.author}
                variants={staggerItem}
                className="flex flex-col bg-white border border-[#ece6da] px-7 py-8 shadow-[0_24px_50px_-40px_rgba(58,58,58,0.45)]"
              >
                <div className="font-script italic text-[#b8a17a] text-[44px] leading-none select-none" aria-hidden="true">
                  &ldquo;
                </div>
                <blockquote className="flex-1 -mt-3 text-[#4a4742] text-[14px] md:text-[14.5px] leading-[1.85] font-serif-body">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-[#ece6da]">
                  <span className="text-[#2a2a2a] text-[11px] tracking-[0.24em] uppercase font-display">
                    {t.author}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <div className="mt-10 md:mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-7 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
            >
              <span>View Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
