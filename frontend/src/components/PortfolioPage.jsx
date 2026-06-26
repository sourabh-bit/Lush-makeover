import React, { useState, useMemo } from 'react';
import {
  portfolioBanner,
  portfolioCategories,
  portfolioWorks,
  portfolioFeatured,
} from '../mock';
import { ArrowUpRight, X } from 'lucide-react';

const PortfolioPage = () => {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const works = useMemo(() => {
    if (active === 'all') return portfolioWorks;
    return portfolioWorks.filter((w) => w.category === active);
  }, [active]);

  // span -> tailwind classes for asymmetric masonry effect
  const spanClass = (span) => {
    switch (span) {
      case 'tall':
        return 'md:row-span-2 h-[420px] md:h-[640px]';
      case 'wide':
        return 'md:col-span-2 h-[300px] md:h-[420px]';
      case 'square':
      default:
        return 'h-[320px] md:h-[400px]';
    }
  };

  return (
    <main className="w-full bg-[#f7f4ef]">
      {/* ---------------- BANNER ---------------- */}
      <section className="relative w-full pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 text-center">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.5em] mb-5">
            {portfolioBanner.eyebrow}
          </div>
          <h1 className="font-display text-[#2a2a2a] text-[52px] md:text-[88px] lg:text-[110px] tracking-[0.14em] leading-none">
            {portfolioBanner.title.toUpperCase()}
          </h1>
          <div className="font-script italic text-[#3a3a3a] text-[24px] md:text-[34px] mt-1">
            {portfolioBanner.subtitle}
          </div>

          <div className="flex items-center justify-center gap-3 mt-9 mb-6 opacity-80">
            <span className="block w-16 h-px bg-[#b8a17a]" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
            <span className="block w-16 h-px bg-[#b8a17a]" />
          </div>

          <p className="font-script italic text-[#3a3a3a] text-[17px] md:text-[20px] max-w-[640px] mx-auto leading-relaxed">
            &ldquo;{portfolioBanner.quote}&rdquo;
          </p>
        </div>

        {/* small stats row */}
        <div className="max-w-[820px] mx-auto px-6 md:px-8 mt-14 grid grid-cols-3 gap-4 md:gap-6">
          {[
            { v: '1000+', l: 'Brides Made Up' },
            { v: '200+', l: 'Artists Trained' },
            { v: '12+', l: 'Years of Artistry' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-script italic text-[#2a2a2a] text-[28px] md:text-[38px]">
                {s.v}
              </div>
              <div className="font-display text-[#6b6760] text-[10px] md:text-[11px] tracking-[0.32em] mt-1 uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED STORY (split) ---------------- */}
      <section className="w-full bg-[#efe8dc]">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[600px]">
          <div className="img-zoom h-[420px] md:h-auto">
            <img
              src={portfolioFeatured.image}
              alt={portfolioFeatured.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center px-8 md:px-16 py-16">
            <div className="max-w-[440px]">
              <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-4">
                {portfolioFeatured.eyebrow}
              </div>
              <h2 className="font-display text-[#2a2a2a] text-[40px] md:text-[56px] tracking-[0.1em] leading-tight">
                {portfolioFeatured.title.toUpperCase()}
              </h2>
              <div className="font-script italic text-[#8a7656] text-[22px] md:text-[26px] mt-1">
                {portfolioFeatured.subtitle}
              </div>
              <p className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.9]">
                {portfolioFeatured.excerpt}
              </p>
              <a
                href="/#inquire"
                className="inline-flex items-center gap-3 mt-10 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#f7f4ef] transition-colors duration-500 px-7 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
              >
                <span>Read the Story</span>
                <ArrowUpRight size={14} strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CATEGORY FILTERS ---------------- */}
      <section className="max-w-[1180px] mx-auto px-4 md:px-8 pt-20 md:pt-28 pb-10">
        <div className="text-center">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] mb-3">
            BROWSE BY
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[28px] md:text-[36px] tracking-[0.18em]">
            THE COLLECTION
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-2">
          {portfolioCategories.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-5 md:px-7 py-2.5 text-[11px] md:text-[12px] tracking-[0.28em] uppercase font-display border transition-all duration-500
                  ${
                    isActive
                      ? 'bg-[#2a2a2a] text-[#f7f4ef] border-[#2a2a2a]'
                      : 'bg-transparent text-[#3a3a3a] border-[#cbbfa9] hover:border-[#2a2a2a]'
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------------- MASONRY GRID ---------------- */}
      <section className="max-w-[1280px] mx-auto px-3 md:px-8 pb-24 md:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 md:auto-rows-[300px]">
          {works.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setLightbox(w)}
              className={`group relative overflow-hidden bg-[#e3dcd1] ${spanClass(w.span)} text-left`}
            >
              <img
                src={w.image}
                alt={w.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
              />

              {/* subtle bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* hover info */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="font-display text-[#f3ebdc]/80 text-[10px] tracking-[0.35em] uppercase">
                  {w.catLabel}
                </div>
                <div className="flex items-end justify-between gap-3 mt-1">
                  <div>
                    <div className="font-script italic text-white text-[24px] md:text-[28px] leading-tight">
                      {w.title}
                    </div>
                    <div className="font-display text-[#f3ebdc]/80 text-[10px] tracking-[0.28em] uppercase mt-1">
                      {w.location} &middot; {w.year}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#f3ebdc]/95 text-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight size={15} strokeWidth={1.25} />
                  </div>
                </div>
              </div>

              {/* subtle index */}
              <div className="absolute top-3 left-4 font-display text-[10px] tracking-[0.32em] text-white/0 group-hover:text-white/80 transition-all duration-500">
                {String(i + 1).padStart(2, '0')}
              </div>
            </button>
          ))}
        </div>

        {/* ---------- BOTTOM CTA ---------- */}
        <div className="mt-24 md:mt-32 border-t border-[#d9d2c6] pt-16 text-center max-w-[720px] mx-auto">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] mb-3">
            WANT TO BE NEXT?
          </div>
          <h3 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.16em]">
            BEGIN YOUR
          </h3>
          <div className="font-script italic text-[#3a3a3a] text-[30px] md:text-[36px] -mt-1">
            bridal story
          </div>
          <p className="mt-6 text-[#4a4742] font-serif-body leading-[1.85] text-[15px] md:text-[16px]">
            Limited dates each season. Reach out to plan your trial and reserve
            your wedding day with Lush Makeovers.
          </p>
          <a
            href="/#inquire"
            className="inline-flex items-center gap-3 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#f7f4ef] transition-colors duration-500 px-8 py-3 mt-9 text-[11px] tracking-[0.32em] uppercase font-display"
          >
            <span>Enquire Now</span>
            <ArrowUpRight size={14} strokeWidth={1.25} />
          </a>
        </div>
      </section>

      {/* ---------------- LIGHTBOX ---------------- */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-[#1c1815]/92 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/12 text-white hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.2} />
          </button>

          <div
            className="relative max-w-[1100px] w-full max-h-[88vh] flex flex-col md:flex-row gap-0 bg-[#f7f4ef]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:flex-1 h-[60vh] md:h-auto overflow-hidden">
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-[340px] p-7 md:p-9 flex flex-col justify-center">
              <div className="font-display text-[#6b6760] text-[10px] tracking-[0.4em] uppercase">
                {lightbox.catLabel}
              </div>
              <h3 className="mt-3 font-display text-[#2a2a2a] text-[32px] md:text-[42px] tracking-[0.1em] leading-tight">
                {lightbox.title.toUpperCase()}
              </h3>
              <div className="font-script italic text-[#8a7656] text-[20px] md:text-[22px] mt-1">
                {lightbox.location}
              </div>
              <div className="flex items-center gap-3 my-6 opacity-80">
                <span className="block w-10 h-px bg-[#b8a17a]" />
                <span className="block w-1 h-1 rounded-full bg-[#b8a17a]" />
                <span className="block w-10 h-px bg-[#b8a17a]" />
              </div>
              <p className="text-[#4a4742] text-[14px] md:text-[15px] font-serif-body leading-[1.85]">
                A signature Lush Makeovers look &mdash; photographed on her
                wedding day. Captured in {lightbox.year}.
              </p>
              <a
                href="/#inquire"
                className="inline-flex items-center gap-2 mt-7 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-[#f7f4ef] transition-colors duration-500 px-5 py-2.5 text-[10px] tracking-[0.32em] uppercase font-display w-fit"
              >
                <span>Book Similar</span>
                <ArrowUpRight size={13} strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PortfolioPage;
