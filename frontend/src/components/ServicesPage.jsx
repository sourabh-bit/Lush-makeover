import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import {
  pageTransition as pageVariants,
  heroStagger,
  staggerContainer,
  staggerItem,
  blurItem,
  curtainLeft,
  curtainRight,
  curtainImage,
  lineGrow,
  viewportOnce,
  EASE,
} from './motion';
import { servicesBanner, servicesList } from '../mock';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

const ServicesPage = () => {
  const bgImage = encodeURI('/ChatGPT Image Jul 8, 2026, 02_36_18 AM.png');

  return (
    <motion.main
      className="relative w-full bg-[#fcfaf7] overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'center top',
        backgroundSize: '100% auto',
      }}
      initial="hidden" animate="visible" variants={pageVariants}>
      <div className="absolute inset-0 bg-[#fcfaf7]/80 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">
        <section className="relative w-full min-h-[520px] md:min-h-[640px] overflow-hidden border-b border-[#ece6da]">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <OptimizedImage
              src={servicesBanner.image}
              alt="Makeup artistry tools"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-white/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f4ef]/40 via-transparent to-[#f8f4ef]/85" />

          <motion.div
            className="relative z-10 max-w-[920px] mx-auto h-full px-6 md:px-8 py-20 md:py-24 flex flex-col items-center justify-center text-center"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem} className="font-display text-[#7b7167] text-[11px] md:text-[12px] tracking-[0.5em] uppercase mb-5">
              {servicesBanner.eyebrow}
            </motion.div>
            <motion.h1 variants={blurItem} className="font-display text-[#2a2a2a] text-[44px] sm:text-[54px] md:text-[72px] tracking-[0.2em] leading-none">
              {servicesBanner.title.toUpperCase()}
            </motion.h1>
            <motion.div variants={staggerItem} className="font-script italic text-[#3a3a3a] text-[24px] sm:text-[30px] md:text-[36px] mt-3 leading-none">
              {servicesBanner.subtitle}
            </motion.div>

            <motion.div variants={lineGrow} className="flex items-center gap-3 mt-10 mb-7 opacity-80">
              <span className="block w-14 h-px bg-[#d0b08c]" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#d0b08c]" />
              <span className="block w-14 h-px bg-[#d0b08c]" />
            </motion.div>

            <motion.p variants={staggerItem} className="font-script italic text-[#3a3a3a] text-[17px] sm:text-[18px] md:text-[20px] leading-relaxed max-w-[720px]">
              &ldquo;{servicesBanner.quote}&rdquo;
            </motion.p>
          </motion.div>
        </section>

        <motion.section
          className="max-w-[980px] mx-auto px-6 md:px-8 pt-20 md:pt-24 pb-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem} className="font-display text-[#7b7167] text-[11px] tracking-[0.45em] mb-4 uppercase">
            Signature Services
          </motion.div>
          <motion.h2 variants={blurItem} className="font-display text-[#2a2a2a] text-[34px] sm:text-[42px] md:text-[54px] tracking-[0.14em] leading-[0.95]">
            BESPOKE BRIDAL
          </motion.h2>
          <motion.div variants={staggerItem} className="font-script italic text-[#3a3a3a] text-[28px] sm:text-[32px] md:text-[40px] leading-none mt-2">
            beauty with structure
          </motion.div>
          <motion.p variants={staggerItem} className="mt-8 text-[#4a4742] text-[15px] sm:text-[16px] md:text-[17px] font-serif-body leading-[1.9] max-w-[760px] mx-auto">
            Every service below is designed around the bride, the event and the schedule.
            We keep the look refined, the process calm and the finish photograph-ready.
          </motion.p>
        </motion.section>

        <section className="max-w-[1180px] mx-auto px-4 md:px-8 pb-24 md:pb-32">
          <div className="space-y-14 md:space-y-16">
            {servicesList.map((service, i) => {
              const isReversed = i % 2 === 1;
              const isFeature = i === 0;
              const number = String(i + 1).padStart(2, '0');

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start py-4 md:py-8 ${
                    isReversed ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <motion.div
                    className="md:col-span-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-[6px] border border-[#ece6da] shadow-[0_18px_40px_-30px_rgba(90,63,42,0.28)]"
                      variants={isReversed ? curtainRight : curtainLeft}
                    >
                      <motion.div variants={curtainImage}>
                        <OptimizedImage
                          src={service.image}
                          alt={service.name}
                          aspectRatio="4:5"
                          className="w-full h-[320px] sm:h-[380px] md:h-[460px] object-cover object-top"
                        />
                      </motion.div>
                      {isFeature ? (
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: -8 },
                            visible: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.5, ease: EASE } },
                          }}
                          className="absolute left-4 top-4 bg-white/90 backdrop-blur px-3 py-1 border border-[#e8dccc] font-display text-[10px] tracking-[0.28em] uppercase text-[#6e6258]"
                        >
                          Founder Service
                        </motion.div>
                      ) : null}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="md:col-span-7 md:px-2"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                  >
                    <motion.div variants={staggerItem} className="mb-4 font-display text-[#8a7b6f] text-[18px] sm:text-[22px] md:text-[28px] tracking-[0.42em] uppercase leading-none">
                      {number}
                    </motion.div>

                    <motion.h3 variants={blurItem} className="font-display text-[#2a2a2a] text-[32px] sm:text-[38px] md:text-[46px] tracking-[0.06em] leading-[1.08] max-w-[640px]">
                      {service.name}
                    </motion.h3>

                    <motion.div variants={staggerItem} className="mt-4 font-script italic text-[#8b6d58] text-[16px] sm:text-[18px]">
                      {service.subtitle}
                    </motion.div>

                    <motion.p variants={staggerItem} className="mt-6 text-[#4a4742] text-[15px] sm:text-[16px] md:text-[17px] font-serif-body leading-[1.95] max-w-[640px]">
                      {service.description}
                    </motion.p>

                    <motion.ul variants={staggerContainer} className="mt-7 space-y-3.5 max-w-[640px]">
                      {service.bullets.map((b, idx) => (
                        <motion.li
                          key={idx}
                          variants={staggerItem}
                          className="flex items-start gap-3 text-[#4a4742] text-[14px] md:text-[15px] font-serif-body leading-[1.7]"
                        >
                          <span className="mt-[10px] block w-3.5 h-px bg-[#d0b08c] flex-shrink-0" />
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    <motion.div variants={staggerItem} className="mt-9 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 max-w-[640px] border-t border-[#ece6da] pt-7">
                      <div>
                        <div className="font-display text-[#7c7066] text-[10px] tracking-[0.32em] uppercase">
                          {service.priceLabel}
                        </div>
                        <div className="mt-2 font-script italic text-[#2a2a2a] text-[24px] sm:text-[28px] md:text-[32px] leading-none">
                          {service.price}
                        </div>
                        {service.note ? (
                          <div className="mt-2 text-[#6f6760] text-[13px] md:text-[14px] font-serif-body leading-relaxed">
                            {service.note}
                          </div>
                        ) : null}
                      </div>

                      <MotionLink
                        to={`/inquire?service=${encodeURIComponent(service.name + (service.subtitle ? ` (${service.subtitle})` : ''))}`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ color: '#ffffff' }}
                        className="group inline-flex items-center justify-center gap-2 border border-[#2f2d2a] bg-[#2f2d2a] whitespace-nowrap transition-colors duration-500 px-6 py-3 text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-display leading-none hover:bg-[#2f2d2a] hover:border-[#2f2d2a]"
                      >
                        <span className="whitespace-nowrap leading-none" style={{ color: '#ffffff' }}>Enquire Now</span>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.25}
                          style={{ color: '#ffffff' }}
                          className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </MotionLink>
                    </motion.div>
                  </motion.div>
                </article>
              );
            })}
          </div>

          <motion.div
            className="mt-24 md:mt-32 border-t border-[#d9d2c6] pt-16 text-center max-w-[720px] mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={staggerItem} className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] mb-3 uppercase">
              Bespoke
            </motion.div>
            <motion.h3 variants={blurItem} className="font-display text-[#2a2a2a] text-[34px] sm:text-[42px] md:text-[54px] tracking-[0.14em] leading-[0.95]">
              SOMETHING ENTIRELY
            </motion.h3>
            <motion.div variants={staggerItem} className="font-script italic text-[#3a3a3a] text-[30px] sm:text-[36px] md:text-[46px] leading-none mt-2">
              your own
            </motion.div>
            <motion.p variants={staggerItem} className="mt-6 text-[#4a4742] font-serif-body leading-[1.85] text-[15px] md:text-[16px]">
              Multi-day weddings, destination celebrations, mehendi to muhurtam -
              we craft full beauty experiences for the bride, her mother, her
              sisters and the bridesmaids.
            </motion.p>
            <motion.div variants={staggerItem}>
              <motion.a
                href="/inquire"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#f7f4ef] transition-colors duration-500 px-8 py-3 mt-9 text-[11px] tracking-[0.32em] uppercase font-display"
              >
                <span>Begin Your Enquiry</span>
                <ArrowUpRight size={14} strokeWidth={1.25} />
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </motion.main>
  );
};

export default ServicesPage;
