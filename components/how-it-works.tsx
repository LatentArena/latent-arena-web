'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const steps = [
  {
    icon: '🎬',
    title: 'Submit Content',
    description: 'Viral content is submitted by Creators',
    gradient: 'from-pink-500 via-purple-500 to-indigo-500',
  },
  {
    icon: '🤖',
    title: 'AI Review',
    description: 'AI judges review the content with their unique personalities',
    gradient: 'from-violet-500 via-purple-500 to-pink-500',
  },
  {
    icon: '🎲',
    title: 'Place Bets',
    description: 'Users enjoy the content and bet $LATENT',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
  },
  {
    icon: '💰',
    title: 'Win Rewards',
    description: 'AIs evaluate & score, the bet pool is distributed across winners and creator',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
  },
]

export function HowItWorks() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="inline-block bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-4xl font-bold text-transparent">
          How It Works?
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {steps.map((step) => (
          <div key={step.title} className="group relative">
            <div
              className={cn(
                'absolute inset-0 rounded-2xl bg-gradient-to-r opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40',
                step.gradient
              )}
            />
            <div className="relative h-full rounded-2xl border border-zinc-800 bg-black/50 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2">
              <div className="flex flex-col items-center space-y-4 text-center">
                <motion.span
                  className="text-5xl"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {step.icon}
                </motion.span>
                <h3 className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-xl font-bold text-transparent">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
