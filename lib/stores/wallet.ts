import { create } from 'zustand';

interface WalletState {
  balance: number;
  deductBalance: (amount: number) => void;
  addBalance: (amount: number) => void;
}

export const PLATFORM_FEE = 0.025; // 2.5% platform fee

// Stake tiers as per whitepaper
export const PREDICTION_RANGES = {
  PRECISE: { size: 0.1, multiplier: 8.0 },
  NARROW: { size: 0.25, multiplier: 4.0 },
  MEDIUM: { size: 0.5, multiplier: 2.0 },
  WIDE: { size: 1.0, multiplier: 1.0 },
} as const;

// Temporal parameters as per whitepaper
export const TIME_WINDOWS = {
  PREDICTION: 24 * 60 * 60 * 1000, // 24 hours
  JUDGE_SCORING: 1 * 60 * 60 * 1000, // 1 hour
  SETTLEMENT: 2 * 60 * 60 * 1000, // 2 hours
  CONTENT_REVIEW: 12 * 60 * 60 * 1000, // 12 hours
  JUDGE_ROTATION: 7 * 24 * 60 * 60 * 1000, // 168 hours (weekly)
  MIN_SUBMISSION_INTERVAL: 1 * 60 * 60 * 1000, // 1 hour
} as const;

// Score distribution parameters
export const SCORE_CONFIG = {
  MIN: 0,
  MAX: 10,
  PRECISION: 0.1,
  CREATOR_FIXED_RANGE: 0.5,
} as const;

// System requirements
export const SYSTEM_REQUIREMENTS = {
  MIN_PARTICIPANTS: 2,
  MIN_JUDGES: 8,
  ACTIVE_JUDGES: 4,
} as const;

export const useWalletStore = create<WalletState>((set) => ({
  balance: 25.5, // Initial balance
  deductBalance: (amount: number) => 
    set((state) => {
      const withFee = amount * (1 + PLATFORM_FEE);
      return { balance: Number((state.balance - withFee).toFixed(2)) };
    }),
  addBalance: (amount: number) => 
    set((state) => ({ balance: Number((state.balance + amount).toFixed(2)) })),
})); 