'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SparklesCore } from './ui/sparkles'
import { ShimmerText } from './ui/shimmer-text'

const subtitleText = 'Where viral meets verdict: Betting on content, powered by AI'

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Title with subtle animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ShimmerText className="font-cubao mt-20 text-6xl tracking-wide md:text-8xl">
          LATENT
        </ShimmerText>
        <ShimmerText className="font-cubao mt-1 text-6xl tracking-wide md:text-8xl">
          ARENA
        </ShimmerText>
      </motion.div>

      {/* Sparkles effect */}
      <div className="relative h-40 w-[40rem]">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-yellow-500 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-yellow-400 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor="#FFD700"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-full w-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>

      {/* Subtitle with simple reveal animation */}
      <motion.p
        className="mt-6 max-w-[90vw] bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text px-4 text-center text-lg text-transparent sm:text-xl md:max-w-3xl md:px-0 md:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {subtitleText}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="mt-10 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link
          href="/whitepaper"
          className="inline-flex h-12 items-center justify-center rounded-full border border-yellow-400 bg-transparent px-8 text-yellow-400 transition-colors hover:bg-yellow-400 hover:text-black"
        >
          Whitepaper
        </Link>
        <Link
          href="#waitlist"
          className="inline-flex h-12 items-center justify-center rounded-full bg-yellow-400 px-8 text-black transition-colors hover:bg-yellow-500"
        >
          Join Waitlist
        </Link>
      </motion.div>

      {/* Video Demo Container */}
      {/* <motion.div
        className="mt-16 w-full max-w-4xl overflow-hidden rounded-xl border border-yellow-400/20 bg-black/50 shadow-lg shadow-yellow-400/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Latent Arena Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div> */}
    </div>
  )
}
