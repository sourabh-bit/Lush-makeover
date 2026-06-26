import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { contactInfo } from '../mock';
import {
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  MapPin,
  Clock,
  ChevronDown,
  ArrowUpRight,
  Send,
} from 'lucide-react';

const iconMap = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  instagram: Instagram,
};

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    const list = JSON.parse(localStorage.getItem('lush_contact_messages') || '[]');
    list.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem('lush_contact_messages', JSON.stringify(list));
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="w-full bg-white">
      {/* ---------------- BANNER ---------------- */}
      <section className="w-full border-b border-[#ece6da]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-14 md:pb-16 text-center">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.5em] mb-3">
            {contactInfo.eyebrow}
          </div>
          <h1 className="font-display text-[#2a2a2a] text-[40px] md:text-[64px] tracking-[0.18em] leading-none">
            {contactInfo.title.toUpperCase()}
          </h1>
          <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[28px] mt-1">
            {contactInfo.subtitle}
          </div>
          <div className="flex items-center justify-center gap-3 mt-7 opacity-80">
            <span className="block w-12 h-px bg-[#b8a17a]" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
            <span className="block w-12 h-px bg-[#b8a17a]" />
          </div>
          <p className="font-serif-body text-[#4a4742] text-[15px] md:text-[16px] leading-[1.9] max-w-[620px] mx-auto mt-7">
            {contactInfo.greeting}
          </p>
        </div>
      </section>

      {/* ---------------- CHANNELS ---------------- */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            WAYS TO REACH US
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[26px] md:text-[34px] tracking-[0.16em]">
            FOUR DOORS,
          </h2>
          <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[26px] -mt-0.5">
            one warm welcome
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {contactInfo.channels.map((c) => {
            const Icon = iconMap[c.key];
            return (
              <a
                key={c.key}
                href={c.href}
                target={c.key === 'instagram' || c.key === 'whatsapp' ? '_blank' : undefined}
                rel={c.key === 'instagram' || c.key === 'whatsapp' ? 'noreferrer' : undefined}
                className="group border border-[#ece6da] p-7 md:p-8 bg-white hover:shadow-[0_22px_40px_-22px_rgba(120,90,40,0.2)] hover:border-[#d7cdb8] transition-all duration-500 flex flex-col"
              >
                <span className="w-12 h-12 border border-[#d7cdb8] rounded-full flex items-center justify-center text-[#b8a17a] group-hover:bg-[#b8a17a] group-hover:text-white transition-colors duration-500">
                  <Icon size={18} strokeWidth={1.25} />
                </span>
                <div className="font-display text-[#6b6760] text-[10px] tracking-[0.35em] uppercase mt-5">
                  {c.label}
                </div>
                <div className="font-script italic text-[#2a2a2a] text-[22px] md:text-[24px] mt-1.5 leading-snug break-words">
                  {c.value}
                </div>
                <div className="font-serif-body text-[#6b6760] text-[13px] mt-2 italic">
                  {c.hint}
                </div>
                <span className="mt-auto pt-6 flex items-center gap-2 text-[10px] tracking-[0.32em] uppercase font-display text-[#2a2a2a]">
                  <span>Reach Out</span>
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.25}
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ---------------- STUDIO + HOURS + QUICK NOTE ---------------- */}
      <section className="w-full bg-[#fafaf6] border-y border-[#ece6da]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          {/* Studio image */}
          <div className="md:col-span-6">
            <div className="relative overflow-hidden">
              <OptimizedImage
                src={contactInfo.studioImage}
                alt="Lush Makeovers studio"
                className="w-full h-[420px] md:h-[520px] object-cover"
              />
              <span className="absolute top-3 left-3 w-9 h-9 border-t border-l border-[#b8a17a]/70" />
              <span className="absolute top-3 right-3 w-9 h-9 border-t border-r border-[#b8a17a]/70" />
              <span className="absolute bottom-3 left-3 w-9 h-9 border-b border-l border-[#b8a17a]/70" />
              <span className="absolute bottom-3 right-3 w-9 h-9 border-b border-r border-[#b8a17a]/70" />
            </div>
          </div>

          {/* Address + Hours + Quick note */}
          <div className="md:col-span-6 md:pl-4 space-y-10">
            <div>
              <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
                VISIT THE STUDIO
              </div>
              <h3 className="font-display text-[#2a2a2a] text-[26px] md:text-[34px] tracking-[0.12em]">
                THE ADDRESS
              </h3>
              <div className="flex items-start gap-3 mt-5 text-[#4a4742] font-serif-body text-[15px] md:text-[16px] leading-[1.85]">
                <MapPin size={16} strokeWidth={1.25} className="mt-1 text-[#b8a17a] flex-shrink-0" />
                <div>
                  <div className="text-[#2a2a2a]">{contactInfo.studio.line1}</div>
                  <div>{contactInfo.studio.line2}</div>
                  <div>{contactInfo.studio.line3}</div>
                  <div>{contactInfo.studio.state}</div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Vijayawada"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-5 text-[#2a2a2a] text-[11px] tracking-[0.32em] uppercase font-display border-b border-[#2a2a2a] pb-1 hover:text-[#b8a17a] hover:border-[#b8a17a] transition-colors"
              >
                Open in Maps
                <ArrowUpRight size={12} strokeWidth={1.25} />
              </a>
            </div>

            <div>
              <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
                STUDIO HOURS
              </div>
              <h3 className="font-display text-[#2a2a2a] text-[22px] md:text-[28px] tracking-[0.12em]">
                WHEN WE&apos;RE OPEN
              </h3>
              <div className="mt-5 border-t border-[#ece6da]">
                {contactInfo.hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 py-3 border-b border-[#ece6da] text-[#4a4742] font-serif-body"
                  >
                    <span className="flex items-center gap-2.5 text-[14px] md:text-[15px]">
                      <Clock size={13} strokeWidth={1.25} className="text-[#b8a17a]" />
                      {h.day}
                    </span>
                    <span className="font-script italic text-[#2a2a2a] text-[16px] md:text-[17px]">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-serif-body italic text-[#6b6760] text-[13px]">
                Wedding morning appointments begin from 4:00 am as required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- QUICK MESSAGE FORM ---------------- */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-5">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            A QUICK NOTE
          </div>
          <h3 className="font-display text-[#2a2a2a] text-[28px] md:text-[40px] tracking-[0.12em] leading-tight">
            SEND US A
          </h3>
          <div className="font-script italic text-[#3a3a3a] text-[28px] md:text-[34px] -mt-0.5">
            short message
          </div>
          <p className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.9]">
            For a quick question, a press request or any general note, write
            to us here. For detailed wedding enquiries, please use the
            dedicated{' '}
            <a href="/inquire" className="underline underline-offset-4 hover:text-[#b8a17a]">
              Inquire
            </a>{' '}
            page so we can serve you better.
          </p>
        </div>

        <div className="md:col-span-7">
          <form
            onSubmit={onSubmit}
            className="bg-white border border-[#ece6da] p-7 md:p-9 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <div>
              <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-[#6b6760] mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={onChange('name')}
                className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 text-[15px] font-serif-body text-[#2a2a2a] focus:border-[#2a2a2a] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-[#6b6760] mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={onChange('email')}
                className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 text-[15px] font-serif-body text-[#2a2a2a] focus:border-[#2a2a2a] focus:outline-none transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-[#6b6760] mb-2">
                Message *
              </label>
              <textarea
                rows="4"
                required
                value={form.message}
                onChange={onChange('message')}
                className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 text-[15px] font-serif-body text-[#2a2a2a] focus:border-[#2a2a2a] focus:outline-none transition-colors resize-none"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3">
              {submitted ? (
                <div className="font-script italic text-[#2a7a3a] text-[16px]">
                  Thank you  we will write back within 24 hours.
                </div>
              ) : (
                <div className="text-[#6b6760] text-[12px] italic font-serif-body">
                  We will reply to every note personally.
                </div>
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-7 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
              >
                Send Message
                <Send size={13} strokeWidth={1.25} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ---------------- FAQS ---------------- */}
      <section className="w-full bg-[#fafaf6] border-t border-[#ece6da]">
        <div className="max-w-[820px] mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="text-center mb-12">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
              ANSWERS
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[28px] md:text-[36px] tracking-[0.16em]">
              GENTLE QUESTIONS
            </h2>
            <div className="font-script italic text-[#3a3a3a] text-[24px] md:text-[28px] -mt-0.5">
              we are often asked
            </div>
          </div>

          <div className="border-t border-[#ece6da]">
            {contactInfo.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="border-b border-[#ece6da]">
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  >
                    <span className="font-script italic text-[#2a2a2a] text-[18px] md:text-[22px]">
                      {f.q}
                    </span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.2}
                      className={`text-[#6b6760] transition-transform duration-500 ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-60 pb-5' : 'max-h-0'}`}
                  >
                    <p className="text-[#4a4742] text-[14.5px] md:text-[15px] leading-[1.9] font-serif-body pr-2">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
