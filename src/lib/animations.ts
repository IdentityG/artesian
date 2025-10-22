export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2 },
}

export const slideInFromRight = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
  transition: { type: 'spring', damping: 20, stiffness: 300 },
}

export const slideInFromLeft = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
  transition: { type: 'spring', damping: 20, stiffness: 300 },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

// GSAP Animation Helpers
export const gsapFadeIn = (element: any, delay = 0) => {
  return {
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay,
    ease: 'power3.out',
  }
}

export const gsapSlideIn = (direction: 'left' | 'right' | 'up' | 'down', delay = 0) => {
  const directions = {
    left: { x: -100 },
    right: { x: 100 },
    up: { y: -100 },
    down: { y: 100 },
  }

  return {
    ...directions[direction],
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'power3.out',
  }
}

export const gsapScale = (delay = 0) => {
  return {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    delay,
    ease: 'back.out(1.7)',
  }
}