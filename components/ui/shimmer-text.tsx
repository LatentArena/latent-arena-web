'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
}

export const ShimmerText = ({ children, className }: ShimmerTextProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative cursor-default', className)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="relative bg-[linear-gradient(to_bottom,white,white,#ffd700)] bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(120deg, #ffffff 0%, #ffffff 25%, #ffd700 50%, #ffffff 75%, #ffffff 100%)`,
          backgroundSize: '200% 100%',
          backgroundPositionX: `${100 - position.x}%`,
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
