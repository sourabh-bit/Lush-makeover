import React from 'react';
import OptimizedImage from './OptimizedImage';
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

const AboutPage = () => {
  return (
    <main className="w-full bg-[#fbf8f2]">
      {/* ---------------- HERO / INTRO ---------------- */}
      <section className="w-full border-b border-[#ece6da] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-6 relative order-1 md:order-1">
            <div className="relative overflow-hidden">
              <OptimizedImage
                src="/founder-photo.jpg"
                alt={aboutFounder.fullName}
                className="w-full h-[440px] sm:h-[520px] md:h-[660px] object-cover"
              />
              <span className="absolute top-3 left-3 w-9 h-9 sm:w-10 sm:h-10 border-t border-l border-[#b8a17a]/70" />
              <span className="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 border-t border-r border-[#b8a17a]/70" />
              <span className="absolute bottom-3 left-3 w-9 h-9 sm:w-10 sm:h-10 border-b border-l border-[#b8a17a]/70" />
              <span className="absolute bottom-3 right-3 w-9 h-9 sm:w-10 sm:h-10 border-b border-r border-[#b8a17a]/70" />
            </div>
          </div>

          <div className="md:col-span-6 md:pl-4 relative order-2 md:order-2">
            <div className="font-display text-[#8b7f72] text-[10px] sm:text-[11px] tracking-[0.44em] uppercase mb-4">
              Full Story
            </div>
            <div className="max-w-[640px]">
              <div className="font-display text-[#4b453f] text-[17px] sm:text-[19px] md:text-[21px] tracking-[0.34em] uppercase leading-none">
                {aboutFounder.fullName}
              </div>
              <div className="mt-3 font-display text-[#9a8666] text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.36em] uppercase leading-relaxed">
                {aboutFounder.role}
              </div>
              <h1 className="mt-6 font-script italic text-[#2f2a27] text-[30px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.08] tracking-[0.01em] max-w-[620px]">
                {aboutFounder.greeting}
              </h1>
              <div className="flex items-center gap-3 mt-6 opacity-80">
                <span className="block w-10 sm:w-12 h-px bg-[#b8a17a]" />
                <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
                <span className="block w-10 sm:w-12 h-px bg-[#b8a17a]" />
              </div>
              <p className="mt-6 text-[#4a4742] text-[15px] sm:text-[16px] md:text-[17px] font-serif-body leading-[1.9] max-w-[620px]">
                {aboutFounder.intro}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-[620px]">
                {[
                  { v: '10+', l: 'Years' },
                  { v: '1000+', l: 'Brides' },
                  { v: '200+', l: 'Artists Trained' },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-[2px] bg-[#faf7f0] px-2 sm:px-4 py-4 text-center border border-[#ece2d2] min-h-[78px] flex flex-col justify-center"
                  >
                    <div className="font-script italic text-[#2a2a2a] text-[22px] sm:text-[26px] md:text-[30px] leading-none">
                      {s.v}
                    </div>
                    <div className="font-display text-[#6b6760] text-[8px] sm:text-[10px] tracking-[0.22em] mt-1.5 uppercase leading-tight">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/inquire"
                className="inline-flex items-center gap-3 mt-8 sm:mt-10 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-7 py-3 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-display"
              >
                <span>Begin Your Story</span>
                <ArrowUpRight size={13} strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STORY CHAPTERS ---------------- */}
      <section className="max-w-[920px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3 uppercase">
            Her Story
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[44px] tracking-[0.18em]">
            A DECADE
          </h2>
          <div className="font-script italic text-[#3a3a3a] text-[28px] md:text-[34px] -mt-1">
            of quiet artistry
          </div>
          <div className="flex items-center justify-center gap-3 mt-6 opacity-80">
            <span className="block w-12 h-px bg-[#b8a17a]" />
            <span className="block w-1 h-1 rounded-full bg-[#b8a17a]" />
            <span className="block w-12 h-px bg-[#b8a17a]" />
          </div>
        </div>

        <div className="space-y-12 md:space-y-16">
          {aboutStory.map((chapter, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start fade-in-up"
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <div className="md:col-span-4">
                <div className="font-display text-[#b8a17a] text-[12px] tracking-[0.42em] uppercase">
                  Chapter {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-2 font-script italic text-[#2a2a2a] text-[28px] md:text-[34px] leading-tight">
                  {chapter.title}
                </h3>
              </div>
              <div className="md:col-span-8 md:border-l md:border-[#ece6da] md:pl-10">
                <p className="text-[#4a4742] text-[16px] md:text-[17px] font-serif-body leading-[1.95]">
                  {chapter.body}
                </p>
              </div>
            </div>
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

        <div className="relative z-10 max-w-[820px] mx-auto px-6 md:px-8 py-24 md:py-32 text-center fade-in-up">
          <Quote
            size={32}
            strokeWidth={1}
            className="text-[#b8a17a] mx-auto opacity-70"
          />
          <p className="mt-6 font-script italic text-[#2a2a2a] text-[24px] md:text-[34px] leading-[1.45]">
            &ldquo;{aboutPullQuote}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 mt-9">
            <span className="block w-10 h-px bg-[#b8a17a]" />
            <span className="block w-1 h-1 rounded-full bg-[#b8a17a]" />
            <span className="block w-10 h-px bg-[#b8a17a]" />
          </div>
          <div className="mt-4 font-display text-[#6b6760] text-[11px] tracking-[0.45em] uppercase">
            Sri Lakshmi
          </div>
          <div className="font-script italic text-[#8a7656] text-[16px] mt-0.5">
            Founder, Lush Makeovers
          </div>
        </div>
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
            <div className="font-display text-[#7d7168] text-[11px] tracking-[0.45em] uppercase mb-4">
              Milestones
            </div>
            <h2 className="font-display text-[#3a332e] text-[30px] sm:text-[36px] md:text-[46px] tracking-[0.18em] leading-none">
              THE JOURNEY
            </h2>
            <div className="font-script italic text-[#8f6f5e] text-[26px] sm:text-[30px] md:text-[34px] mt-3 leading-none">
              year by year
            </div>
            <div className="flex items-center justify-center gap-3 mt-5 opacity-80">
              <span className="block w-12 h-px bg-[#d9b39f]" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#d9b39f]" />
              <span className="block w-12 h-px bg-[#d9b39f]" />
            </div>
          </div>

          <div className="relative mx-auto max-w-[1040px]">
            <div className="absolute left-[4.95rem] md:left-[5.25rem] top-3 bottom-3 w-[2px] bg-[#d8ab98]" />
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
                  <div
                    key={m.year}
                    className="relative grid grid-cols-[74px_26px_1fr] md:grid-cols-[78px_44px_1fr] items-start gap-3 md:gap-4 fade-in-up"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <div className="pt-5 md:pt-4 text-right pr-1 md:pr-0">
                      <div className="font-script italic text-[#3d352f] text-[24px] sm:text-[28px] md:text-[32px] leading-none">
                        {m.year}
                      </div>
                    </div>

                    <div className="relative flex justify-center pt-5 md:pt-4">
                      <span className="w-4 h-4 rounded-full bg-[#fbf6f0] border border-[#d8ab98] shadow-[0_0_0_5px_rgba(251,246,240,0.82)] z-10 flex items-center justify-center">
                        <Icon size={10} strokeWidth={2} className="text-[#d8ab98]" />
                      </span>
                    </div>

                    <div className="pb-2 md:pb-0">
                      <div className="rounded-[8px] bg-white/78 backdrop-blur-[1px] border border-[#efe2d5] shadow-[0_18px_34px_-28px_rgba(90,63,42,0.25)] px-4 sm:px-5 md:px-6 py-4 md:py-5">
                        <div className="font-display text-[#4d4540] text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.16em] uppercase leading-tight">
                          {m.label}
                        </div>
                        <div className="mt-2 text-[#6f6660] text-[12px] md:text-[13px] leading-[1.7] font-serif-body max-w-[620px]">
                          {detailMap[i]}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* ---------------- CREDENTIALS ---------------- */}
      <section className="w-full bg-[#fafaf6] border-y border-[#ece6da]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3 uppercase">
              Expertise
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[28px] md:text-[38px] tracking-[0.18em]">
              CREDENTIALS &amp;
            </h2>
            <div className="font-script italic text-[#3a3a3a] text-[26px] md:text-[32px] -mt-1">
              the work behind them
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {aboutCredentials.map((c, i) => {
              const Icon = iconFor(c.icon);
              return (
                <div
                  key={i}
                  className="bg-white border border-[#ece6da] p-5 md:p-8 flex flex-col items-start transition-none"
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- TEAM ---------------- */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3 uppercase">
            The Team
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.18em]">
            HANDS BEHIND
          </h2>
          <div className="font-script italic text-[#3a3a3a] text-[24px] md:text-[28px] -mt-1">
            the artistry
          </div>
          <p className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.85] max-w-[640px] mx-auto">
            A small, deeply trained team that I trust with every bride. Each
            artist has spent at least three years inside the studio before
            stepping forward to lead a wedding morning of her own.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
          {aboutTeam.map((m, i) => (
            <div key={i} className="text-center">
              <div className="aspect-[3/4] mb-4 overflow-hidden">
                <OptimizedImage
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-display text-[#2a2a2a] text-[12px] md:text-[14px] tracking-[0.22em] uppercase">
                {m.name}
              </div>
              <div className="font-script italic text-[#8a7656] text-[14px] md:text-[17px] mt-1">
                {m.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="w-full bg-[#fafaf6] border-t border-[#ece6da]">
        <div className="max-w-[720px] mx-auto px-6 md:px-8 py-20 md:py-24 text-center">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3 uppercase">
            Let&apos;s Begin
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.14em]">
            COME IN FOR
          </h2>
          <div className="font-script italic text-[#3a3a3a] text-[26px] md:text-[32px] -mt-0.5">
            a quiet conversation
          </div>
          <p className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.85]">
            We open the studio for one bride at a time. Reach out and we will
            schedule a private visit, walk you through the looks we have
            crafted, and answer every question over a cup of filter coffee.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-8 py-3 mt-9 text-[11px] tracking-[0.32em] uppercase font-display"
          >
            <span>Reach Out</span>
            <ArrowUpRight size={13} strokeWidth={1.25} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;






