'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get hash parameters from URL
        const hashParams = new URLSearchParams(window.location.hash.slice(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const error = hashParams.get('error')
        const errorCode = hashParams.get('error_code')
        const errorDescription = hashParams.get('error_description')

        if (error) {
          switch (errorCode) {
            case 'otp_expired':
              router.push(
                `/?error=expired&message=${encodeURIComponent('Email verification link has expired. Please request a new one.')}`
              )
              return
            case 'access_denied':
              router.push(
                `/?error=invalid&message=${encodeURIComponent('Invalid verification link. Please try again.')}`
              )
              return
            default:
              router.push(
                `/?error=unknown&message=${encodeURIComponent(errorDescription || 'An error occurred during verification.')}`
              )
              return
          }
        }

        if (accessToken && refreshToken) {
          // Set the session using the tokens from the URL
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (sessionError) {
            console.error('Session error:', sessionError)
            router.push(
              `/?error=session&message=${encodeURIComponent('Failed to establish session. Please try again.')}`
            )
            return
          }

          // Get the user's session
          const {
            data: { session },
          } = await supabase.auth.getSession()

          if (session?.user?.email) {
            // Update the waitlist entry to mark it as verified
            const { error: dbError } = await supabase
              .from('waitlist')
              .update({ verified: true })
              .eq('email', session.user.email)

            if (dbError) {
              console.error('Database update error:', dbError)
              router.push(
                `/?error=database&message=${encodeURIComponent('Failed to update verification status. Please try again.')}`
              )
              return
            }

            router.push('/?verified=true')
          } else {
            router.push(
              `/?error=session&message=${encodeURIComponent('No active session found. Please try signing up again.')}`
            )
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        router.push(
          `/?error=unknown&message=${encodeURIComponent('An unexpected error occurred. Please try again.')}`
        )
      }
    }

    handleCallback()
  }, [router, supabase])

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Verifying your email...</h2>
        <p className="text-yellow-400">Please wait while we complete the verification process.</p>
      </div>
    </div>
  )
}
