'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'

const VerificationAnimation = () => {
  return (
    <div className="relative">
      {/* Background pulse effect */}
      <motion.div
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-yellow-400/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Outer glowing ring */}
      <motion.div
        className="absolute -inset-8 rounded-full border-2 border-yellow-400/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner spinning hexagon */}
      <motion.div
        className="relative h-24 w-24"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.7)]"
          fill="currentColor"
        >
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
        </svg>

        {/* Center dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <motion.div className="absolute -inset-12" initial="initial" animate="animate">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-yellow-400/60 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: [0, (i % 2 ? 80 : -80) * Math.random()],
              y: [0, -80 * Math.random()],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Loading text */}
      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-yellow-400/80"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        INITIALIZING...
      </motion.div>
    </div>
  )
}

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [verificationState, setVerificationState] = useState<'verifying' | 'success' | 'error'>(
    'verifying'
  )

  useEffect(() => {
    const handleCallback = async () => {
      console.log('=== Auth Callback Debug Logs ===')
      console.log('Full URL:', window.location.href)
      console.log('Search params:', window.location.search)

      try {
        // Get the session directly - Supabase client will handle the code exchange internally
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Session error:', {
            message: sessionError.message,
            status: sessionError?.status,
            name: sessionError?.name,
          })
          setVerificationState('error')
          router.replace(
            `/?error=verification_failed&message=${encodeURIComponent(sessionError.message)}`
          )
          return
        }

        if (!session) {
          console.error('No session found after verification')
          setVerificationState('error')
          router.replace('/?error=no_session')
          return
        }

        console.log('Verification successful:', {
          user: session.user.email,
          sessionExpiresAt: session.expires_at,
        })

        // Success! Show success state briefly before redirect
        setVerificationState('success')
        setTimeout(() => {
          router.replace('/?verified=true')
        }, 1500)
      } catch (error) {
        console.error('Unexpected callback error:', error)
        setVerificationState('error')
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        router.replace(`/?error=unknown&message=${encodeURIComponent(errorMessage)}`)
      }
    }

    handleCallback()
  }, [router, supabase])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="relative text-center">
        {verificationState === 'verifying' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-8"
          >
            <VerificationAnimation />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Preparing Your Arena Access...</h2>
              <p className="text-yellow-400">
                Validating your credentials for early access to Latent Arena
              </p>
            </div>
          </motion.div>
        )}
        {verificationState === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="mx-auto mb-6 text-6xl"
            >
              🎮
            </motion.div>
            <h2 className="mb-4 text-2xl font-bold text-white">Welcome to Latent Arena!</h2>
            <p className="text-yellow-400">{"You're now on the exclusive early access list."}</p>
          </motion.div>
        )}
        {verificationState === 'error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="mb-4 text-2xl font-bold text-white">Verification Failed</h2>
            <p className="text-yellow-400">Unable to verify your email. Please try again.</p>
            <p className="mt-4 text-white">Redirecting you back...</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
