import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import {
  academyBanner,
  academyStats,
  academyCourses,
  academyBatches,
  academyMasterclass,
  academyStudents,
} from '../mock';
import {
  ArrowUpRight,
  Calendar,
  Users,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

const AcademyPage = () => {
  const [studentIdx, setStudentIdx] = useState(0);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    // Save to localStorage as mock backend
    const list = JSON.parse(localStorage.getItem('lush_academy_inquiries') || '[]');
    list.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem('lush_academy_inquiries', JSON.stringify(list));
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', course: '', message: '' });
  };

  const prev = () =>
    setStudentIdx((studentIdx - 1 + academyStudents.length) % academyStudents.length);
  const next = () => setStudentIdx((studentIdx + 1) % academyStudents.length);
  const student = academyStudents[studentIdx];

  return (
    <main className="w-full bg-white">
      {/* ---------------- BANNER ---------------- */}
      <section className="relative w-full overflow-hidden border-b border-[#ece6da]">
        <div className="relative h-[420px] md:h-[480px]">
          <OptimizedImage
            src={academyBanner.image}
            alt="Lush Makeovers Academy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/85" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.5em] mb-4">
              {academyBanner.eyebrow}
            </div>
            <h1 className="font-display text-[#2a2a2a] text-[40px] md:text-[64px] tracking-[0.16em] leading-none">
              THE ACADEMY
            </h1>
            <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[30px] mt-1">
              {academyBanner.subtitle}
            </div>
            <div className="flex items-center justify-center gap-3 mt-7 opacity-80">
              <span className="block w-12 h-px bg-[#b8a17a]" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#b8a17a]" />
              <span className="block w-12 h-px bg-[#b8a17a]" />
            </div>
            <p className="font-script italic text-[#3a3a3a] text-[16px] md:text-[19px] max-w-[640px] leading-relaxed mt-5">
              &ldquo;{academyBanner.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* stats row */}
        <div className="max-w-[1080px] mx-auto px-6 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {academyStats.map((s, i) => (
            <div key={i} className="text-center md:border-r last:border-r-0 md:border-[#ece6da]">
              <div className="font-script italic text-[#2a2a2a] text-[30px] md:text-[36px] leading-none">
                {s.v}
              </div>
              <div className="font-display text-[#6b6760] text-[10px] md:text-[11px] tracking-[0.32em] mt-2 uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5">
          <OptimizedImage
            src="https://images.pexels.com/photos/34955448/pexels-photo-34955448.jpeg"
            alt="Academy classroom"
            className="w-full h-[420px] md:h-[520px] object-cover"
          />
        </div>
        <div className="md:col-span-7 md:pl-4">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            ABOUT THE ACADEMY
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[32px] md:text-[44px] tracking-[0.12em] leading-tight">
            ARTISTRY
          </h2>
          <div className="font-script italic text-[#3a3a3a] text-[28px] md:text-[36px] -mt-1">
            taught with care
          </div>
          <p className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.9] max-w-[560px]">
            Lush Makeovers Academy was founded out of one simple belief ? that
            every great makeup artist deserves a calm, classical training
            ground. Our small-batch courses are taught by our senior studio
            artists, and every student receives one-to-one attention from day
            one.
          </p>
          <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[560px]">
            {[
              'Maximum 8?12 students per batch',
              'Hands-on practice every session',
              'Live models in advanced modules',
              'Lifetime alumni mentorship',
              'Government-recognised certificate',
              'Studio internship for top students',
            ].map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[#4a4742] text-[14px] md:text-[15px] font-serif-body"
              >
                <Check size={14} strokeWidth={1.5} className="mt-1 text-[#b8a17a] flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- COURSES ---------------- */}
      <section className="w-full bg-[#fafaf6] border-y border-[#ece6da]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-14">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
              CURRICULUM
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.16em]">
              COURSE OFFERINGS
            </h2>
            <div className="font-script italic text-[#3a3a3a] text-[24px] md:text-[28px] -mt-1">
              three paths, one standard
            </div>
            <div className="flex items-center justify-center gap-3 mt-5 opacity-80">
              <span className="block w-12 h-px bg-[#b8a17a]" />
              <span className="block w-1 h-1 rounded-full bg-[#b8a17a]" />
              <span className="block w-12 h-px bg-[#b8a17a]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {academyCourses.map((c) => (
              <article
                key={c.id}
                id={c.id}
                className="bg-white border border-[#ece6da] p-8 md:p-9 flex flex-col hover:shadow-[0_24px_40px_-20px_rgba(120,90,40,0.18)] transition-shadow duration-500"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[#6b6760] text-[11px] tracking-[0.42em]">
                    {c.level}
                  </span>
                  <span className="font-script italic text-[#8a7656] text-[16px]">{c.duration}</span>
                </div>
                <h3 className="mt-4 font-display text-[#2a2a2a] text-[24px] md:text-[26px] tracking-[0.1em] leading-tight">
                  {c.name.toUpperCase()}
                </h3>
                <div className="font-script italic text-[#3a3a3a] text-[17px] mt-1">
                  {c.tagline}
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-[#6b6760] text-[12px] font-display tracking-[0.18em] uppercase">
                  <span className="flex items-center gap-1.5"><Clock size={12} strokeWidth={1.5} /> {c.duration}</span>
                  <span className="flex items-center gap-1.5"><Users size={12} strokeWidth={1.5} /> {c.sessions}</span>
                </div>

                <p className="mt-5 text-[#4a4742] text-[14px] md:text-[15px] font-serif-body leading-[1.85]">
                  {c.description}
                </p>

                <div className="mt-5 border-t border-[#ece6da] pt-5">
                  <div className="font-display text-[#6b6760] text-[10px] tracking-[0.35em] uppercase mb-3">
                    Modules
                  </div>
                  <ul className="space-y-2">
                    {c.modules.map((m, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[#4a4742] text-[13.5px] font-serif-body leading-[1.7]"
                      >
                        <span className="mt-[9px] block w-2 h-px bg-[#b8a17a] flex-shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-5 border-t border-[#ece6da] flex items-end justify-between gap-3">
                  <div>
                    <div className="font-display text-[#6b6760] text-[10px] tracking-[0.32em] uppercase">
                      Course Fee
                    </div>
                    <div className="font-script italic text-[#2a2a2a] text-[22px] md:text-[24px] mt-0.5">
                      {c.fee}
                    </div>
                  </div>
                  <a
                    href="#register"
                    className="inline-flex items-center gap-2 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-4 py-2.5 text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-display"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight size={12} strokeWidth={1.25} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- UPCOMING BATCHES ---------------- */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="text-center mb-12">
          <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
            ENROLMENT
          </div>
          <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.16em]">
            UPCOMING BATCHES
          </h2>
          <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[26px] -mt-1">
            limited seats, intimate learning
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block border border-[#ece6da] rounded-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-[#fafaf6] border-b border-[#ece6da] py-4 px-6 font-display text-[#6b6760] text-[10px] tracking-[0.32em] uppercase">
            <div className="col-span-5">Course</div>
            <div className="col-span-3">Start Date</div>
            <div className="col-span-2">Seats Left</div>
            <div className="col-span-2 text-right">Action</div>
          </div>
          {academyBatches.map((b, i) => (
            <div
              key={i}
              className={`grid grid-cols-12 items-center px-6 py-5 ${
                i !== academyBatches.length - 1 ? 'border-b border-[#ece6da]' : ''
              } hover:bg-[#fcfaf4] transition-colors`}
            >
              <div className="col-span-5">
                <div className="font-display text-[#2a2a2a] text-[15px] tracking-[0.08em]">
                  {b.course}
                </div>
                <div className="font-script italic text-[#8a7656] text-[14px] mt-0.5">
                  {b.mode}
                </div>
              </div>
              <div className="col-span-3 flex items-center gap-2 text-[#4a4742] text-[14px] font-serif-body">
                <Calendar size={14} strokeWidth={1.25} className="text-[#b8a17a]" />
                {b.start}
              </div>
              <div className="col-span-2 text-[#4a4742] text-[14px] font-serif-body italic">
                {b.seats}
              </div>
              <div className="col-span-2 text-right">
                <a
                  href="#register"
                  className="inline-flex items-center gap-2 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-4 py-2 text-[10px] tracking-[0.3em] uppercase font-display"
                >
                  Reserve
                  <ArrowUpRight size={12} strokeWidth={1.25} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {academyBatches.map((b, i) => (
            <div key={i} className="border border-[#ece6da] p-5">
              <div className="font-display text-[#2a2a2a] text-[15px] tracking-[0.08em]">{b.course}</div>
              <div className="font-script italic text-[#8a7656] text-[14px] mt-0.5">{b.mode}</div>
              <div className="flex items-center justify-between mt-3 text-[13px]">
                <span className="flex items-center gap-1.5 text-[#4a4742] font-serif-body">
                  <Calendar size={13} strokeWidth={1.25} className="text-[#b8a17a]" />
                  {b.start}
                </span>
                <span className="text-[#4a4742] italic font-serif-body">{b.seats}</span>
              </div>
              <a
                href="#register"
                className="mt-4 inline-flex w-full justify-center items-center gap-2 border border-[#6b6760] text-[#2a2a2a] px-4 py-2.5 text-[10px] tracking-[0.3em] uppercase font-display"
              >
                Reserve Seat
                <ArrowUpRight size={12} strokeWidth={1.25} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- MASTERCLASS ---------------- */}
      <section className="w-full bg-[#fafaf6] border-y border-[#ece6da]">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-5">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
              alt="Masterclass"
              className="w-full h-[380px] md:h-[460px] object-cover"
            />
          </div>
          <div className="md:col-span-7">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
              SPECIAL EDITION
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[44px] tracking-[0.1em] leading-tight">
              {academyMasterclass.title.toUpperCase()}
            </h2>
            <div className="font-script italic text-[#8a7656] text-[20px] md:text-[24px] mt-1">
              {academyMasterclass.duration} &middot; {academyMasterclass.date}
            </div>

            <p className="mt-6 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.85] max-w-[560px]">
              {academyMasterclass.description}
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-[560px]">
              {academyMasterclass.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[#4a4742] text-[14px] font-serif-body"
                >
                  <Award size={14} strokeWidth={1.25} className="mt-1 text-[#b8a17a] flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <div className="font-display text-[#6b6760] text-[10px] tracking-[0.32em] uppercase">
                  Masterclass Fee
                </div>
                <div className="font-script italic text-[#2a2a2a] text-[24px] mt-0.5">
                  {academyMasterclass.fee}
                </div>
              </div>
              <a
                href="#register"
                className="inline-flex items-center gap-2 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-6 py-2.5 text-[11px] tracking-[0.3em] uppercase font-display"
              >
                Reserve a Seat
                <ArrowUpRight size={13} strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STUDENT TESTIMONIALS ---------------- */}
      <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-28 text-center relative">
        <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
          OUR ALUMNI
        </div>
        <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.16em]">
          STUDENT STORIES
        </h2>
        <div className="font-script italic text-[#3a3a3a] text-[22px] md:text-[26px] -mt-1">
          the careers we have launched
        </div>

        <div className="mt-14 max-w-[760px] mx-auto relative">
          <div className="border border-[#ece6da] bg-white p-8 md:p-12">
            <div className="flex flex-col items-center">
              <OptimizedImage
                src={student.avatar}
                alt={student.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-1 ring-[#ece6da]"
              />
              <p className="mt-7 font-script italic text-[#3a3a3a] text-[20px] md:text-[24px] leading-[1.6]">
                &ldquo;{student.quote}&rdquo;
              </p>
              <div className="mt-7 font-display text-[#2a2a2a] text-[14px] tracking-[0.3em] uppercase">
                {student.name}
              </div>
              <div className="font-script italic text-[#8a7656] text-[15px] mt-1">{student.role}</div>
            </div>
          </div>

          {/* dots */}
          <div className="mt-6 flex justify-center items-center gap-2">
            {academyStudents.map((_, i) => (
              <button
                key={i}
                onClick={() => setStudentIdx(i)}
                aria-label={`Student ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === studentIdx ? 'bg-[#2a2a2a]' : 'bg-[#cbbfa9]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 text-[#6b6760] hover:text-[#2a2a2a] transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={26} strokeWidth={1.1} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 text-[#6b6760] hover:text-[#2a2a2a] transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={26} strokeWidth={1.1} />
          </button>
        </div>
      </section>

      {/* ---------------- REGISTRATION FORM ---------------- */}
      <section id="register" className="w-full bg-[#fafaf6] border-t border-[#ece6da]">
        <div className="max-w-[1080px] mx-auto px-6 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <div className="font-display text-[#6b6760] text-[11px] tracking-[0.42em] mb-3">
              REGISTER INTEREST
            </div>
            <h2 className="font-display text-[#2a2a2a] text-[30px] md:text-[40px] tracking-[0.14em] leading-tight">
              BEGIN YOUR
            </h2>
            <div className="font-script italic text-[#3a3a3a] text-[28px] md:text-[34px] -mt-1">
              journey with us
            </div>
            <p className="mt-7 text-[#4a4742] text-[15px] md:text-[16px] font-serif-body leading-[1.85]">
              Share your details and our admissions team will reach out within
              24 hours with batch options, syllabus details and a private
              studio visit invitation.
            </p>

            <ul className="mt-7 space-y-3 text-[#4a4742] text-[14px] font-serif-body">
              <li className="flex items-center gap-3">
                <Calendar size={14} strokeWidth={1.25} className="text-[#b8a17a]" />
                Studio visits available Tue ? Sat, 11am ? 6pm
              </li>
              <li className="flex items-center gap-3">
                <Users size={14} strokeWidth={1.25} className="text-[#b8a17a]" />
                Small batches of 8 to 12 students
              </li>
              <li className="flex items-center gap-3">
                <Award size={14} strokeWidth={1.25} className="text-[#b8a17a]" />
                Government-recognised certificate
              </li>
            </ul>
          </div>

          <div className="md:col-span-7">
            <form
              onSubmit={onSubmit}
              className="bg-white border border-[#ece6da] p-7 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <div className="sm:col-span-2">
                <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-[#6b6760] mb-2">
                  Full Name *
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
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={onChange('phone')}
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
                  Interested Course
                </label>
                <select
                  value={form.course}
                  onChange={onChange('course')}
                  className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 text-[15px] font-serif-body text-[#2a2a2a] focus:border-[#2a2a2a] focus:outline-none transition-colors"
                >
                  <option value="">Select a course</option>
                  {academyCourses.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                  <option value="masterclass">Airbrush Masterclass</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block font-display text-[10px] tracking-[0.3em] uppercase text-[#6b6760] mb-2">
                  Tell us a little about yourself
                </label>
                <textarea
                  rows="3"
                  value={form.message}
                  onChange={onChange('message')}
                  className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 text-[15px] font-serif-body text-[#2a2a2a] focus:border-[#2a2a2a] focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3">
                {submitted ? (
                  <div className="font-script italic text-[#2a7a3a] text-[16px]">
                    Thank you ? we&apos;ll be in touch within 24 hours.
                  </div>
                ) : (
                  <div className="text-[#6b6760] text-[12px] italic font-serif-body">
                    We&apos;ll never share your details. Promise.
                  </div>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 border border-[#6b6760] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white transition-colors duration-500 px-7 py-3 text-[11px] tracking-[0.32em] uppercase font-display"
                >
                  Submit Enquiry
                  <ArrowUpRight size={13} strokeWidth={1.25} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AcademyPage;
