import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { portfolioWorks } from '../mock';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sectionReveal } from './motion';

const Portfolio = () => {
  const gallery = useMemo(() => portfolioWorks.slice(0, 10), []);
  const loopedGallery = useMemo(() => [...gallery, ...gallery, ...gallery], [gallery]);
  const [paused, setPaused] = useState(false);

  const pauseMotion = () => setPaused(true);

  return (
    <motion.section
      id="portfolio"
      className="w-full pt-14 md:pt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 mb-7 md:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-[760px]">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] uppercase mb-3">
              Featured Work
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[42px] tracking-[0.14em] uppercase">
              From The Portfolio
            </h2>
            <div className="font-script italic text-[#8a7656] text-[18px] md:text-[24px] mt-1">
              Infinite scroll, tap to pause
            </div>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase font-display w-fit"
          >
            <span>Open Portfolio</span>
            <ArrowUpRight size={13} strokeWidth={1.25} />
          </Link>
        </div>
      </div>

      <div className="px-4 md:px-6 overflow-hidden">
        <div
          className={`portfolio-marquee flex w-max gap-3 sm:gap-4 md:gap-5 pb-4 md:pb-5 ${paused ? 'paused' : ''}`}
          onPointerDown={pauseMotion}
          onTouchStart={pauseMotion}
          onMouseDown={pauseMotion}
          onClick={pauseMotion}
        >
          {loopedGallery.map((work, i) => (
            <Link
              key={`${work.id}-${i}`}
              to="/portfolio"
              className="group relative flex-shrink-0 w-[66vw] max-w-[210px] sm:w-[40vw] sm:max-w-[230px] md:w-[24vw] md:max-w-[250px] lg:w-[19vw] lg:max-w-[260px] aspect-[3/4] overflow-hidden bg-[#f3ede2] text-left snap-start focus:outline-none"
            >
              <OptimizedImage
                src={work.image}
                alt={work.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="font-display text-white/85 text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
                  {work.catLabel}
                </div>
                <div className="mt-1 font-script italic text-white text-[19px] md:text-[22px] leading-tight">
                  {work.title}
                </div>
                <div className="mt-1 font-display text-white/75 text-[9px] md:text-[10px] tracking-[0.26em] uppercase">
                  {work.location} · {work.year}
                </div>
              </div>
              <div className="absolute top-3 left-3 font-display text-[10px] tracking-[0.3em] text-white/0 group-hover:text-white/80 transition-opacity duration-500">
                {String((i % gallery.length) + 1).padStart(2, '0')}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
