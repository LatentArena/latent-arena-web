'use client'

import { motion } from 'framer-motion'

interface GlowScoreProps {
  value: number
  label?: string
}

export function GlowScore({ value, label }: GlowScoreProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl" />
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-4xl font-bold text-transparent"
        >
          {value}
        </motion.div>
        {label && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-1 text-gray-400"
          >
            {label}
          </motion.div>
        )}
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 -z-10">
        <div className="animate-ping-slow absolute inset-0 rounded-full border border-yellow-400/30" />
        <div
          className="animate-ping-slow absolute inset-0 rounded-full border border-yellow-400/20"
          style={{ animationDelay: '-1s' }}
        />
        <div
          className="animate-ping-slow absolute inset-0 rounded-full border border-yellow-400/10"
          style={{ animationDelay: '-2s' }}
        />
      </div>
    </motion.div>
  )
}
