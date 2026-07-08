import React from 'react';
import OptimizedImage from './OptimizedImage';
import { heroImage } from '../mock';

const Hero = () => {
  return (
    <section id="home" className="w-full bg-white pt-2">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        <div className="relative w-full h-[430px] sm:h-[480px] md:h-[640px] lg:h-[720px] overflow-hidden">
          <OptimizedImage
            src={heroImage}
            alt="Bride with veil"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#e8dfd1]/60 via-transparent to-transparent" />

          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 md:left-16 md:right-auto max-w-[250px] md:max-w-md">
            <div className="fade-in-up">
              <h2 className="font-display text-[#6f5a3d] text-[38px] sm:text-[42px] md:text-[70px] leading-none tracking-[0.18em]">
                BRIDAL
              </h2>
              <div className="font-script italic text-[#8a6a40] text-[38px] sm:text-[42px] md:text-[72px] -mt-2 md:-mt-3">
                Beauty
              </div>
              <p className="mt-4 text-[#3a3a3a] text-[11px] sm:text-[12px] md:text-[13px] tracking-[0.12em] leading-relaxed max-w-[250px] md:max-w-[320px]">
                Refined bridal beauty for the modern bride who values<br />
                an elevated, personalised experience.
              </p>

              <div className="mt-6 sm:mt-7 flex flex-col gap-3 max-w-[200px] sm:max-w-[210px]">
                <a href="/portfolio" className="btn-outline-thin">View My Portfolio</a>
                <a href="/about" className="btn-outline-thin">Learn More</a>
                <a href="/inquire" className="btn-outline-thin">Inquire</a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 right-5 text-[#6b6760] text-[10px] italic tracking-wider">
            Stylar Studios Photo
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
