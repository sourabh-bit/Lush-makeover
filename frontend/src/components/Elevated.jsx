import React from 'react';
import { elevatedImage } from '../mock';

const Elevated = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto px-4 md:px-8">
        <div className="divider-line mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="img-zoom">
            <img
              src={elevatedImage}
              alt="Elegant bride seated"
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          </div>
          <div className="text-center md:text-left md:pl-6">
            <h3 className="font-display text-[#3a3a3a] text-[32px] md:text-[42px] tracking-[0.22em] leading-tight">
              ELEVATED &amp;
            </h3>
            <div className="font-script italic text-[#3a3a3a] text-[38px] md:text-[48px] -mt-1">
              refined
            </div>

            <div className="mt-8 max-w-[440px] mx-auto md:mx-0 text-[#4a4742] text-[15px] md:text-[16px] leading-[1.9] font-serif-body">
              <p>
                Rooted in Vijayawada and serving brides across Andhra Pradesh,
                Lush Makeovers specialises in timeless, natural bridal beauty
                for brides who value an elevated, personalised experience.
              </p>
              <p className="mt-5">
                Known for our individualised approach and signature
                aesthetic — refined, elegant and effortless. Our airbrush
                precision, calming presence and standout expertise make us the
                artist of choice for brides seeking a high-end, luxury beauty
                experience.
              </p>
            </div>

            <div className="mt-10 text-[#6b6760] italic font-script text-[18px] md:text-[20px] text-center md:text-left">
              Bridal Beauty Investment begins at &#8377;25,000<br />
              <span className="text-[16px]">
                Full-Service Destination Beauty Packages begin at &#8377;1,50,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Elevated;
