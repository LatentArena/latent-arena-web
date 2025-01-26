'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from '@/hooks/use-toast'
import { WaitlistForm } from '@/components/waitlist-form'
import HeroSection from '@/components/hero-section'
import { HowItWorks } from '@/components/how-it-works'
import { LampDemo } from '@/components/ui/lamp'
import { AchievementsSection } from '@/components/achievements-section'

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const supabase = createClientComponentClient()

  // Handle auth state
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setIsSignedIn(!!session)
      } catch (error) {
        console.error('Session check error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  // Handle URL parameters
  useEffect(() => {
    if (searchParams.verified === 'true') {
      toast({
        title: 'Welcome to Latent Arena!',
        description: 'You&apos;ve successfully joined our waitlist.',
      })
    } else if (searchParams.error) {
      const messages: Record<string, string> = {
        invalid_link: 'Invalid verification link. Please try again.',
        verification_failed: 'Verification failed. Please request a new link.',
        unknown: 'Something went wrong. Please try again.',
      }

      toast({
        title: 'Error',
        description: messages[searchParams.error as string] || 'An error occurred.',
        variant: 'destructive',
      })
    }
  }, [searchParams, toast])

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
            {isLoading ? (
              <div className="text-center">
                <div className="mb-4 text-4xl">⌛</div>
                <p className="text-yellow-400">Loading...</p>
              </div>
            ) : isSignedIn ? (
              <div className="text-center">
                <div className="mb-4 text-4xl">🎮</div>
                <h2 className="mb-2 text-2xl font-bold text-white">You&apos;re on the List!</h2>
                <p className="text-yellow-400">Thanks for joining Latent Arena&apos;s waitlist.</p>
              </div>
            ) : (
              <WaitlistForm />
            )}
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
