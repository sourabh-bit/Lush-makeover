import React from 'react';
import { curatedImage, curatedPoints } from '../mock';

const Curated = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="md:pr-4">
            <div className="text-center">
              <div className="font-script italic text-[#3a3a3a] text-[26px] md:text-[32px] leading-snug tracking-wide">
                thoughtfully<br />
                <span className="text-[30px] md:text-[38px]">curated beauty</span>
              </div>
            </div>
            <p className="mt-8 text-center text-[#4a4742] text-[15px] md:text-[16px] font-serif-body">
              Weddings are my sole passion and specialty.
            </p>
            <p className="mt-3 text-center text-[#6b6760] italic font-script text-[18px]">
              &ldquo;What&apos;s it like to work with Lush Makeovers?&rdquo;
            </p>

            <ul className="mt-7 space-y-3 text-[#4a4742] text-[14px] md:text-[15px] font-serif-body leading-[1.8] list-disc pl-5">
              {curatedPoints.map((p, i) => (
                <li key={i}>
                  <span className="italic">{p.strong}</span>{p.rest}
                </li>
              ))}
            </ul>

            <p className="mt-7 text-[#4a4742] text-[14px] md:text-[15px] leading-[1.85] font-serif-body">
              As a bridal hair and makeup studio, we&apos;re just as invested in your wedding
              day as you are. Your beauty experience is our top priority, and remains at
              the heart of everything we do.
            </p>
          </div>

          <div className="img-zoom">
            <img
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
