import React from 'react';
import OptimizedImage from './OptimizedImage';
import { curatedImage, curatedPoints } from '../mock';

const Curated = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="md:pr-4">
            <div className="section-label text-center md:text-left mb-4 md:mb-5">Why brides trust us</div>
            <p className="body-prose max-w-[540px] mx-auto md:mx-0 text-center md:text-left mb-10 md:mb-12">
              At Lush Makeovers, the bridal morning is planned, calm, and beautifully on time.
            </p>

            <ul className="space-y-6 max-w-[560px] mx-auto md:mx-0">
              {curatedPoints.map((p, i) => (
                <li key={i} className="border-l border-[#d9d0c8] pl-5 py-1">
                  <div className="font-display text-[#2f2a27] text-[18px] md:text-[20px] tracking-[0.08em] uppercase leading-[1.2]">
                    {p.strong}
                  </div>
                  <p className="mt-2 text-[#605853] text-[14px] md:text-[15px] leading-[1.85] font-serif-body max-w-[520px]">
                    {p.rest.replace(/^ - /, '')}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-[#4a4742] text-[14px] md:text-[15px] leading-[1.85] font-serif-body max-w-[520px]">
              Every detail is designed around the bride, the timeline, and the photographs you will treasure for years.
            </p>
          </div>

          <div className="img-zoom">
            <OptimizedImage
              src={curatedImage}
              alt="Bride elegant pose"
              className="w-full h-[480px] md:h-[600px] object-cover"
            />
            <div className="text-right text-[#6b6760] text-[10px] italic tracking-wider mt-2">
              Rachel Lusk Beauty Photo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curated;

