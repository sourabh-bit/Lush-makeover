import React, { useEffect, useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { testimonials, testimonialBgImage } from '../mock';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <section className="w-full relative pb-14 md:pb-20 pt-8 md:pt-12">
      <div className="relative min-h-[640px] md:min-h-[700px] overflow-hidden border-y border-[#ece6da] bg-[#fafaf6]">
        <OptimizedImage
          src={testimonialBgImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#fafaf6]/94" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90" />

        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-10 py-14">
          <div className="max-w-[840px] w-full text-center bg-white/82 backdrop-blur-sm border border-[#ece6da] shadow-[0_18px_50px_-35px_rgba(58,58,58,0.45)] px-6 md:px-12 py-10 md:py-14">
            <div className="font-display text-[#3a3a3a] text-[13px] md:text-[15px] tracking-[0.45em] uppercase mb-3">
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
            <p className="mt-8 font-script italic text-[#3a3a3a] text-[22px] md:text-[26px] leading-[1.75] max-w-[680px] mx-auto">
              "{t.quote}"
            </p>
            <p className="mt-8 text-[#6b6760] text-[12px] tracking-[0.28em] uppercase">
              - {t.author}
            </p>

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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
