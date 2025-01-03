import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        bungee: ['var(--font-bungee)'],
        russo: ['var(--font-russo-one)'],
        spaceGrotesk: ['var(--font-space-grotesk)'],
        cubao: ['var(--font-cubao)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: {
          dark: '#0A0A0F', // Very dark blue-black
          card: '#151520', // Slightly lighter dark
          glow: '#1A1A2E', // Subtle glow effect
          DEFAULT: 'hsl(var(--background))',
        },
        foreground: 'hsl(var(--foreground))',
        primary: {
          yellow: '#FFDE59', // Logo yellow
          gold: '#FFD700', // Slightly darker gold
          amber: '#FFB302', // Warm amber
          DEFAULT: '#FFDE59',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#FFE55C', // Light yellow
          foreground: '#000000',
        },
        accent: {
          yellow: '#FFDE59', // Logo yellow
          gold: '#FFD700', // Golden
          neon: '#FFFF00', // Neon yellow
          warm: '#FFB302', // Warm yellow
          DEFAULT: '#FFDE59',
          foreground: '#000000',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right, #FFDE59, #FFD700)',
        'cyber-grid':
          'linear-gradient(transparent 97%, rgba(255, 222, 89, 0.3) 97%), linear-gradient(90deg, transparent 97%, rgba(255, 222, 89, 0.3) 97%)',
        'neon-glow':
          'radial-gradient(circle at center, rgba(255, 222, 89, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        neon: '0 0 5px theme("colors.accent.yellow"), 0 0 20px theme("colors.accent.yellow")',
        'neon-strong': '0 0 10px theme("colors.accent.neon"), 0 0 30px theme("colors.accent.neon")',
        gold: '0 0 15px theme("colors.accent.gold"), 0 0 25px theme("colors.accent.warm")',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
