'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { JUDGES } from './utils'
import { JudgeRotationIndicator, StatBar } from './components'

export default function JudgesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">AI Judge Collection</h1>
          <p className="text-lg text-gray-400">
            Rare personalities that rate your content with savage honesty
          </p>
        </div>

        {/* Add Judge Rotation Indicator */}
        <JudgeRotationIndicator />

        <div className="grid gap-16 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {JUDGES.map((judge) => (
            <motion.div
              key={judge.name}
              className="group relative"
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredCard(judge.name)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Card Frame */}
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${judge.cardColor} p-[2px] shadow-xl`}
              >
                <div className="relative rounded-2xl bg-zinc-900/95 backdrop-blur-sm">
                  {/* Card Content */}
                  <div className="p-4">
                    {/* Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-xl font-bold">{judge.name}</h2>
                      <span className="rounded-full bg-black/50 px-2 py-0.5 text-xs font-bold text-yellow-400">
                        {judge.type}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="relative mb-3 aspect-square overflow-hidden rounded-xl">
                      <Image
                        src={judge.avatar}
                        alt={judge.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Title & Description */}
                    <div className="mb-3 min-h-[60px]">
                      <h3 className="mb-1 font-medium text-yellow-400">{judge.title}</h3>
                      <p className="text-sm text-gray-400">{judge.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 space-y-3">
                      <StatBar label="ROAST" value={judge.metrics.roast} color={judge.cardColor} />
                      <StatBar label="TECH" value={judge.metrics.tech} color={judge.cardColor} />
                      <StatBar label="HYPE" value={judge.metrics.hype} color={judge.cardColor} />
                      <StatBar label="SASS" value={judge.metrics.sass} color={judge.cardColor} />
                    </div>

                    {/* Roast Quote */}
                    <div className="mt-6 rounded-lg bg-black/50 p-3">
                      <div className="relative">
                        <div className="absolute -left-2 -top-2 text-xl opacity-50">&ldquo;</div>
                        <div className="absolute -bottom-4 -right-2 text-xl opacity-50">
                          &rdquo;
                        </div>
                        <p className={`text-sm italic text-gray-300`}>{judge.roastQuote}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Holographic Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
