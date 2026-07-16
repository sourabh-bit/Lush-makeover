import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { brandInfo, instagramPosts } from '../mock';
import { Instagram as IgIcon, BadgeCheck } from 'lucide-react';
import { sectionReveal, staggerContainer, staggerItem, viewportOnce } from './motion';

const Instagram = () => {
  const stats = [
    { v: brandInfo.posts, l: 'Posts' },
    { v: brandInfo.followers, l: 'Followers' },
    { v: brandInfo.following, l: 'Following' },
  ];

  return (
    <motion.section
      className="w-full bg-white py-20 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={sectionReveal}
    >
      <div className="max-w-[1080px] mx-auto px-4 md:px-8 text-center">
        <div className="font-script italic text-[#3a3a3a] text-[26px] md:text-[30px]">
          Need More Inspo?
        </div>
        <div className="mt-1 font-display text-[#3a3a3a] text-[18px] md:text-[24px] tracking-[0.28em] md:tracking-[0.32em]">
          FOLLOW US ON INSTAGRAM
        </div>

        <motion.div
          className="mt-10 md:mt-12 max-w-[520px] mx-auto border border-[#e3dcd1] bg-white text-left shadow-[0_28px_60px_-48px_rgba(58,58,58,0.5)]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* profile row — avatar with story ring + stats, like the app */}
          <motion.div variants={staggerItem} className="flex items-center gap-5 sm:gap-7 px-5 sm:px-7 pt-6">
            <div className="shrink-0 rounded-full bg-gradient-to-tr from-[#c8a15c] via-[#d6c4a7] to-[#efe1c8] p-[2.5px]">
              <div className="rounded-full bg-white p-[2.5px]">
                <div className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-full bg-gradient-to-tr from-[#d6c4a7] to-[#efe1c8] flex items-center justify-center text-[#3a3a3a] font-display text-[17px] tracking-widest">
                  LM
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-around gap-2">
              {stats.map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-script italic text-[#2a2a2a] text-[20px] sm:text-[24px] leading-none">
                    {s.v}
                  </div>
                  <div className="mt-1.5 font-display text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#8b7f72]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* handle + bio */}
          <motion.div variants={staggerItem} className="px-5 sm:px-7 pt-5">
            <div className="flex items-center gap-1.5">
              <span className="text-[#2a2a2a] text-[15px] sm:text-[16px] font-medium font-serif-body">
                {brandInfo.instagram}
              </span>
              <BadgeCheck size={15} className="text-[#c8a15c]" fill="#f3e7d3" />
            </div>
            <div className="mt-2 space-y-0.5 text-[13px] sm:text-[13.5px] text-[#4a4742] leading-[1.65] font-serif-body">
              <div className="font-medium text-[#2a2a2a]">Lush Makeovers | Vijayawada Bridal Beauty</div>
              <div>Vijayawada&apos;s most-booked bridal studio</div>
              <div>1000+ brides &middot; HD &middot; Airbrush &middot; Traditional</div>
              <div>200+ makeup artists trained</div>
            </div>
          </motion.div>

          {/* follow button — full width like the app */}
          <motion.div variants={staggerItem} className="px-5 sm:px-7 pt-5">
            <a
              href={brandInfo.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-full items-center justify-center gap-2 bg-[#1f1f1f] text-white text-[11px] tracking-[0.28em] uppercase font-display transition-colors hover:bg-black"
            >
              <IgIcon size={14} strokeWidth={1.5} />
              Follow {brandInfo.instagram}
            </a>
          </motion.div>

          {/* feed grid — tight gaps, square tiles, like the app */}
          <motion.div variants={staggerItem} className="mt-6 grid grid-cols-3 gap-[3px]">
            {instagramPosts.map((src, i) => (
              <a
                key={`${src}-${i}`}
                href={brandInfo.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden bg-[#f3ede2]"
              >
                <OptimizedImage
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                  <IgIcon size={20} strokeWidth={1.5} className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Instagram;
