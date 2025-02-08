'use client'

import { SolanaIcon } from '@/components/icons/solana'
import { useWalletStore } from '@/lib/stores/wallet'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function WalletDisplay() {
  const [isOpen, setIsOpen] = useState(false)
  const balance = useWalletStore((state) => state.balance)
  const [prevBalance, setPrevBalance] = useState(balance)
  const [showDiff, setShowDiff] = useState(false)

  useEffect(() => {
    if (balance !== prevBalance) {
      setShowDiff(true)
      const timer = setTimeout(() => setShowDiff(false), 2000)
      setPrevBalance(balance)
      return () => clearTimeout(timer)
    }
  }, [balance, prevBalance])

  const balanceDiff = balance - prevBalance

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="group relative flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 transition hover:bg-zinc-800"
    >
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
          <div className="h-full w-full bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=wallet123')] bg-cover" />
        </div>
        <div className="flex items-center gap-1.5">
          <SolanaIcon className="h-4 w-4" />
          <motion.span
            key={balance}
            initial={{ y: balanceDiff < 0 ? -20 : 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-medium tabular-nums"
          >
            {balance.toFixed(2)}
          </motion.span>
          <AnimatePresence>
            {showDiff && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={`absolute right-0 top-0 translate-x-full pl-2 text-sm ${
                  balanceDiff < 0 ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {balanceDiff < 0 ? '-' : '+'}
                {Math.abs(balanceDiff).toFixed(2)}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
      <svg
        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-zinc-900 p-2 shadow-lg ring-1 ring-white/10">
          <div className="space-y-1">
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-zinc-800">
              View on Explorer
            </button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition hover:bg-zinc-800">
              Disconnect
            </button>
          </div>
        </div>
      )}
    </button>
  )
}
