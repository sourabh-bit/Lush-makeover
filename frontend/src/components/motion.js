// Shared animation vocabulary for the whole site.
// Everything uses the same easing so the site feels like one piece.
export const EASE = [0.22, 1, 0.36, 1];

export const pageTransition = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.28, ease: 'easeInOut' },
  },
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Slightly slower stagger for hero/banner text blocks.
export const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

// Soft fade-up with a touch of blur — for headings.
export const blurItem = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: EASE },
  },
};

// Curtain wipes for images: the frame un-clips while the photo inside
// settles from a gentle zoom. Pair with `curtainImage` on the inner wrapper.
const curtainVisible = {
  clipPath: 'inset(0% 0% 0% 0%)',
  transition: { duration: 1.05, ease: EASE },
};

export const curtainLeft = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  visible: curtainVisible,
};

export const curtainRight = {
  hidden: { clipPath: 'inset(0% 0% 0% 100%)' },
  visible: curtainVisible,
};

export const curtainUp = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: curtainVisible,
};

// The image inside a curtain settles from a gentle zoom.
export const curtainImage = {
  hidden: { scale: 1.14 },
  visible: {
    scale: 1,
    transition: { duration: 1.25, ease: EASE },
  },
};

// Thin decorative lines grow from their center.
export const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 },
  },
};

// Vertical timeline line grows downward.
export const lineGrowY = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.4, ease: EASE },
  },
};

// Standard viewport settings so reveals fire once, as soon as a section
// meaningfully enters the screen (low thresholds so tall blocks whose
// children stagger don't sit invisible waiting for more scroll).
export const viewportOnce = { once: true, amount: 0.15 };
export const viewportSoon = { once: true, amount: 0.05 };
