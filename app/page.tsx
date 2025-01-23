'use client'

import HeroSection from '@/components/hero-section'
import { WaitlistForm } from '@/components/waitlist-form'
import { HowItWorks } from '@/components/how-it-works'
import { LampDemo } from '@/components/ui/lamp'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { AchievementsSection } from '@/components/achievements-section'

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
        description: "You've been successfully added to the waitlist. We'll be in touch soon.",
      })
    } else if (error) {
      const errorMessages: { [key: string]: { title: string; description: string } } = {
        expired: {
          title: 'Link Expired',
          description:
            message ||
            'Your verification link has expired. Please go to the waitlist section and submit your email again for a new link.',
        },
        invalid: {
          title: 'Invalid Link',
          description:
            message ||
            "This verification link is invalid or has already been used. Please ensure you're using the most recent link sent to your email.",
        },
        unauthorized: {
          title: 'Unauthorized',
          description:
            message ||
            "You are not authorized to verify this email. Please ensure you're using the correct link.",
        },
        database: {
          title: 'Database Error',
          description:
            message ||
            'We encountered an issue updating your verification status. Please try again or contact support.',
        },
        session: {
          title: 'Session Error',
          description: message || "We couldn't establish a session. Please try signing up again.",
        },
        unknown: {
          title: 'Verification Error',
          description:
            message ||
            'An unexpected error occurred during verification. Please try again or contact our support team.',
        },
      }

      const errorInfo = errorMessages[error] || errorMessages.unknown
      toast({
        title: errorInfo.title,
        description: errorInfo.description,
        variant: 'destructive',
        duration: 6000, // Show for 6 seconds since these are important messages
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
      <section id="waitlist" className="w-full scroll-mt-20 pb-4">
        <LampDemo>
          <div className="container mx-auto px-4">
            <WaitlistForm />
          </div>
        </LampDemo>
      </section>

      <AchievementsSection />

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-zinc-500">
        <p>© 2025 Latent Arena. All rights reserved.</p>
      </footer>
    </main>
  )
}
