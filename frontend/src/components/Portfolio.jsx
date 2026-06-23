import React from 'react';
import { portfolioImages } from '../mock';
import { ChevronRight } from 'lucide-react';

const Portfolio = () => {
  return (
    <section id="portfolio" className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {portfolioImages.map((img, i) => (
          <div key={i} className="img-zoom h-[240px] md:h-[360px] relative">
            <img src={img} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
            {i === portfolioImages.length - 1 && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#f7f4ef]/90 w-8 h-8 flex items-center justify-center hover:bg-[#f7f4ef] transition-colors" aria-label="More">
                <ChevronRight size={16} strokeWidth={1.25} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
