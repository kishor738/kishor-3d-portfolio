/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary font: Inter — clean, geometric, used for all body & UI text
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Display font: Plus Jakarta Sans — used for large headings
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        // Core brand colors matching the reference design
        primary: '#4361EE',       // Indigo-blue — buttons, CTAs, active states
        'primary-dark': '#3451D1', // Darker shade for hover
        'primary-soft': 'rgba(67,97,238,0.12)', // Soft tint for backgrounds
        accent: '#38BDF8',        // Sky-blue — glow effects, decorative, badges
        'accent-soft': 'rgba(56,189,248,0.12)',
        indigo: '#6366F1',        // Indigo-500 — gradient ends, secondary elements
        teal: '#5EEAD4',          // Teal — gradient badge accents
        amber: '#FDE68A',         // Amber — badge gradient, stats

        // Background layers
        bg: '#040B18',            // Deepest dark navy — page background
        surface: 'rgba(255,255,255,0.04)',
        'surface-hover': 'rgba(255,255,255,0.07)',
        glass: 'rgba(6,12,28,0.72)',

        // Text
        'text-primary': '#E8EDF8',
        'text-muted': '#8892A4',
        'text-soft': '#94A3B8',

        // Semantic
        success: '#10B981',
      },
      backgroundImage: {
        // Signature gradient: used on "Scalable Products." text
        'brand-gradient': 'linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)',
        // Name gradient: white → cyan → indigo
        'name-gradient': 'linear-gradient(135deg, #ffffff 10%, #38bdf8 55%, #6366f1 100%)',
        // CTA button gradient
        'cta-gradient': 'linear-gradient(135deg, #4361EE 0%, #6366F1 100%)',
        // Badge gradient for labels
        'badge-gradient': 'linear-gradient(135deg, #5EEAD4 0%, #FDE68A 100%)',
      },
      boxShadow: {
        'primary-glow': '0 4px 18px rgba(67,97,238,0.30), 0 10px 28px rgba(99,102,241,0.16)',
        'primary-glow-lg': '0 8px 28px rgba(67,97,238,0.40), 0 16px 40px rgba(99,102,241,0.24)',
        'accent-glow': '0 4px 18px rgba(56,189,248,0.25)',
        'card': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 22px 70px rgba(0,0,0,0.24)',
        'custom': '0 30px 80px rgba(0,0,0,0.4)',
      },
      borderRadius: {
        'custom': '24px',
      },
      animation: {
        'pulse-dot': 'pulseDot 2.2s ease-in-out infinite',
        'name-gradient': 'nameGradientMove 6s ease-in-out infinite alternate',
        'rot-cw': 'rotCW 25s linear infinite',
        'rot-ccw': 'rotCCW 18s linear infinite',
        'slide-down': 'slideDown 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'aurora': 'auroraSweep 18s ease-in-out infinite alternate',
        'grid-drift': 'proGridDrift 28s linear infinite',
        'preview-float': 'previewFloat 5s ease-in-out infinite',
        'panel-sweep': 'panelSweep 3.5s ease-in-out infinite',
        'signal-ring': 'signalRing 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
