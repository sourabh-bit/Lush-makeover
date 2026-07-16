import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import CountUp from './CountUp';
import {
  pageTransition as pageVariants,
  staggerContainer,
  staggerItem,
  blurItem,
  curtainLeft,
  curtainUp,
  curtainImage,
  lineGrow,
  lineGrowY,
  viewportOnce,
  viewportSoon,
  EASE,
} from './motion';
import {
  aboutFounder,
  aboutStory,
  aboutMilestones,
  aboutCredentials,
  aboutPullQuote,
  aboutTeam,
} from '../mock';
import { Award, Star, Users, Sparkles, ArrowUpRight, Quote } from 'lucide-react';

const iconFor = (k) => {
  switch (k) {
    case 'award':
      return Award;
    case 'star':
      return Star;
    case 'users':
      return Users;
    case 'sparkles':
    default:
      return Sparkles;
  }
};

const SectionHeading = ({ eyebrow, title, script, divider = true }) => (
  <motion.div
    className="text-center mb-14"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSoon}
  >
    <motion.div variants={staggerItem} className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3 uppercase">
      {eyebrow}
    </motion.div>
    <motion.h2 variants={blurItem} className="font-display text-[#2a2a2a] text-[30px] md:text-[44px] tracking-[0.18em]">
      {title}
    </motion.h2>
    <motion.div variants={staggerItem} className="font-script italic text-[#3a3a3a] text-[28px] md:text-[34px] -mt-1">
      {script}
    </motion.div>
    {divider && (
      <motion.div variants={lineGrow} className="flex items-center justify-center gap-3 mt-6 opacity-80">
        <span className="block w-12 h-px bg-[#b8a17a]" />
        <span className="block w-1 h-1 rounded-full bg-[#b8a17a]" />
        <span className="block w-12 h-px bg-[#b8a17a]" />
      </motion.div>
    )}
  </motion.div>
);

const AboutPage = () => {
  return (
    <motion.main className="w-full bg-[#fbf8f2]" initial="hidden" animate="visible" variants={pageVariants}>
      {/* ---------------- HERO / INTRO ---------------- */}
      <section className="w-full border-b border-[#ece6da] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-6 relative order-1 md:order-1">
            <motion.div
              className="relative overflow-hidden"
              variants={curtainLeft}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={curtainImage}>
                <OptimizedImage
                  src="/founder-photo.jpg"
                  alt={aboutFounder.fullName}
                  className="w-full h-[440px] sm:h-[520px] md:h-[660px] object-cover"
                />
              </motion.div>
              {[
                'top-3 left-3 border-t border-l',
                'top-3 right-3 border-t border-r',
                'bottom-3 left-3 border-b border-l',
                'bottom-3 right-3 border-b border-r',
              ].map((pos, i) => (
                <motion.span
                  key={pos}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.6, ease: EASE }}
                  className={`absolute w-9 h-9 sm:w-10 sm:h-10 border-[#b8a17a]/70 ${pos}`}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            className="md:col-span-6 md:pl-4 relative order-2 md:order-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem} className="font-display text-[#8b7f72] text-[10px] sm:text-[11px] tracking-[0.44em] uppercase mb-4">
              Full Story
            </motion.div>
            <div className="max-w-[640px]">
              <motion.div variants={staggerItem} className="font-display text-[#4b453f] text-[17px] sm:text-[19px] md:text-[21px] tracking-[0.34em] uppercase leading-none">
                {aboutFounder.fullName}
              </motion.div>
              <motion.div variants={staggerItem} className="mt-3 font-display text-[#9a8666] text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.36em] uppercase leading-relaxed">
                {aboutFounder.role}
              </motion.div>
              <motion.h1 variants={blurItem} className="mt-6 font-script italic text-[#2f2a27] text-[30px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-[0.01em] max-w-[620px]">
                {aboutFounder.greeting}
              </motion.h1>
              <motion.div variants={lineGrow} className="flex items-center gap-3 mt-6 opacity-80">
                <span className="block w-10 sm:w-12 h-px bg-[#b8a17a]" />
                <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
                <span className="block w-10 sm:w-12 h-px bg-[#b8a17a]" />
              </motion.div>
              <motion.p variants={staggerItem} className="mt-6 text-[#4a4742] text-[15px] sm:text-[16px] md:text-[17px] font-serif-body leading-[1.9] max-w-[620px]">
                {aboutFounder.intro}
              </motion.p>
              <motion.div variants={staggerContainer} className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-[620px]">
                {[
                  { v: '10+', l: 'Years' },
                  { v: '1000+', l: 'Brides' },
                  { v: '200+', l: 'Artists Trained' },
                ].map((s) => (
                  <motion.div
                    key={s.l}
                    variants={staggerItem}
                    className="rounded-[2px] bg-[#faf7f0] px-2 sm:px-4 py-4 text-center border border-[#ece2d2] min-h-[78px] flex flex-col justify-center"
                  >
                    <div className="font-script italic text-[#2a2a2a] text-[22px] sm:text-[26px] md:text-[30px] leading-none">
                      <CountUp value={s.v} />
                    </div>
                    <div className="font-display text-[#6b6760] text-[8px] sm:text-[10px] tracking-[0.22em] mt-1.5 uppercase leading-tight">
                      {s.l}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={staggerItem}>
                <motion.a
                  href="/inquire"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 mt-8 sm:mt-10 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-7 py-3 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-display"
                >
                  <span>Begin Your Story</span>
                  <ArrowUpRight size={13} strokeWidth={1.25} />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- STORY CHAPTERS ---------------- */}
      <section className="max-w-[920px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <SectionHeading eyebrow="Her Story" title="A DECADE" script="of quiet artistry" />

        <div className="space-y-12 md:space-y-16">
          {aboutStory.map((chapter, i) => (
            <motion.div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -22 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
                }}
                className="md:col-span-4"
              >
                <div className="font-display text-[#b8a17a] text-[12px] tracking-[0.42em] uppercase">
                  Chapter {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-2 font-script italic text-[#2a2a2a] text-[28px] md:text-[34px] leading-tight">
                  {chapter.title}
                </h3>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.12 } },
                }}
                className="md:col-span-8 md:border-l md:border-[#ece6da] md:pl-10"
              >
                <p className="text-[#4a4742] text-[16px] md:text-[17px] font-serif-body leading-[1.95]">
                  {chapter.body}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- PULL QUOTE / WORKING SHOT ---------------- */}
      <section className="relative w-full overflow-hidden border-y border-[#ece6da]">
        <OptimizedImage
          src={aboutFounder.workingShot}
          alt="Behind the scenes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/80" />

        <motion.div
          className="relative z-10 max-w-[820px] mx-auto px-6 md:px-8 py-24 md:py-32 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              visible: { opacity: 0.7, scale: 1, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            <Quote size={32} strokeWidth={1} className="text-[#b8a17a] mx-auto" />
          </motion.div>
          <motion.p variants={blurItem} className="mt-6 font-script italic text-[#2a2a2a] text-[24px] md:text-[34px] leading-[1.45]">
            &ldquo;{aboutPullQuote}&rdquo;
          </motion.p>
          <motion.div variants={lineGrow} className="flex items-center justify-center gap-3 mt-9">
            <span className="block w-10 h-px bg-[#b8a17a]" />
            <span className="block w-1 h-1 rounded-full bg-[#b8a17a]" />
            <span className="block w-10 h-px bg-[#b8a17a]" />
          </motion.div>
          <motion.div variants={staggerItem} className="mt-4 font-display text-[#6b6760] text-[11px] tracking-[0.45em] uppercase">
            Sri Lakshmi
          </motion.div>
          <motion.div variants={staggerItem} className="font-script italic text-[#8a7656] text-[16px] mt-0.5">
            Founder, Lush Makeovers
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------- MILESTONES TIMELINE ---------------- */}
      <section
        className="relative w-full overflow-hidden border-y border-[#ece6da]"
        style={{
          backgroundImage: "url(" + encodeURI('/year bgc.png') + ")",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#fbf6f0]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf6f0]/50 via-[#fbf6f0]/50 to-[#f3e7db]/50" />

        <div className="relative z-10 max-w-[1220px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14 md:mb-16">
            <SectionHeading eyebrow="Milestones" title="THE JOURNEY" script="year by year" divider={false} />
            <motion.div
              variants={lineGrow}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex items-center justify-center gap-3 -mt-8 opacity-80"
            >
              <span className="block w-12 h-px bg-[#d9b39f]" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#d9b39f]" />
              <span className="block w-12 h-px bg-[#d9b39f]" />
            </motion.div>
          </div>

          <div className="relative mx-auto max-w-[1040px]">
            <motion.div
              className="absolute left-[4.95rem] md:left-[5.25rem] top-3 bottom-3 w-[2px] bg-[#d8ab98] origin-top"
              variants={lineGrowY}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSoon}
            />
            <div className="space-y-4 md:space-y-5">
              {aboutMilestones.map((m, i) => {
                const icons = [Award, Star, Sparkles, Users, Sparkles, Users];
                const Icon = icons[i] || Sparkles;
                const detailMap = [
                  'The beginning of a beautiful journey.',
                  'Elevating skills with international training and certification.',
                  'Turning a dream into a reality.',
                  'A milestone of trust, love and countless memories.',
                  'Empowering the next generation of artists.',
                  'A community built on passion, dedication and artistry.',
                ];
                return (
                  <motion.div
                    key={m.year}
                    className="relative grid grid-cols-[74px_26px_1fr] md:grid-cols-[78px_44px_1fr] items-start gap-3 md:gap-4"
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportSoon}
                    transition={{ duration: 0.65, ease: EASE, delay: (i % 3) * 0.08 }}
                  >
                    <div className="pt-5 md:pt-4 text-right pr-1 md:pr-0">
                      <div className="font-script italic text-[#3d352f] text-[24px] sm:text-[28px] md:text-[32px] leading-none">
                        {m.year}
                      </div>
                    </div>

                    <div className="relative flex justify-center pt-5 md:pt-4">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.45, ease: EASE, delay: 0.25 + (i % 3) * 0.08 }}
                        className="w-4 h-4 rounded-full bg-[#fbf6f0] border border-[#d8ab98] shadow-[0_0_0_5px_rgba(251,246,240,0.82)] z-10 flex items-center justify-center"
                      >
                        <Icon size={10} strokeWidth={2} className="text-[#d8ab98]" />
                      </motion.span>
                    </div>

                    <div className="pb-2 md:pb-0">
                      <div className="rounded-[8px] bg-white/80 backdrop-blur-[1px] border border-[#efe2d5] shadow-[0_18px_34px_-28px_rgba(90,63,42,0.25)] px-4 sm:px-5 md:px-6 py-4 md:py-5">
                        <div className="font-display text-[#4d4540] text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.16em] uppercase leading-tight">
                          {m.label}
                        </div>
                        <div className="mt-2 text-[#6f6660] text-[12px] md:text-[13px] leading-[1.7] font-serif-body max-w-[620px]">
                          {detailMap[i]}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* ---------------- CREDENTIALS ---------------- */}
      <section className="w-full bg-[#fafaf6] border-y border-[#ece6da]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <SectionHeading eyebrow="Expertise" title="CREDENTIALS &" script="the work behind them" divider={false} />

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSoon}
          >
            {aboutCredentials.map((c, i) => {
              const Icon = iconFor(c.icon);
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="bg-white border border-[#ece6da] p-5 md:p-8 flex flex-col items-start"
                >
                  <span className="w-10 h-10 md:w-12 md:h-12 border border-[#d7cdb8] rounded-full flex items-center justify-center text-[#b8a17a]">
                    <Icon size={18} strokeWidth={1.2} />
                  </span>
                  <h4 className="mt-4 md:mt-5 font-display text-[#2a2a2a] text-[13px] md:text-[15px] tracking-[0.14em] leading-snug uppercase">
                    {c.title}
                  </h4>
                  <div className="font-script italic text-[#8a7656] text-[14px] md:text-[15px] mt-1.5 leading-snug">
                    {c.sub}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------------- TEAM ---------------- */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <motion.div
          className="text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem} className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3 uppercase">
            The Team
          </motion.div>
          <motion.h2 variants={blurItem} className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.18em]">
            HANDS BEHIND
          </motion.h2>
          <motion.div variants={staggerItem} className="font-script italic text-[#3a3a3a] text-[24px] md:text-[28px] -mt-1">
            the artistry
          </motion.div>
          <motion.p variants={staggerItem} className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.85] max-w-[640px] mx-auto">
            A small, deeply trained team that I trust with every bride. Each
            artist has spent at least three years inside the studio before
            stepping forward to lead a wedding morning of her own.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSoon}
        >
          {aboutTeam.map((m, i) => (
            <motion.div key={i} variants={staggerItem} className="text-center group">
              <motion.div
                className="aspect-[3/4] mb-4 overflow-hidden"
                variants={curtainUp}
              >
                <motion.div variants={curtainImage} className="w-full h-full">
                  <OptimizedImage
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </motion.div>
              </motion.div>
              <div className="font-display text-[#2a2a2a] text-[12px] md:text-[14px] tracking-[0.22em] uppercase">
                {m.name}
              </div>
              <div className="font-script italic text-[#8a7656] text-[14px] md:text-[17px] mt-1">
                {m.role}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="w-full bg-[#fafaf6] border-t border-[#ece6da]">
        <motion.div
          className="max-w-[720px] mx-auto px-6 md:px-8 py-20 md:py-24 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={staggerItem} className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3 uppercase">
            Let&apos;s Begin
          </motion.div>
          <motion.h2 variants={blurItem} className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.14em]">
            COME IN FOR
          </motion.h2>
          <motion.div variants={staggerItem} className="font-script italic text-[#3a3a3a] text-[26px] md:text-[32px] -mt-0.5">
            a quiet conversation
          </motion.div>
          <motion.p variants={staggerItem} className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.85]">
            We open the studio for one bride at a time. Reach out and we will
            schedule a private visit, walk you through the looks we have
            crafted, and answer every question over a cup of filter coffee.
          </motion.p>
          <motion.div variants={staggerItem}>
            <motion.a
              href="/contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-8 py-3 mt-9 text-[11px] tracking-[0.32em] uppercase font-display"
            >
              <span>Reach Out</span>
              <ArrowUpRight size={13} strokeWidth={1.25} />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </motion.main>
  );
};

export default AboutPage;
