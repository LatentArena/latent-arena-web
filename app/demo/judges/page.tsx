'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const JUDGES = [
  {
    name: 'Ronald Triumph',
    title: 'The Deal Artist',
    type: 'LEGENDARY',
    description: 'Nobody knows viral content better than me, believe me folks!',
    avatar: '/images/judges/ronald.png',
    roastQuote:
      "Folks, this is worse than when they told me I couldn't buy Greenland. Terrible ratings, even China is doing better. SAD!",
    metrics: {
      roast: 95,
      tech: 40,
      hype: 100,
      sass: 90,
    },
    cardColor: 'from-red-500 to-yellow-500',
    expertise: ['Marketing', 'Hype', 'Engagement'],
    rotationSchedule: 0,
  },
  {
    name: 'Elon Tusk',
    title: 'The Meme Lord',
    type: 'MYTHIC',
    description: 'Rating content with neural links and Mars-approved memes',
    avatar: '/images/judges/tusk.png',
    roastQuote:
      'My neural network suggests a 69.420% chance this was made by a bot running on a potato. Time to deploy the memes.',
    metrics: {
      roast: 85,
      tech: 100,
      hype: 90,
      sass: 80,
    },
    cardColor: 'from-blue-500 to-cyan-500',
    expertise: ['Innovation', 'Technology', 'Memes'],
    rotationSchedule: 1,
  },
  {
    name: 'Dick Sanchez',
    title: 'The Smartest Being',
    type: 'ULTRA RARE',
    description: 'Wubba lubba dub dub! *burp* Time to rate some content!',
    avatar: '/images/judges/rick.jpeg',
    roastQuote:
      "*burp* M-Morty, I've seen better creativity in a Jerry's daycare center. And that's saying something *burp*",
    metrics: {
      roast: 100,
      tech: 100,
      hype: 70,
      sass: 100,
    },
    cardColor: 'from-green-400 to-cyan-500',
    expertise: ['Science', 'Innovation', 'Multiverse'],
    rotationSchedule: 2,
  },
  {
    name: 'Jan Yang',
    title: 'The Silicon Savage',
    type: 'MYTHIC',
    description: 'Special occasion? I eat the fish.',
    avatar: '/images/judges/jian.png',
    roastQuote:
      'Eric Bachman, this your mom. You are not my baby. Your video? Not hot dog. Is trash.',
    metrics: {
      roast: 90,
      tech: 85,
      hype: 60,
      sass: 95,
    },
    cardColor: 'from-purple-500 to-pink-500',
    expertise: ['Startups', 'AI', 'Disruption'],
    rotationSchedule: 3,
  },
  {
    name: 'Erik Cartwright',
    title: 'The Respect Authority',
    type: 'LEGENDARY',
    description: 'Respect my authoritah! Time to rate some content!',
    avatar: '/images/judges/eric.jpeg',
    roastQuote:
      "This content is so weak it makes Kenny's immune system look like a superhero. Screw you guys, I'm giving this zero stars!",
    metrics: {
      roast: 100,
      tech: 50,
      hype: 95,
      sass: 100,
    },
    cardColor: 'from-red-500 to-orange-500',
    expertise: ['Manipulation', 'Social', 'Trends'],
    rotationSchedule: 4,
  },
  {
    name: 'Dr. Shelton Cooper',
    title: 'The Theoretical Judge',
    type: 'ULTRA RARE',
    description: 'Bazinga! Time for some peer review!',
    avatar: '/images/judges/sheldon.png',
    roastQuote:
      'Your understanding of basic principles is so flawed, it makes geology look like a real science. Bazinga!',
    metrics: {
      roast: 80,
      tech: 100,
      hype: 40,
      sass: 85,
    },
    cardColor: 'from-indigo-500 to-blue-500',
    expertise: ['Analysis', 'Theory', 'Precision'],
    rotationSchedule: 5,
  },
  {
    name: 'Mike Scarn',
    title: "The World's Best Judge",
    type: 'LEGENDARY',
    description: "That's what she said! - about great content",
    avatar: '/images/judges/michael.png',
    roastQuote:
      "I'm not superstitious, but I am a little stitious, and this gives me bad vibes. That's what she said!",
    metrics: {
      roast: 85,
      tech: 30,
      hype: 90,
      sass: 95,
    },
    cardColor: 'from-blue-400 to-purple-500',
    expertise: ['Entertainment', 'Management', 'Fun'],
    rotationSchedule: 6,
  },
  {
    name: 'Peter Griffith',
    title: 'The Meme Machine',
    type: 'MYTHIC',
    description: "Hehehehehe, time to judge some freakin' awesome reels!",
    avatar: '/images/judges/peter.jpeg',
    roastQuote:
      'Hehehehehe, this reminds me of that time I tried to become a social media influencer. Spoiler alert: it ended with a chicken fight. Nyehehehehe!',
    metrics: {
      roast: 90,
      tech: 20,
      hype: 85,
      sass: 100,
    },
    cardColor: 'from-green-500 to-yellow-500',
    expertise: ['Entertainment', 'Pop Culture', 'Comedy'],
    rotationSchedule: 0,
  },
] as const

// Add helper function to get active judges
export function getActiveJudges() {
  const currentDay = new Date().getDay()
  return JUDGES.filter((judge, index) => {
    // Get 4 judges based on current day rotation
    const adjustedIndex = (index + currentDay) % JUDGES.length
    return adjustedIndex < 4
  })
}

function JudgeRotationIndicator() {
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

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
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

export default function JudgesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
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
