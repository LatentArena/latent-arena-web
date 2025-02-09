'use client'

import { GlowScore } from '@/components/ui/glow-score'
import { VideoPlayer } from '@/components/ui/video-player'
import {
  useWalletStore,
  PREDICTION_RANGES,
  PLATFORM_FEE,
  SCORE_CONFIG,
  TIME_WINDOWS,
} from '@/lib/stores/wallet'
import { useScoreStore } from '@/lib/stores/score'
import { useRewardStore } from '@/lib/stores/rewards'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { toast } from 'sonner'
import confetti from 'canvas-confetti'

// Convert prediction ranges to array for easier mapping
const RANGE_OPTIONS = Object.entries(PREDICTION_RANGES).map(([key, value]) => ({
  key,
  ...value,
}))

const SHORTS_DATA = {
  jopwfhsdTuc: {
    title: 'BTS Permission to Dance Challenge',
    creator: '@bts.bighitofficial',
    poolSize: 25.5,
  },
  '4CXRdcKbCZc': {
    title: 'When in India',
    creator: '@travelvibes',
    poolSize: 12.8,
  },
  nLXBinY7BwI: {
    title: 'Poor Cat Was Laughed',
    creator: '@hmminds',
    poolSize: 45.2,
  },
  tntmwLvbHCo: {
    title: 'Dad of the Year',
    creator: '@funnymoments',
    poolSize: 30.1,
  },
  '4z_6MuN3JTQ': {
    title: 'Monica Freaks Out Chandler',
    creator: '@friends',
    poolSize: 55.3,
  },
}

export default function PredictPage({ params }: { params: { shortId: string } }) {
  const [selectedRange, setSelectedRange] = useState<number | null>(null)
  const [selectedRangeKey, setSelectedRangeKey] = useState<string | null>(null)
  const [predictedScore, setPredictedScore] = useState(SCORE_CONFIG.MAX / 2)
  const [isConfirming, setIsConfirming] = useState(false)
  const [winProbability, setWinProbability] = useState<number>(0)
  const [expectedValue, setExpectedValue] = useState<number>(0)
  const [timeRemaining, setTimeRemaining] = useState<string>('24h 00m')
  const router = useRouter()
  const { balance, deductBalance } = useWalletStore()
  const { calculateExpectedValue, updateStakePool } = useRewardStore()
  const { calculateBetaPDF } = useScoreStore()

  // Mock start time - in real app this would come from backend
  const predictionStartTime = useMemo(() => new Date(Date.now() - 1000 * 60 * 60), []) // Started 1 hour ago

  const shortData = SHORTS_DATA[params.shortId as keyof typeof SHORTS_DATA] || {
    title: 'Unknown Video',
    creator: '@unknown',
    poolSize: 0,
  }

  // Update stake pool when page loads
  useEffect(() => {
    updateStakePool(shortData.poolSize)
  }, [shortData.poolSize, updateStakePool])

  // Update probabilities when range or score changes
  useEffect(() => {
    if (selectedRange) {
      const probability = calculateBetaPDF(predictedScore)
      setWinProbability(probability)

      const ev = calculateExpectedValue(selectedRange)
      setExpectedValue(ev)
    }
  }, [selectedRange, predictedScore, calculateBetaPDF, calculateExpectedValue])

  // Update time remaining
  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date()
      const elapsedMs = now.getTime() - predictionStartTime.getTime()
      const remainingMs = TIME_WINDOWS.PREDICTION - elapsedMs

      if (remainingMs <= 0) {
        setTimeRemaining('Ended')
        return
      }

      const hours = Math.floor(remainingMs / (1000 * 60 * 60))
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))
      setTimeRemaining(`${hours}h ${minutes}m`)
    }

    updateTimeRemaining()
    const interval = setInterval(updateTimeRemaining, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [predictionStartTime])

  // Calculate the stake amount based on range size
  const getStakeAmount = (rangeSize: number) => {
    return rangeSize * 10 // Example: 0.1 range = 1 SOL, 0.25 range = 2.5 SOL, etc.
  }

  const handleConfirm = () => {
    if (!selectedRange) return
    const stakeAmount = getStakeAmount(selectedRange)

    if (balance < stakeAmount) {
      toast.error('Insufficient balance')
      return
    }

    setIsConfirming(true)

    // Simulate transaction confirmation (2 seconds)
    setTimeout(() => {
      deductBalance(stakeAmount)

      // Start confetti after transaction is "confirmed"
      const duration = 2000
      const end = Date.now() + duration
      const colors = ['#FFB800', '#FF8A00', '#FF5C00', '#FFF']

      const frame = () => {
        // Side confetti
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 75,
          origin: { x: 0, y: 0.5 },
          colors,
          gravity: 0.8,
          scalar: 1.2,
          drift: -0.5,
        })
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 75,
          origin: { x: 1, y: 0.5 },
          colors,
          gravity: 0.8,
          scalar: 1.2,
          drift: 0.5,
        })

        // Bottom confetti
        confetti({
          particleCount: 10,
          angle: 90,
          spread: 45,
          origin: { x: 0.3, y: 1 },
          colors,
          gravity: 0.5,
          scalar: 1.5,
          drift: 0.2,
        })
        confetti({
          particleCount: 10,
          angle: 90,
          spread: 45,
          origin: { x: 0.7, y: 1 },
          colors,
          gravity: 0.5,
          scalar: 1.5,
          drift: -0.2,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        } else {
          // Add a small delay after confetti ends before navigation
          setTimeout(() => {
            setIsConfirming(false)
            router.push(`/demo/results/${params.shortId}`)
          }, 1000)
        }
      }

      frame()
    }, 2000) // Simulate 2 second transaction confirmation
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Video Preview Section */}
          <div className="flex flex-col space-y-4">
            <div className="aspect-[9/16] overflow-hidden rounded-xl bg-zinc-900">
              <VideoPlayer videoId={params.shortId} title={shortData.title} isActive={true} />
            </div>
            {/* Stats Section moved under video */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Time Left', value: timeRemaining },
                {
                  label: 'Win Probability',
                  value: `${(winProbability * 100).toFixed(1)}%`,
                  color: 'text-emerald-400',
                },
                {
                  label: 'Expected Value',
                  value: `${expectedValue.toFixed(2)} SOL`,
                  color: 'text-yellow-400',
                },
                {
                  label: 'Potential Max Reward',
                  value: selectedRange
                    ? `${(
                        getStakeAmount(selectedRange) *
                        (RANGE_OPTIONS.find((r) => r.size === selectedRange)?.multiplier || 1)
                      ).toFixed(1)} SOL`
                    : '0 SOL',
                  color: 'text-orange-400',
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="animate-fade-in rounded-lg bg-zinc-900 p-4 transition-all hover:bg-zinc-800"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  <div className="mb-1 text-sm text-gray-400">{stat.label}</div>
                  <div className={`text-xl font-bold ${stat.color || ''}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Controls */}
          <div className="flex flex-col space-y-6">
            <div className="animate-fade-in">
              <h1 className="mb-2 text-2xl font-bold">{shortData.title}</h1>
              <p className="text-gray-400">by {shortData.creator}</p>
            </div>

            {/* Score Selection with Probability Distribution */}
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h3 className="mb-4 text-lg font-semibold">Predict Viral Score</h3>
              <div className="rounded-lg bg-zinc-900 p-6 transition-all hover:bg-zinc-800">
                <div className="mb-8">
                  <div className="mb-2 flex justify-between text-sm text-gray-400">
                    <span>Low Impact (0)</span>
                    <span>Viral Hit (10)</span>
                  </div>
                  <div
                    className="relative h-2 w-full cursor-pointer rounded-full bg-zinc-700"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = e.clientX - rect.left
                      const percentage = Math.min(Math.max(x / rect.width, 0), 1)
                      setPredictedScore(Number((percentage * SCORE_CONFIG.MAX).toFixed(1)))
                    }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                      style={{ width: `${(predictedScore / SCORE_CONFIG.MAX) * 100}%` }}
                    />

                    {/* Probability Distribution Overlay */}
                    <div className="absolute -top-4 left-0 h-8 w-full">
                      {Array.from({ length: 50 }).map((_, i) => {
                        const x = (i / 50) * SCORE_CONFIG.MAX
                        const probability = calculateBetaPDF(x)
                        return (
                          <div
                            key={i}
                            className="absolute bottom-0 w-0.5 bg-white/20 transition-all"
                            style={{
                              height: `${probability * 100}%`,
                              left: `${(i / 50) * 100}%`,
                              opacity: predictedScore === x ? 1 : 0.2,
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center py-4">
                  <GlowScore value={predictedScore} label="Predicted Score" />
                </div>
              </div>
            </div>

            {/* Range Selection with Expected Values */}
            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
              <h3 className="mb-4 text-lg font-semibold">Select Prediction Range</h3>
              <div className="grid grid-cols-2 gap-4">
                {RANGE_OPTIONS.map((range) => {
                  const stakeAmount = getStakeAmount(range.size)
                  const isDisabled = balance < stakeAmount
                  const rangeEV = calculateExpectedValue(range.size)

                  return (
                    <button
                      key={range.key}
                      className={`group relative overflow-hidden rounded-lg bg-zinc-900 p-4 transition ${
                        selectedRangeKey === range.key
                          ? 'ring-2 ring-yellow-400'
                          : isDisabled
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-zinc-800'
                      }`}
                      onClick={() => {
                        setSelectedRange(range.size)
                        setSelectedRangeKey(range.key)
                      }}
                      disabled={isDisabled}
                    >
                      <div className="relative z-10">
                        <div className="mb-1 text-xl font-bold">{range.size * 10} SOL</div>
                        <div className="space-y-1 text-sm text-gray-400">
                          <div>Range: ±{range.size * 5}</div>
                          <div>{range.multiplier}x multiplier</div>
                          <div className="text-yellow-400">
                            Expected Value: {rangeEV.toFixed(2)} SOL
                          </div>
                          <div className="text-emerald-400">
                            Win Probability: {(calculateBetaPDF(predictedScore) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 transition-opacity ${
                          selectedRangeKey === range.key
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              className={`w-full rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 py-4 text-lg font-bold text-black transition ${
                !selectedRange || balance < getStakeAmount(selectedRange)
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:opacity-90'
              } mt-auto animate-slide-up`}
              style={{ animationDelay: '600ms' }}
              onClick={handleConfirm}
              disabled={!selectedRange || isConfirming || balance < getStakeAmount(selectedRange)}
            >
              {isConfirming ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Confirming...
                </div>
              ) : (
                'Confirm Prediction'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
