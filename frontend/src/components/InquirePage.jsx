import React, { useState } from 'react';
import { inquireConfig, servicesList } from '../mock';
import {
  ArrowUpRight,
  Check,
  Calendar,
  Users,
  MapPin,
  Heart,
  Sparkles,
  Shield,
} from 'lucide-react';

const initialForm = {
  fullName: '',
  partner: '',
  phone: '',
  email: '',
  occasion: '',
  weddingDate: '',
  venue: '',
  city: '',
  guests: '',
  budget: '',
  hearAbout: '',
  message: '',
};

const InquirePage = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.occasion) return;
    const list = JSON.parse(localStorage.getItem('lush_inquiries') || '[]');
    list.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem('lush_inquiries', JSON.stringify(list));
    setSubmitted(true);
  };

  // step bar items
  const steps = [
    { n: 1, label: 'About You' },
    { n: 2, label: 'The Occasion' },
    { n: 3, label: 'Final Notes' },
  ];

  return (
    <main className="w-full bg-white">
      {/* ---------------- BANNER ---------------- */}
      <section className="relative w-full overflow-hidden border-b border-[#ece6da]">
        <div className="relative h-[360px] md:h-[440px]">
          <img
            src={inquireConfig.heroImage}
            alt="Inquire"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/76" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/85" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.5em] mb-4">
              {inquireConfig.eyebrow}
            </div>
            <h1 className="font-display text-[#2a2a2a] text-[40px] md:text-[64px] tracking-[0.18em] leading-none">
              {inquireConfig.title.toUpperCase()}
            </h1>
            <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[28px] mt-1">
              {inquireConfig.subtitle}
            </div>
            <div className="flex items-center justify-center gap-3 mt-7 opacity-80">
              <span className="block w-12 h-px bg-[#b8a17a]" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
              <span className="block w-12 h-px bg-[#b8a17a]" />
            </div>
            <p className="font-serif-body text-[#3a3a3a] text-[15px] md:text-[16px] leading-[1.85] max-w-[640px] mx-auto mt-5">
              {inquireConfig.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- BODY ---------------- */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        {/* LEFT — promises & service summary */}
        <aside className="md:col-span-4 space-y-10 md:sticky md:top-6 md:self-start">
          <div>
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
              OUR PROMISE
            </div>
            <h3 className="font-display text-[#2a2a2a] text-[24px] md:text-[28px] tracking-[0.12em] leading-tight">
              WHAT TO
            </h3>
            <div className="font-script italic text-[#3a3a3a] text-[24px] -mt-0.5">
              expect from us
            </div>
            <ul className="mt-5 space-y-3">
              {inquireConfig.promises.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[#4a4742] text-[14px] md:text-[15px] font-serif-body leading-snug"
                >
                  <Check size={14} strokeWidth={1.5} className="mt-1 text-[#b8a17a] flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#ece6da] pt-7">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
              POPULAR SERVICES
            </div>
            <ul className="space-y-3">
              {servicesList.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-3">
                  <span className="font-script italic text-[#2a2a2a] text-[17px] md:text-[18px]">
                    {s.name}
                  </span>
                  <span className="font-display text-[#6b6760] text-[11px] tracking-[0.18em] uppercase">
                    {s.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#ece6da] pt-7">
            <div className="flex items-center gap-2 text-[#6b6760] text-[12px] font-serif-body italic">
              <Shield size={14} strokeWidth={1.25} className="text-[#b8a17a]" />
              Your details are treated with absolute discretion.
            </div>
          </div>
        </aside>

        {/* RIGHT — multi-step form */}
        <div className="md:col-span-8">
          {/* Step indicator */}
          <div className="flex items-center justify-between md:justify-start md:gap-4 mb-8">
            {steps.map((s, i) => {
              const active = step >= s.n;
              return (
                <React.Fragment key={s.n}>
                  <button
                    type="button"
                    onClick={() => !submitted && setStep(s.n)}
                    className="flex items-center gap-3 group"
                  >
                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-display text-[12px] transition-colors duration-400 ${
                        active
                          ? 'bg-[#2a2a2a] text-white border-[#2a2a2a]'
                          : 'bg-white text-[#6b6760] border-[#d7cdb8]'
                      }`}
                    >
                      {s.n}
                    </span>
                    <span
                      className={`text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-display transition-colors duration-400 ${
                        active ? 'text-[#2a2a2a]' : 'text-[#6b6760]'
                      } hidden sm:inline`}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < steps.length - 1 && (
                    <span
                      className={`flex-1 md:flex-none md:w-10 h-px ${
                        step > s.n ? 'bg-[#2a2a2a]' : 'bg-[#d7cdb8]'
                      } mx-2 md:mx-0`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {submitted ? (
            <div className="border border-[#ece6da] p-10 md:p-14 text-center bg-white">
              <span className="inline-flex w-14 h-14 rounded-full border border-[#b8a17a]/60 items-center justify-center text-[#b8a17a]">
                <Heart size={22} strokeWidth={1.25} />
              </span>
              <h3 className="mt-6 font-display text-[#2a2a2a] text-[28px] md:text-[36px] tracking-[0.12em]">
                THANK YOU
              </h3>
              <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[26px] mt-1">
                for writing to us
              </div>
              <p className="mt-5 text-[#4a4742] font-serif-body leading-[1.9] max-w-[440px] mx-auto">
                Your enquiry has reached our admissions desk. A personal note
                from us will arrive within 24 hours — often much sooner.
              </p>
              <div className="flex items-center justify-center gap-3 mt-10">
                <a
                  href="/"
                  className="border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-6 py-2.5 text-[11px] tracking-[0.32em] uppercase font-display"
                >
                  Return Home
                </a>
                <a
                  href="/portfolio"
                  className="border border-transparent text-[#2a2a2a] hover:text-[#b8a17a] px-3 py-2.5 text-[11px] tracking-[0.32em] uppercase font-display inline-flex items-center gap-1.5"
                >
                  View Portfolio
                  <ArrowUpRight size={12} strokeWidth={1.25} />
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="border border-[#ece6da] p-7 md:p-10 bg-white"
            >
              {/* ---------- STEP 1 ---------- */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="font-display text-[#6b6760] text-[10px] tracking-[0.42em] uppercase">
                    Step 01 / About You
                  </div>
                  <h3 className="font-script italic text-[#2a2a2a] text-[28px] md:text-[32px] leading-tight">
                    Tell us a little about yourself
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label="Your Full Name *"
                      value={form.fullName}
                      onChange={onChange('fullName')}
                      required
                    />
                    <Field
                      label="Partner's Name"
                      value={form.partner}
                      onChange={onChange('partner')}
                    />
                    <Field
                      label="Phone / WhatsApp *"
                      type="tel"
                      value={form.phone}
                      onChange={onChange('phone')}
                      required
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={onChange('email')}
                    />
                  </div>

                  <NavRow
                    nextDisabled={!form.fullName || !form.phone}
                    onNext={() => setStep(2)}
                  />
                </div>
              )}

              {/* ---------- STEP 2 ---------- */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="font-display text-[#6b6760] text-[10px] tracking-[0.42em] uppercase">
                    Step 02 / The Occasion
                  </div>
                  <h3 className="font-script italic text-[#2a2a2a] text-[28px] md:text-[32px] leading-tight">
                    What are we planning together?
                  </h3>

                  <div>
                    <FieldLabel>Occasion *</FieldLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mt-2">
                      {inquireConfig.occasions.map((o) => {
                        const active = form.occasion === o;
                        return (
                          <button
                            key={o}
                            type="button"
                            onClick={() => setForm({ ...form, occasion: o })}
                            className={`px-3 py-2.5 text-[11px] md:text-[12px] tracking-[0.16em] uppercase font-display border transition-colors duration-400 text-left ${
                              active
                                ? 'bg-[#2a2a2a] text-white border-[#2a2a2a]'
                                : 'bg-white text-[#3a3a3a] border-[#d7cdb8] hover:border-[#2a2a2a]'
                            }`}
                          >
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      label="Wedding / Event Date"
                      type="date"
                      value={form.weddingDate}
                      onChange={onChange('weddingDate')}
                      icon={Calendar}
                    />
                    <Field
                      label="Approximate Family / Bridal Party"
                      value={form.guests}
                      onChange={onChange('guests')}
                      icon={Users}
                      placeholder="e.g. bride + 4"
                    />
                    <Field
                      label="Venue"
                      value={form.venue}
                      onChange={onChange('venue')}
                      placeholder="Hotel, banquet, home..."
                      icon={MapPin}
                    />
                    <Field
                      label="City"
                      value={form.city}
                      onChange={onChange('city')}
                      placeholder="Vijayawada, Hyderabad..."
                    />
                  </div>

                  <NavRow
                    onBack={() => setStep(1)}
                    nextDisabled={!form.occasion}
                    onNext={() => setStep(3)}
                  />
                </div>
              )}

              {/* ---------- STEP 3 ---------- */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="font-display text-[#6b6760] text-[10px] tracking-[0.42em] uppercase">
                    Step 03 / Final Notes
                  </div>
                  <h3 className="font-script italic text-[#2a2a2a] text-[28px] md:text-[32px] leading-tight">
                    Anything else we should know?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectField
                      label="Approximate Budget"
                      value={form.budget}
                      onChange={onChange('budget')}
                      options={[
                        '',
                        'Under ₹50,000',
                        '₹50,000 – ₹1,00,000',
                        '₹1,00,000 – ₹2,00,000',
                        '₹2,00,000 – ₹5,00,000',
                        '₹5,00,000 +',
                      ]}
                    />
                    <SelectField
                      label="How did you hear about us?"
                      value={form.hearAbout}
                      onChange={onChange('hearAbout')}
                      options={['', ...inquireConfig.hearAbout]}
                    />
                  </div>

                  <div>
                    <FieldLabel>Your Message</FieldLabel>
                    <textarea
                      rows="4"
                      value={form.message}
                      onChange={onChange('message')}
                      placeholder="Share your vision, mood, references — anything that helps us prepare for our conversation."
                      className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 text-[15px] font-serif-body text-[#2a2a2a] focus:border-[#2a2a2a] focus:outline-none transition-colors resize-none placeholder:text-[#bcb3a4]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[#6b6760] text-[12px] italic font-serif-body pt-2">
                    <Sparkles size={13} strokeWidth={1.25} className="text-[#b8a17a]" />
                    Submitting takes a moment — we&apos;ll write back within 24 hours.
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center justify-center gap-2 border border-[#d7cdb8] text-[#3a3a3a] hover:border-[#2a2a2a] hover:text-[#2a2a2a] px-6 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 border border-[#6b6760] bg-[#2a2a2a] text-white hover:bg-[#1a1a1a] transition-colors duration-500 px-8 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
                    >
                      Submit Enquiry
                      <ArrowUpRight size={13} strokeWidth={1.25} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

/* ---------------- HELPER COMPONENTS ---------------- */

const FieldLabel = ({ children }) => (
  <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-[#6b6760] mb-2">
    {children}
  </label>
);

const Field = ({ label, icon: Icon, ...rest }) => (
  <div>
    <FieldLabel>{label}</FieldLabel>
    <div className="relative">
      {Icon && (
        <Icon
          size={13}
          strokeWidth={1.25}
          className="absolute left-0 top-3.5 text-[#b8a17a]"
        />
      )}
      <input
        {...rest}
        className={`w-full border-b border-[#d7cdb8] bg-transparent py-2.5 text-[15px] font-serif-body text-[#2a2a2a] focus:border-[#2a2a2a] focus:outline-none transition-colors ${
          Icon ? 'pl-6' : ''
        } placeholder:text-[#bcb3a4]`}
      />
    </div>
  </div>
);

const SelectField = ({ label, options, ...rest }) => (
  <div>
    <FieldLabel>{label}</FieldLabel>
    <select
      {...rest}
      className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 text-[15px] font-serif-body text-[#2a2a2a] focus:border-[#2a2a2a] focus:outline-none transition-colors"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o || 'Select...'}
        </option>
      ))}
    </select>
  </div>
);

const NavRow = ({ onBack, onNext, nextDisabled }) => (
  <div className="flex flex-col sm:flex-row gap-3 pt-3 sm:justify-between">
    {onBack ? (
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center justify-center gap-2 border border-[#d7cdb8] text-[#3a3a3a] hover:border-[#2a2a2a] hover:text-[#2a2a2a] px-6 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
      >
        Back
      </button>
    ) : (
      <span />
    )}
    <button
      type="button"
      disabled={nextDisabled}
      onClick={onNext}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3 text-[11px] tracking-[0.32em] uppercase font-display border transition-colors duration-500 ${
        nextDisabled
          ? 'border-[#d7cdb8] text-[#bcb3a4] cursor-not-allowed'
          : 'border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white'
      }`}
    >
      Continue
      <ArrowUpRight size={13} strokeWidth={1.25} />
    </button>
  </div>
);

export default InquirePage;
