import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { heroImage, homeHero } from '../mock';

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

          <div className="absolute inset-0 flex items-center justify-start px-6 md:px-16">
            <div className="fade-in-up max-w-[480px] -mt-6 md:-mt-10">
              <h2 className="font-display text-black text-[44px] sm:text-[56px] md:text-[88px] leading-[0.88] tracking-[0.16em]">
                {homeHero.headline}
              </h2>

              <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 w-full max-w-[230px] sm:max-w-[250px]">
                <Link to="/portfolio" className="inline-flex items-center justify-center border border-black bg-white/10 px-6 py-3 text-black text-[11px] sm:text-[12px] tracking-[0.34em] uppercase font-display transition-all duration-300 hover:bg-black hover:text-[#fcfaf7]">
                  Portfolio
                </Link>
                <Link to="/academy" className="inline-flex items-center justify-center border border-black bg-white/10 px-6 py-3 text-black text-[11px] sm:text-[12px] tracking-[0.34em] uppercase font-display transition-all duration-300 hover:bg-black hover:text-[#fcfaf7]">
                  Academy
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center border border-black bg-white/10 px-6 py-3 text-black text-[11px] sm:text-[12px] tracking-[0.34em] uppercase font-display transition-all duration-300 hover:bg-black hover:text-[#fcfaf7]">
                  Contact
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
