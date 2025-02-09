'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { JUDGES } from './utils'

export function JudgeRotationIndicator() {
  const currentDay = new Date().getDay()
  const activeJudges = JUDGES.filter((_, index) => {
    const adjustedIndex = (index + currentDay) % JUDGES.length
    return adjustedIndex < 4
  })

  return (
    <div className="mb-8 rounded-xl bg-zinc-900/50 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-center text-xl font-bold">Today&apos;s Active Judges</h2>
      <div className="flex items-center justify-center gap-4">
        {JUDGES.map((judge, index) => {
          const isActive = activeJudges.includes(judge)
          const adjustedIndex = (index + currentDay) % JUDGES.length
          const delayMs = adjustedIndex * 100

          return (
            <motion.div
              key={judge.name}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isActive ? 1 : 0.8,
                opacity: isActive ? 1 : 0.3,
                y: isActive ? -10 : 0,
              }}
              transition={{
                duration: 0.3,
                delay: delayMs / 1000,
                type: 'spring',
                stiffness: 200,
              }}
              className="relative"
            >
              <div
                className={`relative h-16 w-16 overflow-hidden rounded-full ring-2 ${
                  isActive
                    ? judge.cardColor.replace('from-', 'ring-').split(' ')[0]
                    : 'ring-zinc-800'
                }`}
              >
                <Image
                  src={judge.avatar}
                  alt={judge.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
                {isActive && (
                  <>
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${judge.cardColor} opacity-20`}
                    />
                    {/* Active Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                      <div className="flex items-center justify-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (delayMs + 300) / 1000 }}
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black"
                >
                  {adjustedIndex + 1}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
      <div className="mt-6 flex justify-center gap-8 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Active Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-zinc-600" />
          <span>Rotates In</span>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Judges rotate daily at 00:00 UTC to ensure fair and diverse content evaluation
      </div>
    </div>
  )
}

export function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="group relative space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-medium text-gray-400">{label}</span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-black/50">
        <div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 group-hover:brightness-110`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
