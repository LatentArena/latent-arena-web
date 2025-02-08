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
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 8s ease-in-out infinite',
        sparkle: 'sparkle 1s linear',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right, #FFDE59, #FFD700)',
        'cyber-grid':
          'linear-gradient(transparent 97%, rgba(255, 222, 89, 0.3) 97%), linear-gradient(90deg, transparent 97%, rgba(255, 222, 89, 0.3) 97%)',
        'neon-glow':
          'radial-gradient(circle at center, rgba(255, 222, 89, 0.15) 0%, transparent 70%)',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
