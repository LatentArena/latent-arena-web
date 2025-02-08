import { create } from 'zustand'
import { SCORE_CONFIG } from './wallet'

interface ScoreState {
  alpha: number
  beta: number
  calculateBetaPDF: (x: number) => number
  calculateExpectedValue: (range: number) => number
  updateParameters: (newAlpha: number, newBeta: number) => void
}

// Beta function implementation
function betaFunction(x: number, y: number): number {
  return Math.exp(logGamma(x) + logGamma(y) - logGamma(x + y))
}

// Log gamma function implementation
function logGamma(z: number): number {
  const c = [
    76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155,
    0.1208650973866179e-2, -0.5395239384953e-5,
  ]
  let sum = 1.000000000190015
  for (let i = 0; i < 6; i++) {
    sum += c[i] / (z + i + 1)
  }
  return (z + 0.5) * Math.log(z + 5.5) - (z + 5.5) + Math.log((2.5066282746310005 * sum) / z)
}

export const useScoreStore = create<ScoreState>((set, get) => ({
  // Initial parameters for the Beta distribution
  alpha: 2,
  beta: 2,

  // Calculate Beta probability density function
  calculateBetaPDF: (x: number) => {
    const { alpha, beta } = get()
    const normalizedX = x / SCORE_CONFIG.MAX // Normalize x to [0,1]
    if (normalizedX <= 0 || normalizedX >= 1) return 0

    return (
      (Math.pow(normalizedX, alpha - 1) * Math.pow(1 - normalizedX, beta - 1)) /
      betaFunction(alpha, beta)
    )
  },

  // Calculate expected value for a given range
  calculateExpectedValue: (range: number) => {
    const { alpha, beta } = get()
    const mean = (alpha / (alpha + beta)) * SCORE_CONFIG.MAX
    const variance =
      ((alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1))) *
      Math.pow(SCORE_CONFIG.MAX, 2)

    // Probability of falling within range
    const standardDev = Math.sqrt(variance)
    const probability = 0.68 // Approximately 68% for ±1 standard deviation

    return probability * range
  },

  // Update distribution parameters based on historical data
  updateParameters: (newAlpha: number, newBeta: number) => {
    set({ alpha: newAlpha, beta: newBeta })
  },
}))
