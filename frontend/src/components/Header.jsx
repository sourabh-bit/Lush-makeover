import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brandInfo, navLinks } from '../mock';
import { User, Menu, X } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuBg = encodeURI('/founder-photo.jpg');

  useEffect(() => {
    if (!open) return undefined;

    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    return () => {
      body.style.overflow = prevBodyOverflow;
      documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [open]);

  const renderLink = (link, extraClass = '') => {
    const isHash = link.href.includes('#');
    const cls = `text-[#3a3a3a] text-[11px] tracking-[0.22em] uppercase hover:text-[#a08f7d] transition-colors duration-300 whitespace-nowrap ${extraClass}`;
    if (isHash) {
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
    <header className="w-full bg-white pt-4 md:pt-6 pb-3 relative z-40">
      <div className="md:hidden px-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex flex-col items-start text-left group min-w-0">
            <h1 className="font-display text-[#3a3a3a] text-[22px] sm:text-[24px] tracking-[0.28em] font-normal leading-none truncate max-w-[78vw]">
              {brandInfo.name}
            </h1>
            <div className="font-display text-[#6b6760] text-[7px] sm:text-[8px] tracking-[0.38em] mt-1 uppercase truncate max-w-[78vw]">
              {brandInfo.tagline}
            </div>
          </Link>
          <button
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center text-[#6b6760]"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="absolute top-6 right-6 flex items-center gap-6 text-[#6b6760]">
          <Link to="/admin/login" className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase hover:text-[#3a3a3a] transition-colors">
            <User size={14} strokeWidth={1.25} />
            <span>Log In</span>
          </Link>
        </div>

        <Link to="/" className="flex flex-col items-center text-center px-4 group">
          <h1 className="font-display text-[#3a3a3a] text-[28px] md:text-[34px] tracking-[0.4em] font-normal">
            {brandInfo.name}
          </h1>
          <div className="font-display text-[#6b6760] text-[10px] md:text-[11px] tracking-[0.5em] mt-1">
            {brandInfo.tagline}
          </div>
        </Link>

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

        <nav className="flex justify-center items-center gap-8 mt-7 pb-2 border-b border-[#e3dcd1]">
          {navLinks.map((link) => renderLink(link))}
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden overflow-hidden overscroll-contain" onClick={() => setOpen(false)}>
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${menuBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/60" aria-hidden="true" />
          <nav
            className="relative flex min-h-full flex-col items-center justify-start pt-20 px-6 pb-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-10 text-center">
              <div className="font-display text-[#fcfaf7] text-[24px] tracking-[0.36em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
                {brandInfo.name}
              </div>
              <div className="mt-2 font-display text-[#f3e8de] text-[9px] tracking-[0.45em] uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
                {brandInfo.tagline}
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 w-full max-w-[280px]">
              {navLinks.map((link) => renderLink(link, 'text-[#fcfaf7] text-[13px] tracking-[0.38em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]'))}
            </div>
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-10 flex items-center gap-2 text-[#f3e8de] text-[11px] tracking-[0.28em] uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)] border border-white/25 px-5 py-2.5"
            >
              <User size={13} strokeWidth={1.25} />
              <span>Log In</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
