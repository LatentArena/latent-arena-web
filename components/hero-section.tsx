'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SparklesCore } from './ui/sparkles'
import { ShimmerText } from './ui/shimmer-text'

const preTitle = 'Where Viral Meets Verdict'
const postTitle = 'Betting on content, powered by AI'

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Pre-title text */}
      <motion.p
        className="mt-12 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-lg text-transparent sm:text-xl md:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {preTitle}
      </motion.p>

      {/* Title with subtle animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ShimmerText className="mt-4 font-cubao text-6xl tracking-wide md:text-8xl">
          LATENT
        </ShimmerText>
        <ShimmerText className="mt-1 font-cubao text-6xl tracking-wide md:text-8xl">
          ARENA
        </ShimmerText>
      </motion.div>

      {/* Sparkles effect */}
      <div className="relative h-40 w-full max-w-[90vw] md:max-w-[600px]">
        {/* Gradients */}
        <div className="absolute inset-x-[10%] top-0 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent blur-sm" />
        <div className="absolute inset-x-[10%] top-0 h-px w-4/5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <div className="absolute inset-x-[25%] top-0 h-[5px] w-1/2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent blur-sm" />
        <div className="absolute inset-x-[25%] top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

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

      {/* Post-title text */}
      <motion.p
        className="mt-6 max-w-[90vw] bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text px-4 text-center text-lg text-transparent sm:text-xl md:max-w-3xl md:px-0 md:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {postTitle}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="mt-10 flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link
          href="/docs/whitepaper.pdf"
          target="_blank"
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

      {/* Video Container */}
      <motion.div
        className="mt-16 w-[80vw] px-4 md:px-8 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-xl border border-yellow-400/20 bg-black/50 shadow-lg shadow-yellow-400/10">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/vUSkus8AVK4"
              title="Latent Arena Teaser"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
