/**
 * SYICT — Universal Design Token File
 * ─────────────────────────────────────
 * Single source of truth for all brand colors, gradients, shadows, and
 * spacing used across the Smart Youth ICT platform.
 *
 * Usage in components:
 *   import theme from '@/lib/theme';
 *   style={{ backgroundColor: theme.colors.brand.pink }}
 *
 * This file is also consumed by tailwind.config.js so Tailwind utility
 * classes stay in sync with inline-style usage.
 */

const theme = {
  // ─────────────────────────────────────────────────────────────────
  // COLORS
  // ─────────────────────────────────────────────────────────────────
  colors: {
    brand: {
      /** Smart Pink — Primary CTA buttons, active nav links, highlights */
      pink:       '#FF2C6D',
      /** Soft Pink — Hover state for buttons and links */
      pinkLight:  '#FF6A95',
      /** Emerald Green — Secondary buttons, links, instructor badges */
      green:      '#10B981',
      /** Emerald Light — Success alerts, completion badges, progress bars */
      greenLight: '#34D399',
      /** Cyan — Tech/accent elements */
      accent:     '#22D3EE',
    },

    /** Slate 900 — Navbar, footer, dashboard sidebar background */
    dark:          '#0F172A',
    /** Slate 50 — Global page / section background */
    background:    '#F8FAFC',
    /** Pure White — Card backgrounds, modals, form surfaces */
    surface:       '#FFFFFF',
    /** Slate 200 — Input borders, dividers, card outlines */
    border:        '#E2E8F0',
    /** Slate 900 — Primary headings and body text */
    textPrimary:   '#0F172A',
    /** Slate 500 — Descriptions, captions, secondary labels */
    textSecondary: '#64748B',
  },

  // ─────────────────────────────────────────────────────────────────
  // GRADIENTS
  // ─────────────────────────────────────────────────────────────────
  gradients: {
    /** Hero banner — Pink to Green */
    hero: 'linear-gradient(135deg, #FF2C6D 0%, #10B981 100%)',
    /** CTA section — Pink to Cyan */
    cta:  'linear-gradient(135deg, #FF2C6D 0%, #22D3EE 100%)',
    /** Button hover overlay */
    btn:  'linear-gradient(135deg, #FF6A95 0%, #10B981 100%)',
  },

  // ─────────────────────────────────────────────────────────────────
  // SHADOWS
  // ─────────────────────────────────────────────────────────────────
  shadows: {
    card:  '0 2px 16px 0 rgba(0,0,0,0.07)',
    hover: '0 8px 32px 0 rgba(255,44,109,0.18)',
    focus: '0 0 0 3px rgba(255,44,109,0.25)',
  },

  // ─────────────────────────────────────────────────────────────────
  // TYPOGRAPHY
  // ─────────────────────────────────────────────────────────────────
  typography: {
    fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
    fontSize: {
      hero:    '3.5rem',
      display: '2.5rem',
      title:   '1.75rem',
      body:    '1rem',
      small:   '0.875rem',
      xs:      '0.75rem',
    },
    fontWeight: {
      normal:   400,
      medium:   500,
      semibold: 600,
      bold:     700,
      extrabold:800,
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // BORDER RADIUS
  // ─────────────────────────────────────────────────────────────────
  radius: {
    sm:   '0.375rem',
    md:   '0.5rem',
    lg:   '0.75rem',
    xl:   '1rem',
    xl2:  '1.5rem',
    full: '9999px',
  },

  // ─────────────────────────────────────────────────────────────────
  // TRANSITIONS
  // ─────────────────────────────────────────────────────────────────
  transition: {
    default: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast:    'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // ─────────────────────────────────────────────────────────────────
  // SECTION / COMPONENT MAPPING
  // (Quick reference — where each color is used)
  // ─────────────────────────────────────────────────────────────────
  //
  //  Homepage Hero         → colors.brand.pink + greenLight  (gradient)
  //  Course Cards          → colors.surface + colors.border
  //  CTA Buttons           → colors.brand.pink
  //  Button Hover          → colors.brand.pinkLight
  //  Success Alerts        → colors.brand.greenLight
  //  Student Dashboard     → colors.background + greenLight accents
  //  Admin Dashboard       → colors.dark sidebar + colors.surface content
  //  Navbar / Footer       → colors.dark
  //  Sidebar Active Link   → colors.brand.pink
  //  Secondary Actions     → colors.brand.green
  //  Headings              → colors.textPrimary
  //  Descriptions          → colors.textSecondary
  //  Dividers / Inputs     → colors.border
  //
};

module.exports = theme;
