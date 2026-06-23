import React from 'react';
import { philosophyImage } from '../mock';

const Philosophy = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="img-zoom h-[420px] md:h-[640px]">
          <img
            src={philosophyImage}
            alt="Bride in elegant gown"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#f7f4ef] flex items-center justify-center px-8 py-16 md:py-0">
          <div className="max-w-[420px]">
            <h3 className="font-display text-[#3a3a3a] text-[34px] md:text-[44px] tracking-[0.22em]">
              MY
            </h3>
            <div className="font-script italic text-[#3a3a3a] text-[40px] md:text-[52px] -mt-1">
              philosophy
            </div>
            <div className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] leading-[1.9] font-serif-body">
              <p>
                Hair and makeup is so unique to each person&apos;s preferences and tastes.
                My goal is to enhance your natural features so you can feel like the very
                best version of yourself on your wedding day. When I hand you the mirror
                you want, you&apos;ll say,&nbsp;
                <span className="font-script italic">“Oh, there she is!”</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
