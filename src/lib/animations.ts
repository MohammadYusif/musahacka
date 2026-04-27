export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
} as const;

export const EASE = {
  default: [0.25, 0.1, 0.25, 1],
  out: [0.16, 1, 0.3, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 },
  gentle: { type: "spring", stiffness: 200, damping: 25 },
} as const;

export const stagger = (delay = 0.08) => ({
  animate: {
    transition: { staggerChildren: delay },
  },
});

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
};

export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2, transition: EASE.spring },
};
