import React from 'react';
import { brandInfo, instagramPosts } from '../mock';
import { Instagram as IgIcon } from 'lucide-react';

const Instagram = () => {
  return (
    <section className="w-full bg-[#f7f4ef] py-20 md:py-24">
      <div className="max-w-[1080px] mx-auto px-4 md:px-8 text-center">
        <div className="font-script italic text-[#3a3a3a] text-[26px] md:text-[30px]">
          Need More Inspo?
        </div>
        <div className="mt-1 font-display text-[#3a3a3a] text-[20px] md:text-[24px] tracking-[0.32em]">
          FOLLOW US ON INSTAGRAM
        </div>

        <div className="mt-12 max-w-[820px] mx-auto border border-[#e3dcd1] bg-white px-6 md:px-10 py-8 text-left">
          {/* IG header */}
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d6c4a7] to-[#efe1c8] flex items-center justify-center text-[#3a3a3a] font-display text-[18px] tracking-widest">
              LM
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="text-[#3a3a3a] text-[18px] font-serif-body">
                  lushmakeovers
                </div>
                <button className="text-[12px] tracking-[0.25em] uppercase border border-[#6b6760] px-4 py-1.5 text-[#3a3a3a] hover:bg-[#6b6760] hover:text-[#f7f4ef] transition-colors flex items-center gap-2">
                  <IgIcon size={13} strokeWidth={1.5} /> Follow
                </button>
              </div>
              <div className="mt-3 flex gap-6 text-[13px] text-[#4a4742]">
                <span><strong className="text-[#3a3a3a]">{brandInfo.posts}</strong> Posts</span>
                <span><strong className="text-[#3a3a3a]">{brandInfo.followers}</strong> Followers</span>
                <span><strong className="text-[#3a3a3a]">{brandInfo.following}</strong> Following</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-[14px] text-[#3a3a3a] leading-[1.7] font-serif-body">
            <div className="font-medium">Lush Makeovers | Vijayawada Bridal Beauty</div>
            <div>✨ Vijayawada&apos;s most-booked bridal studio</div>
            <div>💄 1000+ brides &middot; HD &middot; Airbrush &middot; Traditional</div>
            <div>🎓 200+ makeup artists trained</div>
            <div>📍 Vijayawada &middot; Andhra Pradesh &middot; Destination</div>
            <div className="text-[#6b6760] text-[13px] mt-1">https://lushmakeovers.in</div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-7">
            {instagramPosts.map((src, i) => (
              <div key={i} className="img-zoom h-[160px] md:h-[210px] relative">
                <img src={src} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 text-white">
                  <IgIcon size={16} strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
