import { cn } from '@/lib/utils'
import React from 'react'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn('relative', className)} {...props}>
      {children}
    </section>
  )
}
