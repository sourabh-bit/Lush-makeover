import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { founderAccordions } from '../mock';
import { ChevronDown } from 'lucide-react';

const MeetFounder = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="md:pr-6">
            <h3 className="font-display text-[#3a3a3a] text-[34px] md:text-[44px] tracking-[0.12em]">
              Meet <span className="font-script italic tracking-normal">Our Founder</span>
            </h3>
            <p className="mt-5 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body italic">
              Thank you for being here. It&apos;s so wonderful to meet you.
            </p>

            <div className="mt-10 border-t border-[#d9d2c6]">
              {founderAccordions.map((item, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={item.title} className="border-b border-[#d9d2c6]">
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between py-5 text-left group"
                    >
                      <span className="font-script italic text-[#3a3a3a] text-[20px] md:text-[22px]">
                        {item.title}
                      </span>
                      <ChevronDown
                        size={18}
                        strokeWidth={1.25}
                        className={`text-[#6b6760] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
                    >
                      <p className="text-[#4a4742] text-[14px] md:text-[15px] leading-[1.85] font-serif-body pr-2">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="img-zoom">
            <OptimizedImage
              src="/founder-photo.jpg"
              alt="Founder with bride"
              className="w-full h-[480px] md:h-[620px] object-cover"
            />
            <div className="text-right text-[#6b6760] text-[10px] italic tracking-wider mt-2">
              Behind the Scenes Photo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetFounder;

