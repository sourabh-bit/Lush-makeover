import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Sparkles, Images, GraduationCap, User, Phone, Send, Store } from 'lucide-react';
import { sitePages } from '../schema';

const pageIcons = {
  home: Home,
  services: Sparkles,
  portfolio: Images,
  academy: GraduationCap,
  about: User,
  contact: Phone,
  inquire: Send,
  business: Store,
};

// One tappable card per page of the website.
const WebsitePages = () => (
  <div>
    <h1 className="text-[24px] font-medium text-[#1f1f1f]">Edit my website</h1>
    <p className="mt-1 text-[14px] text-[#8b7f72]">Pick the page you want to change.</p>

    <div className="mt-5 space-y-2.5">
      {sitePages.map((page) => {
        const Icon = pageIcons[page.id] || Home;
        return (
          <Link
            key={page.id}
            to={`/admin/website/${page.id}`}
            className="flex min-h-[72px] items-center gap-4 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)] transition-transform active:scale-[0.99]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4efe8] text-[#4b453f]">
              <Icon size={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-medium text-[#1f1f1f]">{page.label}</span>
              <span className="mt-0.5 block truncate text-[13px] text-[#8b7f72]">{page.description}</span>
            </span>
            <ChevronRight size={18} className="shrink-0 text-[#c9c2b8]" />
          </Link>
        );
      })}
    </div>
  </div>
);

export default WebsitePages;
