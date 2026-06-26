import React from 'react';
import OptimizedImage from './OptimizedImage';
import { portfolioImages } from '../mock';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <section id="portfolio" className="w-full pt-14 md:pt-20">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 mb-6 md:mb-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.45em] uppercase mb-3">
              Featured Work
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[42px] tracking-[0.14em] uppercase">
              From The Portfolio
            </h2>
            <div className="font-script italic text-[#8a7656] text-[18px] md:text-[24px] mt-1">
              Tap any image to explore the full gallery
            </div>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase font-display"
          >
            <span>Open Portfolio</span>
            <ArrowUpRight size={13} strokeWidth={1.25} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {portfolioImages.map((img, i) => (
          <Link
            key={i}
            to="/portfolio"
            className="img-zoom h-[240px] md:h-[360px] relative block group focus:outline-none"
          >
            <OptimizedImage
              src={img}
              alt={`Portfolio ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="font-display text-white/80 text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
                View Full Portfolio
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
