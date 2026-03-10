/**
 * Shared Framer Motion animation variants — import from here so
 * every component uses the same easing curves and durations.
 *
 * TanStack Query usage guide (in components):
 *   const { data, isLoading } = useQuery({ queryKey: ['courses'], queryFn: fetchCourses })
 *   → handles server state: caching, refetching, loading/error states
 *
 * Zustand usage guide (in components):
 *   const { items, addItem } = useCartStore()
 *   → handles client state: cart, UI flags, user preferences
 */

// ─── Fade-up (most common entrance) ──────────────────────────────
export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Stagger container ────────────────────────────────────────────
export const staggerContainer = (stagger = 0.1) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger } },
});

// ─── Scale-in ────────────────────────────────────────────────────
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay, type: 'spring', stiffness: 280, damping: 18 },
  }),
};

// ─── Slide-in from left ───────────────────────────────────────────
export const slideLeft = {
  hidden:  { opacity: 0, x: -30 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

// ─── Slide-in from right ──────────────────────────────────────────
export const slideRight = {
  hidden:  { opacity: 0, x: 30 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

// ─── Hover lift (use as whileHover prop) ─────────────────────────
export const hoverLift = {
  y: -4,
  boxShadow: '0 8px 32px 0 rgba(255,44,109,0.18)',
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

// ─── Viewport options (trigger animation once, with margin) ──────
export const inViewOnce = { once: true, margin: '-60px' };
