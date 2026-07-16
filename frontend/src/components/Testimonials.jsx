import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { testimonials, testimonialBgImage } from '../mock';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sectionReveal } from './motion';

const Testimonials = () => {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((current) => (current + 1) % testimonials.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIdx((current) => (current + 1) % testimonials.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const t = testimonials[idx];

  return (
    <motion.section
      className="w-full relative pb-14 md:pb-20 pt-8 md:pt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
    >
      <div className="relative overflow-hidden border-y border-[#ece6da] bg-[#fafaf6]">
        <OptimizedImage
          src={testimonialBgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#fafaf6]/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90" />

        <motion.div
          className="relative flex items-center justify-center px-4 md:px-10 py-16 md:py-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-[840px] w-full text-center bg-white border border-[#ece6da] shadow-[0_30px_70px_-45px_rgba(58,58,58,0.5)] px-6 md:px-12 py-10 md:py-14">
            <div className="font-display text-[#8b7f72] text-[11px] md:text-[12px] tracking-[0.45em] uppercase mb-3">
              Bride Stories
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[28px] md:text-[40px] tracking-[0.14em] uppercase">
              Kind Words
            </h2>
            <div className="font-script italic text-[#8a7656] text-[18px] md:text-[24px] mt-1">
              from the women we styled
            </div>
            <div className="flex items-center justify-center gap-3 mt-6 opacity-80">
              <span className="block w-12 h-px bg-[#b8a17a]" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
              <span className="block w-12 h-px bg-[#b8a17a]" />
            </div>
            <div className="mt-6 flex min-h-[230px] flex-col items-center justify-center sm:min-h-[190px] md:min-h-[210px]">
              <motion.div key={t.quote} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <p className="font-script italic text-[#3a3a3a] text-[20px] md:text-[26px] leading-[1.7] max-w-[680px] mx-auto">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-6 text-[#6b6760] text-[12px] tracking-[0.28em] uppercase">
                  &mdash; {t.author}
                </p>
              </motion.div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-[#d7cdb8] bg-white text-[#3a3a3a] hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center justify-center"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} strokeWidth={1.4} />
              </button>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-6 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
              >
                <span>View Portfolio</span>
              </Link>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-[#d7cdb8] bg-white text-[#3a3a3a] hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center justify-center"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} strokeWidth={1.4} />
              </button>
            </div>

            <div className="mt-8 flex justify-center items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={'Slide ' + (i + 1)}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-[#3a3a3a]' : 'w-1.5 bg-[#bcb3a4]'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
