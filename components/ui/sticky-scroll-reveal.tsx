'use client'

import React, { useRef } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { motion } from 'framer-motion'

interface StickyScrollProps {
  content: {
    title: string
    description: string
  }[]
}

export const StickyScroll: React.FC<StickyScrollProps> = ({ content }) => {
  const [activeCard, setActiveCard] = React.useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end start'],
  })

  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    const closestBreakpoint = cardsBreakpoints.reduce((prev, curr) =>
      Math.abs(curr - latest) < Math.abs(prev - latest) ? curr : prev
    )
    const activeIndex = cardsBreakpoints.indexOf(closestBreakpoint)
    setActiveCard(activeIndex)
  })

  return (
    <motion.div
      className="scrollbar-hide relative h-[30rem] space-y-8 overflow-y-auto rounded-md bg-black p-8"
      ref={ref}
    >
      <div className="sticky top-0 flex h-fit items-start gap-4">
        <div className="w-full py-8">
          <motion.div
            className="text-2xl font-bold text-zinc-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={content[activeCard].title}
          >
            {content[activeCard].title}
          </motion.div>
          <motion.div
            className="mt-4 text-base text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={content[activeCard].description}
          >
            {content[activeCard].description}
          </motion.div>
        </div>
      </div>
      <div className="h-[40rem]" />
    </motion.div>
  )
}
