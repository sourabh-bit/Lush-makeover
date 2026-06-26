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
    <main className="w-full bg-white">
      {/* ---------------- HERO PORTRAIT ---------------- */}
      <section className="w-full border-b border-[#ece6da]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-20 md:pb-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Portrait column */}
          <div className="md:col-span-6 relative">
            <div className="relative overflow-hidden">
              <OptimizedImage
                src="/founder-photo.jpg"
                alt={aboutFounder.fullName}
                className="w-full h-[520px] md:h-[660px] object-cover"
              />
              {/* gold corner frame */}
              <span className="absolute top-3 left-3 w-10 h-10 border-t border-l border-[#b8a17a]/70" />
              <span className="absolute top-3 right-3 w-10 h-10 border-t border-r border-[#b8a17a]/70" />
              <span className="absolute bottom-3 left-3 w-10 h-10 border-b border-l border-[#b8a17a]/70" />
              <span className="absolute bottom-3 right-3 w-10 h-10 border-b border-r border-[#b8a17a]/70" />
            </div>
            {/* signature/caption ribbon */}
            <div className="mt-5 flex items-center gap-3 justify-center">
              <span className="block w-10 h-px bg-[#b8a17a]" />
              <span className="font-script italic text-[#3a3a3a] text-[20px]">
                {aboutFounder.fullName}
              </span>
              <span className="block w-10 h-px bg-[#b8a17a]" />
            </div>
            <div className="text-center font-display text-[#6b6760] text-[10px] tracking-[0.4em] uppercase mt-2">
              {aboutFounder.role}
            </div>
          </div>

          {/* Text column */}
          <div className="md:col-span-6 md:pl-4 relative">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] mb-4">
              MEET THE FOUNDER
            </div>
            <h1 className="font-display text-[#2a2a2a] text-[44px] md:text-[68px] tracking-[0.04em] leading-[1.05]">
              <span className="font-script italic font-medium text-[#2a2a2a] text-[60px] md:text-[88px]">
                Hello,
              </span>
              <br />
              {aboutFounder.greeting.toUpperCase()}
            </h1>

            <div className="flex items-center gap-3 mt-7 opacity-80">
              <span className="block w-12 h-px bg-[#b8a17a]" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
              <span className="block w-12 h-px bg-[#b8a17a]" />
            </div>

            <p className="mt-7 text-[#4a4742] text-[16px] md:text-[18px] font-serif-body leading-[1.9] max-w-[540px]">
              {aboutFounder.intro}
            </p>

            {/* mini stat strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-[540px]">
              {[
                { v: '10+', l: 'Years' },
                { v: '1000+', l: 'Brides' },
                { v: '200+', l: 'Artists Trained' },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`text-center pr-4 ${i !== 2 ? 'border-r border-[#ece6da]' : ''}`}
                >
                  <div className="font-script italic text-[#2a2a2a] text-[28px] md:text-[34px] leading-none">
                    {s.v}
                  </div>
                  <div className="font-display text-[#6b6760] text-[10px] tracking-[0.28em] mt-1.5 uppercase">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/inquire"
              className="inline-flex items-center gap-3 mt-10 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-7 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
            >
              <span>Begin Your Story</span>
              <ArrowUpRight size={13} strokeWidth={1.25} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- STORY CHAPTERS ---------------- */}
      <section className="max-w-[920px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center mb-14">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            HER STORY
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[44px] tracking-[0.14em]">
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
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
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

        <div className="relative z-10 max-w-[820px] mx-auto px-6 md:px-8 py-24 md:py-32 text-center">
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
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            MILESTONES
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[28px] md:text-[38px] tracking-[0.18em]">
            THE JOURNEY
          </h2>
          <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[26px] -mt-1">
            year by year
          </div>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block relative mt-16">
          <div className="absolute left-0 right-0 top-[34px] h-px bg-[#e3dcd1]" />
          <div className="grid grid-cols-5 gap-4 relative">
            {aboutMilestones.map((m, i) => (
              <div key={i} className="text-center">
                <div className="font-script italic text-[#2a2a2a] text-[28px] md:text-[34px] leading-none mb-3">
                  {m.year}
                </div>
                <div className="mx-auto w-3 h-3 rounded-full bg-white border border-[#b8a17a] relative z-10 ring-4 ring-white" />
                <div className="mt-6 font-display text-[#6b6760] text-[11px] tracking-[0.24em] uppercase max-w-[180px] mx-auto leading-relaxed">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden mt-10 space-y-6 relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-[#e3dcd1]" />
          {aboutMilestones.map((m, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[18px] top-1.5 w-3 h-3 rounded-full bg-white border border-[#b8a17a]" />
              <div className="font-script italic text-[#2a2a2a] text-[24px] leading-none">
                {m.year}
              </div>
              <div className="font-display text-[#6b6760] text-[11px] tracking-[0.24em] uppercase mt-1.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CREDENTIALS ---------------- */}
      <section className="w-full bg-[#fafaf6] border-y border-[#ece6da]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
              EXPERTISE
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[28px] md:text-[38px] tracking-[0.18em]">
              CREDENTIALS &amp;
            </h2>
            <div className="font-script italic text-[#3a3a3a] text-[26px] md:text-[32px] -mt-1">
              the work behind them
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {aboutCredentials.map((c, i) => {
              const Icon = iconFor(c.icon);
              return (
                <div
                  key={i}
                  className="bg-white border border-[#ece6da] p-7 md:p-8 flex flex-col items-start hover:shadow-[0_20px_36px_-22px_rgba(120,90,40,0.18)] transition-shadow duration-500"
                >
                  <span className="w-12 h-12 border border-[#d7cdb8] rounded-full flex items-center justify-center text-[#b8a17a]">
                    <Icon size={20} strokeWidth={1.2} />
                  </span>
                  <h4 className="mt-5 font-display text-[#2a2a2a] text-[15px] tracking-[0.16em] leading-snug">
                    {c.title.toUpperCase()}
                  </h4>
                  <div className="font-script italic text-[#8a7656] text-[15px] mt-1.5 leading-snug">
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
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            THE TEAM
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {aboutTeam.map((m, i) => (
            <div key={i} className="text-center group">
              <div className="img-zoom aspect-[3/4] mb-4">
                <OptimizedImage
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                />
              </div>
              <div className="font-display text-[#2a2a2a] text-[13px] md:text-[14px] tracking-[0.22em] uppercase">
                {m.name}
              </div>
              <div className="font-script italic text-[#8a7656] text-[15px] md:text-[17px] mt-1">
                {m.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="w-full bg-[#fafaf6] border-t border-[#ece6da]">
        <div className="max-w-[720px] mx-auto px-6 md:px-8 py-20 md:py-24 text-center">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            LET&apos;S BEGIN
          </div>
          <h3 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.14em]">
            COME IN FOR
          </h3>
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





