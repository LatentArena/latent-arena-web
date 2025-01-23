'use client'

import HeroSection from '@/components/hero-section'
import { WaitlistForm } from '@/components/waitlist-form'
import { HowItWorks } from '@/components/how-it-works'
import { motion } from 'framer-motion'
import { LampDemo } from '@/components/ui/lamp'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { toast } = useToast()
  const verified = searchParams.verified === 'true'
  const error = searchParams.error as string | undefined
  const message = searchParams.message as string | undefined

  useEffect(() => {
    if (verified) {
      toast({
        title: 'Email verified!',
        description: "You've been successfully added to the waitlist. We'll be in touch soon!",
      })
    } else if (error) {
      const errorMessages: { [key: string]: { title: string; description: string } } = {
        expired: {
          title: 'Link Expired',
          description: message || 'Email verification link has expired. Please request a new one.',
        },
        invalid: {
          title: 'Invalid Link',
          description: message || 'Invalid verification link. Please try again.',
        },
        database: {
          title: 'Database Error',
          description: message || 'Failed to update verification status. Please try again.',
        },
        session: {
          title: 'Session Error',
          description: message || 'No active session found. Please try signing up again.',
        },
        unknown: {
          title: 'Error',
          description: message || 'An unexpected error occurred. Please try again.',
        },
      }

      const errorInfo = errorMessages[error] || errorMessages.unknown
      toast({
        title: errorInfo.title,
        description: errorInfo.description,
        variant: 'destructive',
      })
    }
  }, [verified, error, message, toast])

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      {/* Hero Section with Video */}
      <section className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 pt-20">
        <HeroSection />
      </section>

      {/* How it Works Section */}
      <section className="container mx-auto px-4 py-16">
        <HowItWorks />
      </section>

      {/* Lamp Effect with Waitlist */}
      <section id="waitlist" className="w-full scroll-mt-20 pb-16">
        <LampDemo>
          <div className="container mx-auto px-4">
            <WaitlistForm />
          </div>
        </LampDemo>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-zinc-500">
        <p>© 2024 Latent Arena. All rights reserved.</p>
      </footer>
    </main>
  )
}
