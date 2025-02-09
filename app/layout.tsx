import './globals.css'
import type { Metadata } from 'next'
import { Inter, Russo_One, Space_Grotesk, Bungee } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/header'
import '@/styles/scrollbar-hide.css'
import localFont from 'next/font/local'

const cubao = localFont({
  src: '../public/fonts/Cubao_Free_Regular.otf',
  variable: '--font-cubao',
  display: 'swap',
})

const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-russo-one',
  preload: true,
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  preload: true,
  display: 'swap',
})

const inter = Inter({ subsets: ['latin'] })
const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee',
})

export const metadata: Metadata = {
  title: 'Latent Arena - Where Viral Meets Verdict',
  description:
    'Betting on content, powered by AI. Join the future of content creation and evaluation on Solana.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://latentarena.xyz'),
  keywords:
    'Solana, AI Judges, Content Creation, Content Evaluation, Web3 Entertainment, Latent Arena',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Latent Arena - Where Viral Meets Verdict',
    description:
      'Betting on content, powered by AI. Join the future of content creation and evaluation on Solana.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LatentArena - Web3 Latent Platform on Solana',
    description: 'AI-powered Latent platform where creators meet judges on Solana blockchain',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${russoOne.className} min-h-screen bg-background-dark text-white ${russoOne.variable} ${spaceGrotesk.variable} ${bungee.variable} ${cubao.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${spaceGrotesk.className} min-h-screen bg-background-dark text-white`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main className="relative">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
