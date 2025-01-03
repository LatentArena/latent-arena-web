'use client'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!beamsRef.current) return

    const beams = beamsRef.current
    const handleMouseMove = (e: MouseEvent) => {
      const rect = beams.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      beams.style.setProperty('--mouse-x', `${mouseX}px`)
      beams.style.setProperty('--mouse-y', `${mouseY}px`)
    }

    beams.addEventListener('mousemove', handleMouseMove)

    return () => {
      beams.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={beamsRef}
      className={cn(
        'pointer-events-none fixed inset-0 z-30 transition-opacity duration-300',
        className
      )}
    >
      <div className="absolute inset-0 z-[-1] bg-black [--gradient-position:50%] [--gradient-size:50%] [background:radial-gradient(var(--gradient-size)_circle_at_var(--gradient-position),#18181B,transparent)]" />
    </div>
  )
}
