import React, { useState, useMemo } from 'react';
import OptimizedImage from './OptimizedImage';
import {
  portfolioBanner,
  portfolioCategories,
  portfolioWorks,
} from '../mock';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const works = useMemo(() => {
    if (active === 'all') return portfolioWorks;
    return portfolioWorks.filter((w) => w.category === active);
  }, [active]);

  return (
    <main className="w-full bg-white">
      {/* ---------------- COMPACT BANNER ---------------- */}
      <section className="w-full bg-white border-b border-[#ece6da]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 pt-14 md:pt-16 pb-10 md:pb-12 text-center">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.5em] mb-3">
            {portfolioBanner.eyebrow}
          </div>
          <h1 className="font-display text-[#2a2a2a] text-[36px] md:text-[52px] tracking-[0.18em] leading-none">
            {portfolioBanner.title.toUpperCase()}
          </h1>
          <div className="font-script italic text-[#3a3a3a] text-[20px] md:text-[24px] mt-1">
            {portfolioBanner.subtitle}
          </div>

          {/* divider with dot */}
          <div className="flex items-center justify-center gap-3 mt-7 opacity-80">
            <span className="block w-12 h-px bg-[#b8a17a]" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
            <span className="block w-12 h-px bg-[#b8a17a]" />
          </div>

          {/* Filters ? placed right below title for compact layout */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {portfolioCategories.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`px-4 md:px-5 py-2 text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-display border transition-colors duration-400 ${
                    isActive
                      ? 'bg-[#2a2a2a] text-white border-[#2a2a2a]'
                      : 'bg-transparent text-[#3a3a3a] border-[#d7cdb8] hover:border-[#2a2a2a]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- UNIFORM GRID ---------------- */}
      <section className="max-w-[1180px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {works.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setLightbox(w)}
              className="group relative overflow-hidden bg-[#f3ede2] aspect-[3/4] text-left focus:outline-none"
            >
              <OptimizedImage
                src={w.image}
                alt={w.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
              />

              {/* subtle bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* hover info */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="font-display text-white/85 text-[9px] md:text-[10px] tracking-[0.32em] uppercase">
                  {w.catLabel}
                </div>
                <div className="font-script italic text-white text-[20px] md:text-[24px] leading-tight mt-0.5">
                  {w.title}
                </div>
                <div className="font-display text-white/75 text-[9px] md:text-[10px] tracking-[0.26em] uppercase mt-0.5">
                  {w.location}
                </div>
              </div>

              {/* index badge */}
              <div className="absolute top-3 left-3 font-display text-[10px] tracking-[0.3em] text-white/0 group-hover:text-white/80 transition-opacity duration-500">
                {String(i + 1).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>

        {/* empty state */}
        {works.length === 0 && (
          <div className="text-center py-20 text-[#6b6760] font-serif-body italic">
            No works in this category yet ? please check back soon.
          </div>
        )}
      </section>

      {/* ---------------- MINIMAL CTA ---------------- */}
      <section className="w-full bg-white border-t border-[#ece6da]">
        <div className="max-w-[720px] mx-auto px-6 md:px-8 py-16 md:py-20 text-center">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            BEGIN YOUR
          </div>
          <h3 className="font-display text-[#2a2a2a] text-[26px] md:text-[34px] tracking-[0.16em]">
            BRIDAL STORY
          </h3>
          <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[26px] -mt-0.5">
            with us
          </div>
          <a
            href="/inquire"
            className="inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-7 py-3 mt-8 text-[11px] tracking-[0.3em] uppercase font-display"
          >
            <span>Enquire Now</span>
            <ArrowUpRight size={13} strokeWidth={1.25} />
          </a>
        </div>
      </section>

      {/* ---------------- LIGHTBOX ---------------- */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-[#1c1815]/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.2} />
          </button>

          <div
            className="relative max-w-[1000px] w-full max-h-[88vh] flex flex-col md:flex-row gap-0 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:flex-1 h-[55vh] md:h-auto overflow-hidden">
              <OptimizedImage
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-[320px] p-6 md:p-8 flex flex-col justify-center">
              <div className="font-display text-[#6b6760] text-[10px] tracking-[0.38em] uppercase">
                {lightbox.catLabel}
              </div>
              <h3 className="mt-2 font-display text-[#2a2a2a] text-[28px] md:text-[36px] tracking-[0.1em] leading-tight">
                {lightbox.title.toUpperCase()}
              </h3>
              <div className="font-script italic text-[#8a7656] text-[18px] md:text-[20px] mt-1">
                {lightbox.location}
              </div>
              <div className="flex items-center gap-2 my-5 opacity-80">
                <span className="block w-8 h-px bg-[#b8a17a]" />
                <span className="block w-1 h-1 rounded-full bg-[#b8a17a]" />
                <span className="block w-8 h-px bg-[#b8a17a]" />
              </div>
              <p className="text-[#4a4742] text-[14px] font-serif-body leading-[1.85]">
                A signature Lush Makeovers look &mdash; photographed on her
                wedding day. Captured in {lightbox.year}.
              </p>
              <Link
                to={`/inquire?look=${encodeURIComponent(`${lightbox.title} — ${lightbox.catLabel}${lightbox.location ? `, ${lightbox.location}` : ''}`)}`}
                className="inline-flex items-center gap-2 mt-6 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase font-display w-fit"
              >
                <span>Book Similar</span>
                <ArrowUpRight size={13} strokeWidth={1.25} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PortfolioPage;


