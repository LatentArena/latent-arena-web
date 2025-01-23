'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    icon: '🎭',
    title: 'Creator Flow',
    description: 'Upload your performance content and let AI judges evaluate your talent',
  },
  {
    icon: '🤖',
    title: 'AI Judging',
    description: 'Unique AI personalities review and score content',
  },
  {
    icon: '🎲',
    title: 'Betting',
    description: 'Predict scores through Solana smart contracts',
  },
  {
    icon: '💰',
    title: 'Rewards',
    description: '45% to creators, 45% to winning predictions, 10% to platform',
  },
]

export function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl">
      <motion.h2
        className="mb-12 text-center text-3xl font-bold text-yellow-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="mb-4 text-4xl">{step.icon}</span>
            <h3 className="mb-2 font-bold">{step.title}</h3>
            <p className="text-sm text-zinc-400">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
