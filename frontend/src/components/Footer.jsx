import React from 'react';
import { Link } from 'react-router-dom';
import { brandInfo, siteSettings } from '../mock';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#fafaf6] py-14 border-t border-[#ece6da]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-[#3a3a3a] text-[20px] tracking-[0.35em]">
            {brandInfo.name}
          </div>
          <div className="font-display text-[#6b6760] text-[10px] tracking-[0.4em] mt-1">
            {brandInfo.tagline}
          </div>
          <p className="mt-5 text-[#4a4742] text-[14px] font-serif-body leading-[1.85] max-w-[280px]">
            {siteSettings.description || 'Luxury bridal beauty and education.'}
          </p>
        </div>

        <div>
          <div className="font-script italic text-[#3a3a3a] text-[18px] mb-4">Studio</div>
          <ul className="space-y-2 text-[#4a4742] text-[13px] tracking-[0.12em] uppercase">
            <li><Link to="/" className="hover:text-[#a08f7d] transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-[#a08f7d] transition-colors">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-[#a08f7d] transition-colors">Portfolio</Link></li>
            <li><Link to="/about" className="hover:text-[#a08f7d] transition-colors">About</Link></li>
            <li><Link to="/academy" className="hover:text-[#a08f7d] transition-colors">Academy</Link></li>
            <li><Link to="/inquire" className="hover:text-[#a08f7d] transition-colors">Inquire</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-script italic text-[#3a3a3a] text-[18px] mb-4">Contact</div>
          <ul className="space-y-3 text-[#4a4742] text-[13px] font-serif-body">
            <li className="flex items-center gap-2"><MapPin size={14} strokeWidth={1.25} /> {siteSettings.address || 'Vijayawada, Andhra Pradesh'}</li>
            <li className="flex items-center gap-2"><Phone size={14} strokeWidth={1.25} /> {siteSettings.phone || '+91 90000 00000'}</li>
            <li className="flex items-center gap-2"><Mail size={14} strokeWidth={1.25} /> {siteSettings.email || 'hello@lushmakeovers.in'}</li>
            <li className="flex items-center gap-2"><Instagram size={14} strokeWidth={1.25} /> <a href={brandInfo.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[#a08f7d] transition-colors">{brandInfo.instagram}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6 md:px-8 mt-12 pt-6 border-t border-[#d9d2c6] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-[#6b6760] text-[12px] tracking-wider">
          {new Date().getFullYear()} Lush Makeovers. All rights reserved.
        </div>
        <div className="text-[#6b6760] text-[12px] tracking-[0.2em] uppercase">
          Designed with love in Vijayawada
        </div>
      </div>
    </footer>
  );
};

export default Footer;
