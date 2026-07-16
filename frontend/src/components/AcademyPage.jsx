import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';
import { apiFetch } from '@/lib/api';
import {
  pageTransition as pageVariants,
  heroStagger,
  staggerContainer,
  staggerItem,
  blurItem,
  curtainLeft,
  curtainImage,
  viewportOnce,
  viewportSoon,
} from './motion';
import {
  academyBanner,
  academyStats,
  academyCourses,
  academyBatches,
  academyMasterclass,
  academyStudents,
  academyFaqs,
} from '../mock';
import {
  ArrowUpRight,
  Calendar,
  Users,
  Clock,
  Award,
  ChevronDown,
  Check,
  Sparkles,
  Camera,
  BookOpen,
  GraduationCap,
  BadgeCheck,
  Briefcase,
  Scissors,
  Star,
  Diamond,
} from 'lucide-react';
const faqItems = academyFaqs;

const batchCards = academyBatches.map((batch) => ({ title: batch.course, date: batch.start, seats: batch.seats, note: batch.mode }));

const AcademyPage = () => {
  const [studentIdx, setStudentIdx] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', course: '', batch: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [openCourse, setOpenCourse] = useState('masterclass');
  const [openFaq, setOpenFaq] = useState(0);

  const onChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || sending) return;
    setSending(true);
    setError('');
    const lines = [
      form.course && `Course: ${form.course}`,
      form.batch && `Preferred batch: ${form.batch}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);
    try {
      await apiFetch('/api/contact', {
        method: 'POST',
        body: {
          name: form.name,
          phone: form.phone,
          message: lines.join('\n') || 'Consultation request',
          category: 'academy',
        },
      });
      setSubmitted(true);
      setForm({ name: '', phone: '', course: '', batch: '', message: '' });
    } catch {
      setError('Something went wrong. Please try again, or reach us on WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  const prev = () => setStudentIdx((studentIdx - 1 + academyStudents.length) % academyStudents.length);
  const next = () => setStudentIdx((studentIdx + 1) % academyStudents.length);
  const student = academyStudents[studentIdx];
  const featuredCourse = academyCourses[0];

  return (
    <motion.main className="w-full bg-white" initial="hidden" animate="visible" variants={pageVariants}>
      <section className="relative overflow-hidden border-b border-[#ece6da]">
        <div className="relative min-h-[520px] md:min-h-[680px]">
          <motion.div className="absolute inset-0" initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
            <OptimizedImage src={academyBanner.image} alt={academyBanner.title} className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-white/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-white/90" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1080px] flex-col justify-center px-6 py-24 md:px-8 md:py-28">
            <motion.div className="max-w-[760px] text-center md:text-left" variants={heroStagger} initial="hidden" animate="visible">
              <motion.div variants={staggerItem} className="font-display text-[11px] uppercase tracking-[0.5em] text-[#8b7f72] md:text-[12px]">{academyBanner.eyebrow}</motion.div>
              <motion.h1 variants={blurItem} className="mt-4 font-display text-[40px] leading-none tracking-[0.18em] text-[#2a2a2a] sm:text-[56px] md:text-[74px]">{academyBanner.title}</motion.h1>
              <motion.p variants={staggerItem} className="mt-5 max-w-[820px] font-serif-body text-[15px] leading-[1.9] text-[#4a4742] md:text-[17px]">{academyBanner.subtitle}</motion.p>
              <motion.div variants={staggerItem} className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <a href="#courses" className="inline-flex items-center gap-2 border border-[#6b6760] bg-white/70 px-6 py-3 font-display text-[11px] uppercase tracking-[0.3em] text-[#2a2a2a] transition-colors duration-500 hover:bg-[#2a2a2a] hover:text-white">Explore Courses <ArrowUpRight size={13} strokeWidth={1.25} /></a>
                <a href="#consultation" className="inline-flex items-center gap-2 border border-[#d7cdb8] bg-[#fbfaf6] px-6 py-3 font-display text-[11px] uppercase tracking-[0.3em] text-[#2a2a2a] transition-colors duration-500 hover:bg-white">Book Consultation</a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-4 px-6 py-10 md:grid-cols-4 md:gap-8 md:px-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSoon}>
          {academyStats.map((item) => (
            <motion.div variants={staggerItem} key={item.l} className="text-center md:border-r md:border-[#ece6da] last:border-r-0">
              <div className="font-script text-[28px] italic leading-none text-[#2a2a2a] md:text-[34px]">{item.v}</div>
              <div className="mt-2 font-display text-[10px] uppercase tracking-[0.32em] text-[#6b6760] md:text-[11px]">{item.l}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 md:items-center md:gap-16 md:px-8 md:py-32">
        <motion.div className="md:col-span-5" initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div className="overflow-hidden" variants={curtainLeft}>
            <motion.div variants={curtainImage}>
              <OptimizedImage src={featuredCourse.image || 'https://images.pexels.com/photos/37710473/pexels-photo-37710473.jpeg'} alt="Professional Bridal Masterclass" className="h-[420px] w-full object-cover md:h-[560px]" />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="md:col-span-7" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSoon}>
          <motion.div variants={staggerItem} className="font-display text-[11px] uppercase tracking-[0.42em] text-[#6b6760]">Featured Masterclass</motion.div>
          <motion.div variants={staggerItem} className="mt-4 flex items-end gap-4">
            <div className="font-script text-[40px] italic leading-none text-[#2a2a2a] md:text-[60px]">01</div>
            <div>
              <h2 className="font-display text-[30px] uppercase tracking-[0.12em] text-[#2a2a2a] md:text-[46px] leading-tight">{academyMasterclass.title}</h2>
              <div className="mt-1 font-script text-[20px] italic text-[#8a7656] md:text-[26px]">{academyMasterclass.duration}</div>
            </div>
          </motion.div>
          <motion.p variants={staggerItem} className="mt-7 max-w-[700px] font-serif-body text-[15px] leading-[1.9] text-[#4a4742] md:text-[16px]">{academyMasterclass.description}</motion.p>
          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-[#ece6da] bg-[#fbfaf6] px-4 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-[#6b6760]">Duration: 5 Days</div>
            <div className="rounded-full border border-[#ece6da] bg-[#fbfaf6] px-4 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-[#6b6760]">Price: ₹{academyMasterclass.fee}</div>
            <div className="rounded-full border border-[#ece6da] bg-[#fbfaf6] px-4 py-2 font-display text-[10px] uppercase tracking-[0.3em] text-[#8a7656]">Early-bird ₹{academyMasterclass.earlyBird}</div>
          </motion.div>
          <motion.div variants={staggerContainer} className="mt-8 grid gap-3 sm:grid-cols-2">
            {academyMasterclass.highlights.slice(0, 6).map((item) => (
              <motion.div variants={staggerItem} key={item} className="flex items-start gap-3 rounded-sm border border-[#ece6da] bg-[#fbfaf6] p-4">
                <Check size={15} strokeWidth={1.75} className="mt-1 flex-shrink-0 text-[#b8a17a]" />
                <span className="font-serif-body text-[14px] leading-[1.7] text-[#4a4742]">{item}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
            <a href="#consultation" className="inline-flex items-center gap-2 border border-[#6b6760] px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.3em] text-[#2a2a2a] transition-colors duration-500 hover:bg-[#2a2a2a] hover:text-white">Book Consultation</a>
            <a href="#batches" className="inline-flex items-center gap-2 border border-[#d7cdb8] px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.3em] text-[#2a2a2a] transition-colors duration-500 hover:bg-[#fbfaf6]">View Batches</a>
          </motion.div>
        </motion.div>
      </section>


      <section id="batches" className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-32">
        <motion.div className="text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSoon}>
          <motion.div variants={staggerItem} className="font-display text-[11px] uppercase tracking-[0.42em] text-[#6b6760]">Upcoming Batches</motion.div>
          <motion.h2 variants={blurItem} className="mt-3 font-display text-[30px] uppercase tracking-[0.16em] text-[#2a2a2a] md:text-[40px]">Availability</motion.h2>
        </motion.div>

        <motion.div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSoon}>
          {batchCards.map((batch) => (
            <motion.article variants={staggerItem} whileHover={{ y: -4 }} key={batch.title} className="border border-[#ece6da] bg-white p-6 md:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="font-display text-[20px] uppercase tracking-[0.1em] text-[#2a2a2a]">{batch.title}</div>
                <span className="rounded-full border border-[#e4cfb8] bg-[#fbfaf6] px-3 py-1 font-display text-[9px] uppercase tracking-[0.28em] text-[#8a7656]">Open</span>
              </div>
              <div className="mt-3 font-script text-[18px] italic text-[#8a7656]">{batch.date}</div>
              <p className="mt-5 font-serif-body text-[14px] leading-[1.8] text-[#4a4742]">{batch.note}</p>
              <div className="mt-6 flex items-center justify-between border-t border-[#ece6da] pt-5">
                <div>
                  <div className="font-display text-[10px] uppercase tracking-[0.32em] text-[#6b6760]">Seats</div>
                  <div className="mt-1 font-script text-[22px] italic text-[#2a2a2a]">{batch.seats}</div>
                </div>
                <a href="#consultation" className="inline-flex items-center gap-2 border border-[#6b6760] px-4 py-2 font-display text-[10px] uppercase tracking-[0.28em] text-[#2a2a2a] transition-colors hover:bg-[#2a2a2a] hover:text-white">Reserve Seat</a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="bg-[#fafaf6] border-y border-[#ece6da]">
        <motion.div className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-32 text-center relative" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSoon}>
          <motion.div variants={staggerItem} className="font-display text-[11px] uppercase tracking-[0.42em] text-[#6b6760]">Student Testimonials</motion.div>
          <motion.h2 variants={blurItem} className="mt-3 font-display text-[30px] uppercase tracking-[0.16em] text-[#2a2a2a] md:text-[40px]">Alumni Voices</motion.h2>
        </motion.div>

        <motion.div className="mx-auto -mt-10 grid max-w-[1080px] grid-cols-1 gap-5 px-6 pb-24 md:grid-cols-2 md:px-8 md:pb-32" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSoon}>
          {academyStudents.map((person) => (
            <motion.article variants={staggerItem} key={person.name} className="border border-[#ece6da] bg-white p-6 md:p-7">
              <div className="flex items-center gap-4">
                <OptimizedImage src={person.avatar} alt={person.name} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-1 text-[#c8a15c]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={1.3} />
                    ))}
                  </div>
                  <div className="mt-2 font-display text-[14px] uppercase tracking-[0.25em] text-[#2a2a2a]">{person.name}</div>
                  <div className="font-script text-[14px] italic text-[#8a7656]">{person.role}</div>
                </div>
              </div>
              <p className="mt-5 font-serif-body text-[14px] leading-[1.85] text-[#4a4742]">&ldquo;{person.quote}&rdquo;</p>
            </motion.article>
          ))}
        </motion.div>
      </section>
      <section className="mx-auto max-w-[1180px] px-6 py-24 md:px-8 md:py-32">
        <div className="text-center">
          <div className="font-display text-[11px] uppercase tracking-[0.42em] text-[#6b6760]">FAQ</div>
          <h2 className="mt-3 font-display text-[30px] uppercase tracking-[0.16em] text-[#2a2a2a] md:text-[40px]">Common Questions</h2>
        </div>

        <div className="mx-auto mt-14 max-w-[920px] space-y-3">
          {faqItems.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className="border border-[#ece6da] bg-white">
                <button onClick={() => setOpenFaq(open ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-7">
                  <span className="font-display text-[15px] uppercase tracking-[0.08em] text-[#2a2a2a] md:text-[18px]">{item.q}</span>
                  <ChevronDown size={16} strokeWidth={1.5} className={`text-[#8a7656] transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open ? (
                  <div className="border-t border-[#ece6da] px-5 py-5 md:px-7">
                    <p className="font-serif-body text-[14px] leading-[1.85] text-[#4a4742]">{item.a}</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section id="consultation" className="border-t border-[#ece6da] bg-[#fbfaf6]">
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-10 px-6 py-24 md:grid-cols-12 md:gap-16 md:px-8 md:py-32">
          <motion.div className="md:col-span-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportSoon}>
            <motion.div variants={staggerItem} className="font-display text-[11px] uppercase tracking-[0.42em] text-[#6b6760]">Consultation Form</motion.div>
            <motion.h2 variants={blurItem} className="mt-3 font-display text-[30px] uppercase tracking-[0.14em] text-[#2a2a2a] md:text-[40px] leading-tight">Book a Consultation</motion.h2>
            <motion.p variants={staggerItem} className="mt-7 max-w-[620px] font-serif-body text-[15px] leading-[1.9] text-[#4a4742] md:text-[16px]">Tell us what you want to learn and the team will guide you toward the right batch, timing and next step.</motion.p>
            <motion.p variants={staggerItem} className="mt-6 font-serif-body text-[12px] italic text-[#6b6760]">Private studio consults available by appointment.</motion.p>
          </motion.div>

          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSoon}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="border border-[#ece6da] bg-white p-10 text-center md:p-14">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d7cdb8] text-[#2a7a3a]">
                  <GraduationCap size={22} strokeWidth={1.25} />
                </span>
                <h3 className="mt-6 font-display text-[24px] tracking-[0.14em] text-[#2a2a2a] md:text-[30px]">
                  THANK YOU
                </h3>
                <div className="mt-1 font-script text-[22px] italic text-[#8a7656] md:text-[26px]">
                  your consultation is booked
                </div>
                <p className="mx-auto mt-5 max-w-[420px] font-serif-body text-[15px] leading-[1.85] text-[#4a4742]">
                  The academy team will call you within 24 hours to guide you
                  toward the right course and batch.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-2 border border-[#6b6760] px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.3em] text-[#2a2a2a] transition-colors duration-500 hover:bg-[#2a2a2a] hover:text-white"
                >
                  Book Another Consultation
                </button>
              </div>
            ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 border border-[#ece6da] bg-white p-7 md:grid-cols-2 md:p-10">
              <div>
                <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.3em] text-[#6b6760]">Name *</label>
                <input type="text" required value={form.name} onChange={onChange('name')} className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 font-serif-body text-[15px] text-[#2a2a2a] transition-colors focus:border-[#2a2a2a] focus:outline-none" />
              </div>
              <div>
                <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.3em] text-[#6b6760]">Phone *</label>
                <input type="tel" required value={form.phone} onChange={onChange('phone')} className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 font-serif-body text-[15px] text-[#2a2a2a] transition-colors focus:border-[#2a2a2a] focus:outline-none" />
              </div>
              <div>
                <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.3em] text-[#6b6760]">Course</label>
                <select value={form.course} onChange={onChange('course')} className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 font-serif-body text-[15px] text-[#2a2a2a] transition-colors focus:border-[#2a2a2a] focus:outline-none">
                  <option value="">Select a course</option>
                  {academyCourses.map((course) => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.3em] text-[#6b6760]">Preferred Batch</label>
                <select value={form.batch} onChange={onChange('batch')} className="w-full border-b border-[#d7cdb8] bg-transparent py-2.5 font-serif-body text-[15px] text-[#2a2a2a] transition-colors focus:border-[#2a2a2a] focus:outline-none">
                  <option value="">Select batch</option>
                  {batchCards.map((batch) => (
                    <option key={batch.title} value={batch.title}>{batch.title}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.3em] text-[#6b6760]">Message</label>
                <textarea rows="4" value={form.message} onChange={onChange('message')} className="w-full resize-none border-b border-[#d7cdb8] bg-transparent py-2.5 font-serif-body text-[15px] text-[#2a2a2a] transition-colors focus:border-[#2a2a2a] focus:outline-none" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
                {error ? (
                  <div className="font-serif-body text-[12px] leading-relaxed text-red-600">{error}</div>
                ) : (
                  <div className="font-serif-body text-[12px] italic text-[#6b6760]">We&apos;ll never share your details. Promise.</div>
                )}
                <button type="submit" disabled={sending} className="inline-flex items-center justify-center gap-2 border border-[#6b6760] px-7 py-3 font-display text-[11px] uppercase tracking-[0.32em] text-[#2a2a2a] transition-colors duration-500 hover:bg-[#2a2a2a] hover:text-white disabled:opacity-60">
                  {sending ? 'Sending…' : 'Book Consultation'}
                  <ArrowUpRight size={13} strokeWidth={1.25} />
                </button>
              </div>
            </form>
            )}
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[#ece6da] bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8 md:py-10">
          <div className="font-display text-[11px] uppercase tracking-[0.35em] text-[#6b6760]">Lush Makeovers Academy</div>
          <div className="font-serif-body text-[12px] text-[#6b6760]">Luxury bridal education with calm, practical mentorship.</div>
        </div>
      </footer>
    </motion.main>
  );
};

export default AcademyPage;






