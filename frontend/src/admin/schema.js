// The editor schema: which parts of the website can be edited, organised the
// way the client sees her site (page by page), with plain-language labels.
//
// Section kinds (shape of the saved document):
//   object     — one thing with named fields
//   collection — a list of things (cards, reviews, courses...)
//   images     — a list of photos
//   image      — a single photo
//   text       — a single line or paragraph of text
//
// Field types the editor can render: text, textarea, image, select, list
// (lines of text), items (a list inside a section), group (an inset box of
// fields), hidden (kept in the data but never shown).
import defaults from '../content/defaults.json';

// Prefer live CMS content if it has already loaded (see src/index.js), so a
// category renamed/added in the admin shows up here too — falls back to
// defaults.json before the CMS bootstrap has loaded.
const liveContent = typeof window !== 'undefined' ? window.__LUSH_CMS__ || {} : {};
const currentPortfolioCategories = liveContent.portfolioCategories || defaults.portfolioCategories;

const portfolioCategoryOptions = currentPortfolioCategories
  .filter((category) => category.id !== 'all')
  .map((category) => ({ value: category.id, label: category.label }));

export const sitePages = [
  {
    id: 'home',
    label: 'Home Page',
    description: 'The first page visitors see',
    sections: [
      {
        key: 'homeHero',
        label: 'Top Banner',
        help: 'The big headline at the very top of your website',
        kind: 'object',
        fields: [
          { key: 'headline', label: 'Big Headline', type: 'text' },
          { key: 'subheadline', label: 'Line Under the Headline', type: 'textarea' },
          { key: 'philosophy', label: 'Your Philosophy Paragraph', type: 'textarea', help: 'Shown further down the page, next to the philosophy photo' },
          { key: 'differentiators', label: 'Why Brides Choose You', type: 'list', itemLabel: 'Point' },
        ],
      },
      { key: 'heroImage', label: 'Main Photo', help: 'The large photo at the top of the home page', kind: 'image' },
      { key: 'elevatedImage', label: 'Second Photo', help: 'The full-width photo below the main banner', kind: 'image' },
      {
        key: 'destinationImages',
        label: 'Destination Photos',
        help: 'The two photos in the destination weddings section',
        kind: 'object',
        fields: [
          { key: 'left', label: 'Left Photo', type: 'image' },
          { key: 'right', label: 'Right Photo', type: 'image' },
        ],
      },
      { key: 'meetFounderImage', label: 'Founder Photo', help: 'Your photo in the "Meet the Founder" section', kind: 'image' },
      {
        key: 'founderAccordions',
        label: 'Meet the Founder',
        help: 'The expandable story sections next to your photo',
        kind: 'collection',
        itemNoun: 'Story Section',
        titleField: 'title',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'content', label: 'Text', type: 'textarea' },
        ],
      },
      { key: 'philosophyImage', label: 'Philosophy Photo', help: 'The photo next to your philosophy paragraph', kind: 'image' },
      {
        key: 'curatedPoints',
        label: 'Highlight Points',
        help: 'The short trust points shown beside the curated photo',
        kind: 'collection',
        itemNoun: 'Point',
        titleField: 'strong',
        fields: [
          { key: 'strong', label: 'Bold Lead Words', type: 'text' },
          { key: 'rest', label: 'Rest of the Sentence', type: 'textarea' },
        ],
      },
      { key: 'curatedImage', label: 'Highlights Photo', help: 'The photo next to the highlight points', kind: 'image' },
      {
        key: 'testimonials',
        label: 'Client Reviews',
        help: 'What your brides say — shown on the home page',
        kind: 'collection',
        itemNoun: 'Review',
        titleField: 'author',
        fields: [
          { key: 'quote', label: 'What They Said', type: 'textarea' },
          { key: 'author', label: 'Name & City', type: 'text' },
        ],
      },
      { key: 'testimonialBgImage', label: 'Reviews Background Photo', help: 'The photo behind the client reviews', kind: 'image' },
      { key: 'portfolioImages', label: 'Home Gallery Photos', help: 'The row of portfolio photos on the home page', kind: 'images', itemNoun: 'Photo' },
      { key: 'instagramPosts', label: 'Instagram Photos', help: 'The three photos in the Instagram section', kind: 'images', itemNoun: 'Photo' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Your services and prices',
    sections: [
      {
        key: 'servicesBanner',
        label: 'Page Banner',
        help: 'The heading at the top of the services page',
        kind: 'object',
        fields: [
          { key: 'image', label: 'Banner Photo', type: 'image' },
          { key: 'eyebrow', label: 'Small Line Above the Title', type: 'text' },
          { key: 'title', label: 'Page Title', type: 'text' },
          { key: 'subtitle', label: 'Line Under the Title', type: 'text' },
          { key: 'quote', label: 'Quote', type: 'textarea' },
        ],
      },
      {
        key: 'servicesList',
        label: 'Service Cards',
        help: 'Each card is one service with its price',
        kind: 'collection',
        itemNoun: 'Service',
        titleField: 'name',
        fields: [
          { key: 'id', type: 'hidden' },
          { key: 'name', label: 'Service Name', type: 'text' },
          { key: 'subtitle', label: 'Small Line Under the Name', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'bullets', label: "What's Included", type: 'list', itemLabel: 'Line' },
          { key: 'priceLabel', label: 'Price Label', type: 'text', help: 'For example: Starting price' },
          { key: 'price', label: 'Price', type: 'text' },
          { key: 'note', label: 'Extra Note', type: 'textarea' },
          { key: 'image', label: 'Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    description: 'Your bridal photo gallery',
    sections: [
      {
        key: 'portfolioBanner',
        label: 'Page Banner',
        help: 'The heading at the top of the portfolio page',
        kind: 'object',
        fields: [
          { key: 'eyebrow', label: 'Small Line Above the Title', type: 'text' },
          { key: 'title', label: 'Page Title', type: 'text' },
          { key: 'subtitle', label: 'Line Under the Title', type: 'text' },
          { key: 'quote', label: 'Quote', type: 'textarea' },
        ],
      },
      {
        key: 'portfolioCategories',
        label: 'Filter Buttons',
        help: 'The category buttons brides use to filter your gallery (e.g. Bridal, Reception). Renaming one here changes its button text everywhere. To add a brand-new category, also give each photo that category further down.',
        kind: 'collection',
        itemNoun: 'Category',
        titleField: 'label',
        fields: [
          { key: 'id', type: 'hidden' },
          { key: 'label', label: 'Button Text', type: 'text' },
        ],
      },
      {
        key: 'portfolioWorks',
        label: 'Bride Gallery',
        help: 'The photos in your portfolio grid',
        kind: 'collection',
        itemNoun: 'Bride Photo',
        titleField: 'title',
        fields: [
          { key: 'id', type: 'hidden' },
          { key: 'image', label: 'Photo', type: 'image' },
          { key: 'title', label: 'Bride Name', type: 'text' },
          { key: 'location', label: 'City / Place', type: 'text' },
          {
            key: 'category',
            label: 'Category',
            type: 'select',
            options: portfolioCategoryOptions,
            help: 'Which filter button shows this photo',
          },
          { key: 'catLabel', label: 'Small Label on the Photo', type: 'text', help: 'For example: Traditional Bridal' },
          {
            key: 'span',
            label: 'Photo Shape',
            type: 'select',
            options: [
              { value: 'tall', label: 'Tall' },
              { value: 'square', label: 'Square' },
              { value: 'wide', label: 'Wide' },
            ],
          },
          { key: 'year', label: 'Year', type: 'text' },
        ],
      },
      {
        key: 'portfolioFeatured',
        label: 'Featured Story',
        help: 'The one bride story highlighted at the bottom',
        kind: 'object',
        fields: [
          { key: 'image', label: 'Photo', type: 'image' },
          { key: 'eyebrow', label: 'Small Line Above the Title', type: 'text' },
          { key: 'title', label: 'Bride Name', type: 'text' },
          { key: 'subtitle', label: 'Short Description', type: 'text' },
          { key: 'excerpt', label: 'Story Text', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'academy',
    label: 'Academy',
    description: 'Your makeup courses and classes',
    sections: [
      {
        key: 'academyBanner',
        label: 'Page Banner',
        help: 'The heading at the top of the academy page',
        kind: 'object',
        fields: [
          { key: 'eyebrow', label: 'Small Line Above the Title', type: 'text' },
          { key: 'title', label: 'Page Title', type: 'text' },
          { key: 'subtitle', label: 'Line Under the Title', type: 'textarea' },
          { key: 'quote', label: 'Quote', type: 'textarea' },
          { key: 'image', label: 'Banner Photo', type: 'image' },
        ],
      },
      {
        key: 'academyStats',
        label: 'Quick Facts',
        help: 'The short numbers shown on the academy page',
        kind: 'collection',
        itemNoun: 'Fact',
        titleField: 'l',
        fields: [
          { key: 'v', label: 'Number / Value', type: 'text', help: 'For example: 200+' },
          { key: 'l', label: 'What It Means', type: 'text', help: 'For example: Artists Trained' },
        ],
      },
      {
        key: 'academyCourses',
        label: 'Courses',
        help: 'Each card is one course with its fee',
        kind: 'collection',
        itemNoun: 'Course',
        titleField: 'name',
        fields: [
          { key: 'id', type: 'hidden' },
          { key: 'image', label: 'Photo', type: 'image', help: 'Shown beside this course — photos alternate left/right down the page automatically' },
          { key: 'level', label: 'Course Number', type: 'text', help: 'For example: 01' },
          { key: 'name', label: 'Course Name', type: 'text' },
          { key: 'duration', label: 'How Long', type: 'text' },
          { key: 'sessions', label: 'Sessions', type: 'text' },
          { key: 'fee', label: 'Fee', type: 'text' },
          { key: 'earlyBird', label: 'Early-Bird Fee', type: 'text' },
          { key: 'tagline', label: 'One-Line Summary', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'modules', label: 'What Students Learn', type: 'list', itemLabel: 'Topic' },
        ],
      },
      {
        key: 'academyBatches',
        label: 'Upcoming Batches',
        help: 'The batch dates shown on the academy page',
        kind: 'collection',
        itemNoun: 'Batch',
        titleField: 'course',
        fields: [
          { key: 'course', label: 'Course Name', type: 'text' },
          { key: 'start', label: 'When It Starts', type: 'text' },
          { key: 'seats', label: 'Seats', type: 'text' },
          { key: 'mode', label: 'Where', type: 'text' },
        ],
      },
      {
        key: 'academyStudents',
        label: 'Student Reviews',
        help: 'What your students say',
        kind: 'collection',
        itemNoun: 'Review',
        titleField: 'name',
        fields: [
          { key: 'quote', label: 'What They Said', type: 'textarea' },
          { key: 'name', label: 'Student Name', type: 'text' },
          { key: 'role', label: 'Course & Year', type: 'text' },
          { key: 'avatar', label: 'Photo', type: 'image' },
        ],
      },
      {
        key: 'academyFaqs',
        label: 'Common Questions',
        help: 'The FAQ list on the academy page',
        kind: 'collection',
        itemNoun: 'Question',
        titleField: 'q',
        fields: [
          { key: 'q', label: 'Question', type: 'text' },
          { key: 'a', label: 'Answer', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'About Me',
    description: 'Your story, milestones and team',
    sections: [
      {
        key: 'aboutFounder',
        label: 'Your Profile',
        help: 'Your name, photos and introduction',
        kind: 'object',
        fields: [
          { key: 'name', label: 'Short Name', type: 'text' },
          { key: 'fullName', label: 'Full Name', type: 'text' },
          { key: 'role', label: 'Your Title', type: 'text' },
          { key: 'portrait', label: 'Portrait Photo', type: 'image' },
          { key: 'workingShot', label: 'Working Photo', type: 'image' },
          { key: 'greeting', label: 'Greeting Line', type: 'textarea' },
          { key: 'intro', label: 'Short Introduction', type: 'textarea' },
        ],
      },
      {
        key: 'aboutStory',
        label: 'Your Story',
        help: 'The chapters of your journey',
        kind: 'collection',
        itemNoun: 'Chapter',
        titleField: 'title',
        fields: [
          { key: 'title', label: 'Chapter Title', type: 'text' },
          { key: 'body', label: 'Chapter Text', type: 'textarea' },
        ],
      },
      {
        key: 'aboutMilestones',
        label: 'Milestones',
        help: 'Your timeline, year by year',
        kind: 'collection',
        itemNoun: 'Milestone',
        titleField: 'year',
        fields: [
          { key: 'year', label: 'Year', type: 'text' },
          { key: 'label', label: 'What Happened', type: 'text' },
        ],
      },
      {
        key: 'aboutCredentials',
        label: 'Certificates & Awards',
        help: 'Your qualifications, shown as small cards',
        kind: 'collection',
        itemNoun: 'Credential',
        titleField: 'title',
        fields: [
          {
            key: 'icon',
            label: 'Small Icon',
            type: 'select',
            options: [
              { value: 'award', label: 'Award Ribbon' },
              { value: 'star', label: 'Star' },
              { value: 'users', label: 'People' },
              { value: 'sparkles', label: 'Sparkles' },
            ],
          },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'sub', label: 'Small Line Under It', type: 'text' },
        ],
      },
      { key: 'aboutPullQuote', label: 'Quote Line', help: 'The one big quote on the about page', kind: 'text' },
      {
        key: 'aboutTeam',
        label: 'Your Team',
        help: 'The people shown in the team section',
        kind: 'collection',
        itemNoun: 'Team Member',
        titleField: 'name',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'image', label: 'Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Phone, WhatsApp, address, hours and FAQs',
    sections: [
      {
        key: 'contactInfo',
        label: 'Contact Details',
        help: 'Everything shown on the contact page',
        kind: 'object',
        fields: [
          { key: 'eyebrow', label: 'Small Line Above the Title', type: 'text' },
          { key: 'title', label: 'Page Title', type: 'text' },
          { key: 'subtitle', label: 'Line Under the Title', type: 'textarea' },
          { key: 'greeting', label: 'Welcome Paragraph', type: 'textarea' },
          { key: 'studioImage', label: 'Studio Photo', type: 'image' },
          {
            key: 'channels',
            label: 'Ways to Reach You',
            type: 'items',
            itemNoun: 'Contact Method',
            titleField: 'label',
            fields: [
              { key: 'key', type: 'hidden' },
              { key: 'label', label: 'Name', type: 'text', help: 'For example: By Phone' },
              { key: 'value', label: 'Number / Handle', type: 'text' },
              { key: 'hint', label: 'Small Note', type: 'text' },
              { key: 'href', label: 'Link When Tapped', type: 'text', inputMode: 'url', help: 'For example: tel:+91... or https://wa.me/91...' },
            ],
          },
          {
            key: 'studio',
            label: 'Studio Address',
            type: 'group',
            fields: [
              { key: 'line1', label: 'Line 1', type: 'text' },
              { key: 'line2', label: 'Line 2', type: 'text' },
              { key: 'line3', label: 'Line 3', type: 'text' },
              { key: 'state', label: 'State', type: 'text' },
            ],
          },
          {
            key: 'hours',
            label: 'Opening Hours',
            type: 'items',
            itemNoun: 'Time Slot',
            titleField: 'day',
            fields: [
              { key: 'day', label: 'Day(s)', type: 'text' },
              { key: 'time', label: 'Time', type: 'text' },
            ],
          },
          {
            key: 'faqs',
            label: 'Common Questions',
            type: 'items',
            itemNoun: 'Question',
            titleField: 'q',
            fields: [
              { key: 'q', label: 'Question', type: 'text' },
              { key: 'a', label: 'Answer', type: 'textarea' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'inquire',
    label: 'Enquiry Form',
    description: 'The form brides fill to reach you',
    sections: [
      {
        key: 'inquireConfig',
        label: 'Enquiry Page',
        help: 'The text and choices on the enquiry form',
        kind: 'object',
        fields: [
          { key: 'eyebrow', label: 'Small Line Above the Title', type: 'text' },
          { key: 'title', label: 'Page Title', type: 'text' },
          { key: 'subtitle', label: 'Line Under the Title', type: 'text' },
          { key: 'intro', label: 'Welcome Paragraph', type: 'textarea' },
          { key: 'heroImage', label: 'Page Photo', type: 'image' },
          { key: 'occasions', label: 'Occasion Choices', type: 'list', itemLabel: 'Choice', help: 'The options brides pick from' },
          { key: 'hearAbout', label: '"How Did You Hear About Us" Choices', type: 'list', itemLabel: 'Choice' },
          { key: 'promises', label: 'Your Promises', type: 'list', itemLabel: 'Promise', help: 'Shown next to the form' },
        ],
      },
    ],
  },
  {
    id: 'business',
    label: 'Business Details',
    description: 'Your studio name, contacts and Google info',
    sections: [
      {
        key: 'navLinks',
        label: 'Menu Links',
        help: 'The navigation menu shown at the top of every page, in order',
        kind: 'collection',
        itemNoun: 'Menu Link',
        titleField: 'label',
        fields: [
          { key: 'label', label: 'Menu Text', type: 'text' },
          { key: 'href', label: 'Links To', type: 'text', help: 'A page on your site, e.g. /services, /portfolio, /contact' },
        ],
      },
      {
        key: 'settings',
        label: 'Studio Details',
        help: 'Your main business information',
        kind: 'object',
        fields: [
          { key: 'businessName', label: 'Business Name', type: 'text' },
          { key: 'phone', label: 'Phone Number', type: 'text', inputMode: 'tel' },
          { key: 'email', label: 'Email', type: 'text', inputMode: 'email' },
          { key: 'whatsapp', label: 'WhatsApp Number', type: 'text', inputMode: 'tel' },
          { key: 'instagram', label: 'Instagram Handle', type: 'text' },
          { key: 'address', label: 'Address', type: 'textarea' },
          { key: 'workingHours', label: 'Working Hours', type: 'text' },
          { key: 'logo', type: 'hidden' },
          { key: 'favicon', label: 'Browser Tab Icon', type: 'image', help: 'Small square image shown in the browser tab. Upload a square photo or logo — it will be used as-is.' },
        ],
      },
      {
        key: 'brandInfo',
        label: 'Name & Instagram Numbers',
        help: 'Shown in the header, footer and Instagram section',
        kind: 'object',
        fields: [
          { key: 'name', label: 'Studio Name (as shown on the site)', type: 'text' },
          { key: 'tagline', label: 'Tagline', type: 'text' },
          { key: 'subtitle', label: 'One-Line Description', type: 'textarea' },
          { key: 'description', label: 'Footer Description', type: 'textarea' },
          { key: 'instagram', label: 'Instagram Handle', type: 'text' },
          { key: 'instagramUrl', label: 'Instagram Link', type: 'text', inputMode: 'url' },
          { key: 'posts', label: 'Instagram Posts Count', type: 'text' },
          { key: 'followers', label: 'Followers Count', type: 'text' },
          { key: 'following', label: 'Following Count', type: 'text' },
        ],
      },
      {
        key: 'seo',
        label: 'Google & Sharing',
        help: 'How your site appears on Google and when shared',
        kind: 'object',
        fields: [
          { key: 'title', label: 'Title on Google', type: 'text' },
          { key: 'description', label: 'Description on Google', type: 'textarea' },
          { key: 'keywords', label: 'Search Words', type: 'list', itemLabel: 'Word' },
          { key: 'canonical', type: 'hidden' },
          { key: 'ogImage', label: 'Photo When Shared', type: 'image' },
        ],
      },
    ],
  },
];

export function getPage(pageId) {
  return sitePages.find((page) => page.id === pageId) || null;
}

export function getSection(pageId, sectionKey) {
  const page = getPage(pageId);
  if (!page) return null;
  return page.sections.find((section) => section.key === sectionKey) || null;
}

// A short human summary of a section's current content, for the section list.
export function summarizeSection(section, payload) {
  if (payload === undefined || payload === null) return '';
  if (section.kind === 'image') return '';
  if (section.kind === 'text') return String(payload);
  if (section.kind === 'images') return `${payload.length} photo${payload.length === 1 ? '' : 's'}`;
  if (section.kind === 'collection') {
    const noun = (section.itemNoun || 'item').toLowerCase();
    return `${payload.length} ${noun}${payload.length === 1 ? '' : 's'}`;
  }
  const firstText = (section.fields || [])
    .filter((field) => field.type === 'text' || field.type === 'textarea')
    .map((field) => payload[field.key])
    .find((value) => typeof value === 'string' && value.trim());
  return firstText || '';
}

// The first image in a section's payload, used as a thumbnail in lists.
export function sectionThumbnail(section, payload) {
  if (payload === undefined || payload === null) return '';
  if (section.kind === 'image') return payload;
  if (section.kind === 'images') return payload[0] || '';
  if (section.kind === 'object') {
    const imageField = (section.fields || []).find((field) => field.type === 'image');
    return imageField ? payload[imageField.key] || '' : '';
  }
  if (section.kind === 'collection') {
    const imageField = (section.fields || []).find((field) => field.type === 'image');
    if (!imageField || !payload.length) return '';
    return payload[0][imageField.key] || '';
  }
  return '';
}
