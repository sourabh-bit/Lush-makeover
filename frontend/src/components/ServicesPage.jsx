import React from 'react';
import { servicesBanner, servicesList } from '../mock';
import { ArrowUpRight } from 'lucide-react';

const ServicesPage = () => {
  return (
    <main className="w-full bg-[#f7f4ef]">
      {/* ---------------- BANNER ---------------- */}
      <section className="relative w-full h-[520px] md:h-[620px] overflow-hidden">
        <img
          src={servicesBanner.image}
          alt="Makeup artistry tools"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* warm cream overlay so text is legible and palette matches site */}
        <div className="absolute inset-0 bg-[#f7f4ef]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ef]/40 via-transparent to-[#f7f4ef]/80" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="font-display text-[#6b6760] text-[11px] md:text-[12px] tracking-[0.5em] mb-5">
            {servicesBanner.eyebrow}
          </div>
          <h1 className="font-display text-[#2a2a2a] text-[44px] md:text-[68px] tracking-[0.22em] leading-none">
            {servicesBanner.title.toUpperCase()}
          </h1>
          <div className="font-script italic text-[#3a3a3a] text-[24px] md:text-[32px] mt-2">
            {servicesBanner.subtitle}
          </div>

          {/* divider with dot */}
          <div className="flex items-center gap-3 mt-10 mb-7 opacity-80">
            <span className="block w-14 h-px bg-[#b8a17a]" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
            <span className="block w-14 h-px bg-[#b8a17a]" />
          </div>

          <p className="font-script italic text-[#3a3a3a] text-[17px] md:text-[20px] leading-relaxed max-w-[640px]">
            &ldquo;{servicesBanner.quote}&rdquo;
          </p>
        </div>
      </section>

      {/* ---------------- INTRO ---------------- */}
      <section className="max-w-[920px] mx-auto px-6 md:px-8 pt-20 md:pt-24 pb-8 text-center">
        <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] mb-4">
          THE OFFERINGS
        </div>
        <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.18em]">
          A QUIET LUXURY
        </h2>
        <div className="font-script italic text-[#3a3a3a] text-[26px] md:text-[32px] -mt-1">
          for every moment
        </div>
        <p className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.9] max-w-[680px] mx-auto">
          Each Lush Makeovers appointment is hand-crafted around you — your
          features, your colours, your venue and your story. Choose from our
          three signature experiences below, or write to us for a fully
          bespoke beauty package.
        </p>
      </section>

      {/* ---------------- SERVICES LIST ---------------- */}
      <section className="max-w-[1180px] mx-auto px-4 md:px-8 pb-24 md:pb-32">
        <div className="space-y-20 md:space-y-28">
          {servicesList.map((service, i) => {
            const isReversed = i % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center ${
                  isReversed ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image side */}
                <div className="md:col-span-5 img-zoom">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-[380px] md:h-[460px] object-cover"
                  />
                </div>

                {/* Text side */}
                <div className="md:col-span-7 md:px-2">
                  <div className="text-[#6b6760] text-[11px] tracking-[0.42em] uppercase font-display">
                    0{i + 1} &mdash; {service.subtitle}
                  </div>
                  <h3 className="mt-4 font-display text-[#2a2a2a] text-[34px] md:text-[44px] tracking-[0.1em] leading-tight">
                    {service.name.toUpperCase()}
                  </h3>
                  <div className="font-script italic text-[#8a7656] text-[20px] md:text-[22px] mt-1">
                    {service.subtitle}
                  </div>

                  <p className="mt-6 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.9] max-w-[540px]">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2 max-w-[540px]">
                    {service.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[#4a4742] text-[14px] md:text-[15px] font-serif-body"
                      >
                        <span className="mt-[10px] block w-3 h-px bg-[#b8a17a] flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-5">
                    <div>
                      <div className="text-[#6b6760] text-[10px] tracking-[0.32em] uppercase font-display">
                        Investment
                      </div>
                      <div className="font-script italic text-[#2a2a2a] text-[24px] md:text-[28px] mt-1">
                        {service.price}
                      </div>
                    </div>

                    <a
                      href="/#inquire"
                      className="group inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#f7f4ef] transition-colors duration-500 px-7 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
                    >
                      <span>Enquire Now</span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.25}
                        className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ---------------- BESPOKE CTA ---------------- */}
        <div className="mt-24 md:mt-32 border-t border-[#d9d2c6] pt-16 text-center max-w-[720px] mx-auto">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] mb-3">
            BESPOKE
          </div>
          <h3 className="font-display text-[#2a2a2a] text-[28px] md:text-[36px] tracking-[0.18em]">
            SOMETHING ENTIRELY
          </h3>
          <div className="font-script italic text-[#3a3a3a] text-[28px] md:text-[34px] -mt-1">
            your own
          </div>
          <p className="mt-6 text-[#4a4742] font-serif-body leading-[1.85] text-[15px] md:text-[16px]">
            Multi-day weddings, destination celebrations, mehendi to muhurtam —
            we craft full beauty experiences for the bride, her mother, her
            sisters and the bridesmaids.
          </p>
          <a
            href="/#inquire"
            className="inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#f7f4ef] transition-colors duration-500 px-8 py-3 mt-9 text-[11px] tracking-[0.32em] uppercase font-display"
          >
            <span>Begin Your Enquiry</span>
            <ArrowUpRight size={14} strokeWidth={1.25} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
