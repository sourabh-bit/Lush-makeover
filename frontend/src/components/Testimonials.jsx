import React, { useState } from 'react';
import { testimonials, testimonialBgImage } from '../mock';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((idx - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((idx + 1) % testimonials.length);
  const t = testimonials[idx];

  return (
    <section className="w-full relative">
      <div className="relative h-[520px] md:h-[560px] overflow-hidden">
        <img
          src={testimonialBgImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#f1ece2]/85" />

        <div className="absolute inset-0 flex items-center justify-center px-10 md:px-24">
          <div className="max-w-[640px] text-center">
            <div className="font-display text-[#3a3a3a] text-[22px] md:text-[26px] tracking-[0.4em] mb-8">
              PRESS
            </div>
            <p className="font-script italic text-[#3a3a3a] text-[20px] md:text-[24px] leading-[1.6]">
              “{t.quote}”
            </p>
            <p className="mt-7 text-[#6b6760] text-[12px] tracking-[0.25em] uppercase">
              — {t.author}
            </p>

            <div className="mt-8 flex justify-center items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-[#3a3a3a]' : 'bg-[#bcb3a4]'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-[#6b6760] hover:text-[#3a3a3a] transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={28} strokeWidth={1} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-[#6b6760] hover:text-[#3a3a3a] transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={28} strokeWidth={1} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
