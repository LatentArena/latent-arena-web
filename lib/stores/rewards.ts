import { create } from 'zustand'
import { PREDICTION_RANGES, PLATFORM_FEE } from './wallet'
import { useScoreStore } from './score'

interface RewardState {
  totalStakePool: number
  calculateExpectedValue: (range: number) => number
  calculateOverlapProbability: (range1: number, range2: number) => number
  calculateWinnerCount: (range: number, totalParticipants: number) => number
  updateStakePool: (newAmount: number) => void
}

export const useRewardStore = create<RewardState>((set, get) => ({
  totalStakePool: 0,

  // Calculate expected value for a prediction
  calculateExpectedValue: (range: number) => {
    const { totalStakePool } = get()
    const multiplier =
      Object.values(PREDICTION_RANGES).find((r) => r.size === range)?.multiplier || 1

    // Get probability of winning from score store
    const winProbability = useScoreStore.getState().calculateExpectedValue(range)

    // Calculate expected number of winners using overlap probability
    const expectedWinners = get().calculateWinnerCount(range, 10) // Using 10 as example participant count

    // Apply formula from whitepaper:
    // EV(Ri) = P(win|Ri) × M(Ri) × S × (1/N(Ri)) × (1 - platform_fee)
    const expectedValue =
      winProbability *
      multiplier *
      totalStakePool *
      (1 / Math.max(1, expectedWinners)) *
      (1 - PLATFORM_FEE)

    return expectedValue
  },

  // Calculate probability of range overlap
  calculateOverlapProbability: (range1: number, range2: number) => {
    // Use Beta distribution from score store to calculate overlap
    const { calculateBetaPDF } = useScoreStore.getState()

    // Calculate overlap integral using simple numerical integration
    const steps = 100
    const dx = 1 / steps
    let overlap = 0

    for (let i = 0; i < steps; i++) {
      const x = i * dx
      if (x >= range1 && x <= range2) {
        overlap += calculateBetaPDF(x) * dx
      }
    }

    return overlap
  },

  // Calculate expected number of winners for a range
  calculateWinnerCount: (range: number, totalParticipants: number) => {
    // N(Ri) = n × P(Ri ∩ Rj ≠ ∅)
    const overlapProb = get().calculateOverlapProbability(
      range - range / 2, // Lower bound
      range + range / 2 // Upper bound
    )

    return Math.max(1, Math.round(totalParticipants * overlapProb))
  },

  // Update the total stake pool
  updateStakePool: (newAmount: number) => {
    set({ totalStakePool: newAmount })
  },
}))
