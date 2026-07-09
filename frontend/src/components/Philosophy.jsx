import React from 'react';
import OptimizedImage from './OptimizedImage';
import { philosophyImage, homeHero } from '../mock';

const Philosophy = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="img-zoom h-[420px] md:h-[640px]">
          <OptimizedImage
            src={philosophyImage}
            alt="Bride in elegant gown"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white flex items-center justify-center px-8 py-16 md:py-0">
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
        </div>
      </div>
    </section>
  );
};

export default Philosophy;

