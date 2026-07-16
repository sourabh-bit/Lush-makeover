// Site content resolver: uses live CMS content when available,
// otherwise falls back to the defaults in content/defaults.json.
// content/defaults.json is the single source of truth for default content —
// the backend seeds the database from the same file.
import defaults from './content/defaults.json';

const cms = typeof window !== 'undefined' ? window.__LUSH_CMS__ || {} : {};
const pick = (key) => (cms[key] !== undefined ? cms[key] : defaults[key]);

export const brandInfo = pick('brandInfo');
export const navLinks = pick('navLinks');
export const heroImage = pick('heroImage');
export const homeHero = pick('homeHero');
export const elevatedImage = pick('elevatedImage');
export const destinationImages = pick('destinationImages');
export const meetFounderImage = pick('meetFounderImage');
export const philosophyImage = pick('philosophyImage');
export const curatedImage = pick('curatedImage');
export const testimonialBgImage = pick('testimonialBgImage');
export const portfolioImages = pick('portfolioImages');
export const blogPosts = pick('blogPosts');
export const founderAccordions = pick('founderAccordions');
export const curatedPoints = pick('curatedPoints');
export const testimonials = pick('testimonials');
export const instagramPosts = pick('instagramPosts');

export const servicesBanner = pick('servicesBanner');
export const servicesList = pick('servicesList');

export const portfolioBanner = pick('portfolioBanner');
export const portfolioCategories = pick('portfolioCategories');
export const portfolioWorks = pick('portfolioWorks');
export const portfolioFeatured = pick('portfolioFeatured');

export const academyBanner = pick('academyBanner');
export const academyStats = pick('academyStats');
export const academyCourses = pick('academyCourses');
export const academyBatches = pick('academyBatches');
export const academyMasterclass = pick('academyMasterclass');
export const academyStudents = pick('academyStudents');
export const academyFaqs = pick('academyFaqs') || [];

export const aboutFounder = pick('aboutFounder');
export const aboutStory = pick('aboutStory');
export const aboutMilestones = pick('aboutMilestones');
export const aboutCredentials = pick('aboutCredentials');
export const aboutPullQuote = pick('aboutPullQuote');
export const aboutTeam = pick('aboutTeam');

export const contactInfo = pick('contactInfo');
export const inquireConfig = pick('inquireConfig');

export const siteSettings = pick('settings') || {};
export const seoSettings = pick('seo') || {};

export default cms;
