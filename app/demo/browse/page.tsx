'use client'

import { VideoPlayer } from '@/components/ui/video-player'
import { useState } from 'react'

const MOCK_SHORTS = [
  {
    id: 'jopwfhsdTuc',
    title: 'BTS Permission to Dance Challenge',
    creator: '@bts.bighitofficial',
    timeLeft: '2h 15m',
    participants: 156,
    poolSize: 25.5,
  },
  {
    id: '4CXRdcKbCZc',
    title: 'When in India',
    creator: '@travelvibes',
    timeLeft: '5h 30m',
    participants: 89,
    poolSize: 12.8,
  },
  {
    id: 'nLXBinY7BwI',
    title: 'Poor Cat Was Laughed',
    creator: '@hmminds',
    timeLeft: '12h 45m',
    participants: 234,
    poolSize: 45.2,
  },
  {
    id: 'tntmwLvbHCo',
    title: 'Dad of the Year',
    creator: '@funnymoments',
    timeLeft: '18h 20m',
    participants: 178,
    poolSize: 30.1,
  },
  {
    id: '4z_6MuN3JTQ',
    title: 'Monica Freaks Out Chandler',
    creator: '@friends',
    timeLeft: '23h 10m',
    participants: 312,
    poolSize: 55.3,
  },
]

export default function BrowsePage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Trending Predictions</h1>
        <p className="text-gray-400">Place your bets on viral content before it happens</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_SHORTS.map((short) => (
          <div
            key={short.id}
            className="group relative rounded-xl bg-zinc-900 p-4 transition hover:bg-zinc-800"
            onMouseEnter={() => setActiveVideo(short.id)}
            onMouseLeave={() => setActiveVideo(null)}
          >
            <VideoPlayer
              videoId={short.id}
              title={short.title}
              isActive={activeVideo === short.id}
            />

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="line-clamp-2 text-lg font-semibold">{short.title}</h3>
                <p className="text-sm text-gray-400">{short.creator}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">👥</span>
                  <span>{short.participants} predictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">💰</span>
                  <span>{short.poolSize} SOL</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="rounded-full bg-yellow-400/20 px-3 py-1 text-yellow-400">
                  {short.timeLeft} left
                </div>
                <a
                  href={`/demo/predict/${short.id}`}
                  className="rounded-full bg-yellow-400 px-4 py-1 text-black transition hover:bg-yellow-300"
                >
                  Predict
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
