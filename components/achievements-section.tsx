'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GoogleLogo, AirbnbLogo, AdobeLogo, ToptalLogo } from './logos/company-logos'

const companies = [
  { name: 'Google', Logo: GoogleLogo },
  { name: 'Airbnb', Logo: AirbnbLogo },
  { name: 'Adobe', Logo: AdobeLogo },
  { name: 'Toptal', Logo: ToptalLogo },
]

export function AchievementsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-8">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="inline-block bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-4xl font-bold text-transparent">
          Background
        </h2>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Hackathon Winner Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-black/50 p-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              <h3 className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-xl font-bold text-transparent">
                Unfold 2024 Champion
              </h3>
            </div>
            <p className="mb-4 text-zinc-400">
              Winner across 5 sponsor tracks including the main track at Unfold 2024 hackathon, the
              second largest crypto Hackthon in India.
            </p>
            <Link
              href="https://devfolio.co/projects/latentfun-unfold-got-latent-b7a4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-yellow-400 hover:text-yellow-300"
            >
              View Project →
            </Link>
          </div>
        </div>

        {/* Team Credentials Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-black/50 p-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-3xl">👨‍💻</span>
              <h3 className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-xl font-bold text-transparent">
                Seasoned developement team
              </h3>
            </div>
            <p className="text-zinc-400">
              Being built by experienced devs from leading tech companies and contributions to
              well-known open source projects.
            </p>
            <div className="mt-4 flex items-center gap-4">
              {companies.map(({ name, Logo }) => (
                <div
                  key={name}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/50 p-2 text-zinc-400 transition-colors hover:bg-zinc-800/70"
                >
                  <Logo />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
