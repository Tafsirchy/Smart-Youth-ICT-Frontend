/** @type {import('tailwindcss').Config} */

const theme = require('./src/lib/theme');

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],

  theme: {
    extend: {
      // ─── Brand Colors ──────────────────────────────────────────────
      colors: {
        brand: {
          pink:       theme.colors.brand.pink,       // #FF2C6D — Primary CTA
          pinkLight:  theme.colors.brand.pinkLight,  // #FF6A95 — Hover state
          green:      theme.colors.brand.green,      // #0F7A3D — Secondary brand
          greenLight: theme.colors.brand.greenLight, // #22C55E — Success / badge
        },
        dark:              theme.colors.dark,              // #111827 — Navbar / sidebar
        background:        theme.colors.background,        // #F5F7FA — Page bg
        surface:           theme.colors.surface,           // #FFFFFF — Cards / panels
        border:            theme.colors.border,            // #E5E7EB — Dividers / inputs
        textPrimary:       theme.colors.textPrimary,       // #1F2937 — Headings
        textSecondary:     theme.colors.textSecondary,     // #6B7280 — Descriptions
      },

      // ─── Brand Gradients (use via arbitrary-value classes) ─────────
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #FF2C6D 0%, #22C55E 100%)',
        'gradient-cta':  'linear-gradient(135deg, #FF2C6D 0%, #0F7A3D 100%)',
        'gradient-btn':  'linear-gradient(135deg, #FF6A95 0%, #22C55E 100%)',
      },

      // ─── Typography ────────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero:    ['3.5rem',  { lineHeight: '1.1', fontWeight: '800' }],
        display: ['2.5rem',  { lineHeight: '1.2', fontWeight: '700' }],
        title:   ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
      },

      // ─── Shadows ───────────────────────────────────────────────────
      boxShadow: {
        card:  '0 2px 16px 0 rgba(0,0,0,0.07)',
        hover: '0 8px 32px 0 rgba(255,44,109,0.18)',
        focus: '0 0 0 3px rgba(255,44,109,0.25)',
      },

      // ─── Border Radius ─────────────────────────────────────────────
      borderRadius: {
        xl2: '1rem',
        xl3: '1.5rem',
      },

      // ─── Transitions ───────────────────────────────────────────────
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },

  plugins: [],
};
