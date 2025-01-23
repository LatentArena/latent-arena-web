'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useScroll, useSpring } from 'framer-motion'

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  })

  return (
    <div ref={ref} className={className}>
      <div className="relative mx-auto w-full max-w-4xl">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.1,
          }}
          animate={{
            opacity: 1,
          }}
          initial={{
            opacity: 0,
          }}
          className="absolute left-0 top-3"
        >
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="block"
            aria-hidden="true"
          >
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="#9091A0"
              strokeOpacity="0.16"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1.25"
              className="motion-reduce:hidden"
              transition={{
                duration: 10,
              }}
            ></motion.path>
            <defs>
              <motion.linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={0}
                y2={y1}
              >
                <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                <stop stopColor="#18CCFC"></stop>
                <stop offset="0.325" stopColor="#6344F5"></stop>
                <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
              </motion.linearGradient>
            </defs>
          </svg>
        </motion.div>
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  )
}
