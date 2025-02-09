'use client'

import { motion } from 'framer-motion'
import { GlowScore } from '@/components/ui/glow-score'
import { VideoPlayer } from '@/components/ui/video-player'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useWalletStore } from '@/lib/stores/wallet'
import { toast } from 'sonner'
import { ErrorBoundary } from 'react-error-boundary'

type ResultData = {
  title: string
  creator: string
  finalScore: number
  totalPool: number
  winners: Array<{
    type: string
    handle: string
    reward: number
    range: string
  }>
  judgeComments: Array<{
    name: string
    comment: string
    score: number
  }>
}

function ErrorFallback() {
  const router = useRouter()
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="mt-2 text-gray-400">Please try again</p>
        <button
          onClick={() => router.push('/demo/browse')}
          className="mt-4 rounded-xl bg-zinc-900 px-6 py-3 font-medium transition hover:bg-zinc-800"
        >
          Back to Browse
        </button>
      </div>
    </div>
  )
}

export default function ResultsContent({
  params,
  initialData,
}: {
  params: { shortId: string }
  initialData: ResultData | undefined
}) {
  const [showScore, setShowScore] = useState(false)
  const [showWinners, setShowWinners] = useState(false)
  const [hasUpdatedBalance, setHasUpdatedBalance] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { addBalance } = useWalletStore()

  const resultData = initialData

  useEffect(() => {
    if (!resultData) return

    const initialize = async () => {
      setIsLoading(true)

      // Wait for initial loading
      await new Promise((resolve) => setTimeout(resolve, 500))
      setIsLoading(false)

      // Show score after loading
      setShowScore(true)

      // Show winners and update balance
      setTimeout(() => {
        setShowWinners(true)
        if (!hasUpdatedBalance) {
          const userWinnings = resultData.winners.find((w) => w.type === 'Predictor')?.reward || 0
          if (userWinnings > 0) {
            addBalance(userWinnings)
            setHasUpdatedBalance(true)
          }
        }
      }, 1500)
    }

    initialize()
  }, [resultData, addBalance, hasUpdatedBalance])

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <p>Loading results...</p>
        </div>
      </div>
    )
  }

  if (!resultData) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Results not found</h2>
          <p className="mt-2 text-gray-400">The requested prediction could not be found</p>
          <button
            onClick={() => router.push('/demo/browse')}
            className="mt-4 rounded-xl bg-zinc-900 px-6 py-3 font-medium transition hover:bg-zinc-800"
          >
            Back to Browse
          </button>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Video Section */}
            <div className="aspect-[9/16] overflow-hidden rounded-xl bg-zinc-900">
              <VideoPlayer videoId={params.shortId} title={resultData.title} isActive={true} />
            </div>

            {/* Results Section */}
            <div className="space-y-8">
              <div>
                <h1 className="mb-2 text-2xl font-bold">{resultData.title}</h1>
                <p className="text-gray-400">by {resultData.creator}</p>
              </div>

              {/* Final Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={showScore ? { opacity: 1, scale: 1 } : {}}
                className="rounded-lg bg-zinc-900 p-6"
              >
                <h3 className="mb-4 text-lg font-semibold">Final Score</h3>
                <div className="flex justify-center">
                  <GlowScore value={resultData.finalScore} label="Viral Score" />
                </div>
              </motion.div>

              {/* Judge Comments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={showScore ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold">Judge Feedback</h3>
                <div className="space-y-3">
                  {resultData.judgeComments.map((judge, index) => (
                    <motion.div
                      key={judge.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={showScore ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.2 }}
                      className="rounded-lg bg-zinc-900 p-4"
                    >
                      <div className="mb-2 flex justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{judge.name}</span>
                          <button
                            className="group flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 transition-colors hover:bg-zinc-700"
                            onClick={() => {
                              // Audio playback functionality would go here
                              toast.info('Audio playback coming soon!')
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-3 w-3 text-gray-400 transition-colors group-hover:text-white"
                            >
                              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                            </svg>
                          </button>
                        </div>
                        <span className="text-yellow-400">{judge.score}</span>
                      </div>
                      <p className="text-sm text-gray-400">{judge.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Winners Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={showWinners ? { opacity: 1, y: 0 } : {}}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Reward Distribution</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {resultData.winners.map((winner, index) => (
                <motion.div
                  key={winner.handle}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={showWinners ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className={`relative overflow-hidden rounded-lg bg-zinc-900 p-6 ${
                    winner.type === 'Creator' ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  <div className="relative z-10">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {winner.type === 'Creator' ? (
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4 text-black"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="text-sm font-medium text-yellow-400">
                              Creator Reward
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-gray-400">{winner.type}</span>
                        )}
                      </div>
                      <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-sm text-yellow-400">
                        Range: ±{winner.range}
                      </span>
                    </div>
                    <div className="mb-1 text-lg font-bold">{winner.handle}</div>
                    <div className="text-2xl font-bold text-yellow-400">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={showWinners ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.2 + 0.3 }}
                      >
                        +{winner.reward} SOL
                      </motion.span>
                    </div>
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      winner.type === 'Creator'
                        ? 'from-yellow-400/10 to-orange-500/10'
                        : 'from-yellow-400/5 to-orange-500/5'
                    }`}
                  />
                  {winner.type === 'Creator' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={showWinners ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.4, type: 'spring' }}
                      className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-br from-yellow-400/10 to-orange-500/10"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Return to Browse */}
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push('/demo/browse')}
              className="rounded-xl bg-zinc-900 px-8 py-4 font-medium transition hover:bg-zinc-800"
            >
              Back to Browse
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
