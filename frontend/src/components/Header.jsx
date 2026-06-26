import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brandInfo, navLinks } from '../mock';
import { User, ShoppingBag, Menu, X } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const renderLink = (link, extraClass = '') => {
    const isHash = link.href.includes('#');
    const cls = `text-[#3a3a3a] text-[11px] tracking-[0.22em] uppercase hover:text-[#a08f7d] transition-colors duration-300 whitespace-nowrap ${extraClass}`;
    if (isHash) {
      // Hash links on home page; absolute root + hash to ensure navigation
      const target = link.href.startsWith('/') ? link.href : `/${link.href}`;
      return (
        <a key={link.label} href={target} className={cls} onClick={() => setOpen(false)}>
          {link.label}
        </a>
      );
    }
    return (
      <Link key={link.label} to={link.href} className={cls} onClick={() => setOpen(false)}>
        {link.label}
      </Link>
    );
  };

  return (
    <header className="w-full bg-[#f7f4ef] pt-6 pb-3 relative z-30">
      {/* Top row: account & cart icons */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-6 text-[#6b6760]">
        <button className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase hover:text-[#3a3a3a] transition-colors">
          <User size={14} strokeWidth={1.25} />
          <span>Log In</span>
        </button>
        <button className="hover:text-[#3a3a3a] transition-colors" aria-label="Cart">
          <ShoppingBag size={16} strokeWidth={1.25} />
        </button>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden absolute top-6 right-5 text-[#6b6760]"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Brand name centered */}
      <Link to="/" className="flex flex-col items-center text-center px-4 group">
        <h1 className="font-display text-[#3a3a3a] text-[28px] md:text-[34px] tracking-[0.4em] font-normal">
          {brandInfo.name}
        </h1>
        <div className="font-display text-[#6b6760] text-[10px] md:text-[11px] tracking-[0.5em] mt-1">
          {brandInfo.tagline}
        </div>
      </Link>

      {/* Subtitle */}
      {location.pathname === '/' && (
        <div className="flex flex-col items-center text-center px-4">
          <div className="mt-5 font-script italic text-[#3a3a3a] text-[20px] md:text-[24px] leading-tight">
            Vijayawada &amp; Destination<br />
            <span>Bridal Hair and Makeup Artists</span>
          </div>
          <p className="mt-3 text-[#6b6760] text-[11px] md:text-[12px] tracking-[0.18em] uppercase">
            Serving brides in Vijayawada, Hyderabad &amp; across Andhra Pradesh
            <span className="hidden md:inline"> | Available for destination weddings</span>
          </p>
        </div>
      )}

      {/* Nav */}
      <nav className="hidden md:flex justify-center items-center gap-8 mt-7 pb-2 border-b border-[#e3dcd1]">
        {navLinks.map((link) => renderLink(link))}
      </nav>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden flex flex-col items-center gap-4 mt-6 pb-5 border-b border-[#e3dcd1] bg-[#f7f4ef]">
          {navLinks.map((link) => renderLink(link))}
        </nav>
      )}
    </header>
  );
};

export default Header;
