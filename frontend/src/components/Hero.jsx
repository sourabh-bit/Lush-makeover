import React from 'react';
import { heroImage } from '../mock';

const Hero = () => {
  return (
    <section id="home" className="w-full bg-[#f7f4ef] pt-2">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        <div className="relative w-full h-[480px] md:h-[640px] lg:h-[720px] overflow-hidden">
          <img
            src={heroImage}
            alt="Bride with veil"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* subtle overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#e8dfd1]/60 via-transparent to-transparent" />

          <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-16 max-w-md">
            <div className="fade-in-up">
              <h2 className="font-display text-[#3a3a3a] text-[42px] md:text-[64px] leading-none tracking-[0.18em]">
                BRIDAL
              </h2>
              <div className="font-script italic text-[#3a3a3a] text-[44px] md:text-[68px] -mt-2 md:-mt-3">
                Beauty
              </div>
              <p className="mt-4 text-[#3a3a3a] text-[12px] md:text-[13px] tracking-[0.12em] leading-relaxed max-w-[320px]">
                Refined bridal beauty for the modern bride who values<br />
                an elevated, personalised experience.
              </p>

              <div className="mt-7 flex flex-col gap-3 max-w-[210px]">
                <button className="btn-outline-thin">View My Portfolio</button>
                <button className="btn-outline-thin">Learn More</button>
                <button className="btn-outline-thin">Inquire</button>
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
