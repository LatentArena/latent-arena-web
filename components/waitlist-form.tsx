'use client'

import { useState, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  wallet: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(val),
      'Please enter a valid Solana wallet address'
    ),
  twitter: z
    .string()
    .optional()
    .refine((val) => !val || /^@?(\w){1,15}$/.test(val), 'Please enter a valid Twitter handle')
    .transform((val) => (!val ? '' : val.startsWith('@') ? val : `@${val}`)),
})

export function WaitlistForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)
  const lastSubmitTime = useRef<number>(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Rate limiting: Allow only 3 submissions per minute
      const now = Date.now()
      if (submitCount >= 3 && now - lastSubmitTime.current < 60000) {
        toast({
          title: 'Too Many Attempts',
          description: 'Please wait a minute before trying again.',
          variant: 'destructive',
        })
        return
      }

      setIsLoading(true)
      setSubmitCount((prev) => prev + 1)
      lastSubmitTime.current = now

      // Use signUp for new users
      const { error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: crypto.randomUUID(), // Generate a random password since we won't use it
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL?.startsWith('http://localhost')
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            : 'https://latentarena.xyz/auth/callback',
          data: {
            email: values.email,
            wallet_address: values.wallet || '',
            twitter_handle: values.twitter || '',
            joined_waitlist_at: new Date().toISOString(),
          },
        },
      })

      if (authError) {
        // Handle rate limiting error specifically
        if (authError.message.includes('rate limit')) {
          toast({
            title: 'Too Many Attempts',
            description: 'Please wait a few minutes before requesting another verification email.',
            variant: 'destructive',
          })
          return
        }
        // If user exists but not verified, resend verification email
        if (authError.message.includes('User already registered')) {
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: values.email,
            options: {
              emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL?.startsWith('http://localhost')
                ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
                : 'https://latentarena.xyz/auth/callback',
            },
          })
          if (resendError) throw resendError
          toast({
            title: 'Verification Email Resent',
            description: 'Please check your email to verify your address.',
          })
          return
        }
        throw authError
      }

      toast({
        title: 'Verification Email Sent',
        description: 'Please check your email to verify your address.',
      })
      form.reset()
    } catch (error) {
      console.error('Error:', error)
      let errorMessage = 'There was a problem joining the waitlist. Please try again.'

      if (error instanceof Error) {
        if (error.message.includes('send email')) {
          errorMessage =
            'Unable to send verification email. Our team has been notified. Please try again later.'
        } else if (error.message.includes('User already registered')) {
          errorMessage =
            'This email is already registered. Please check your inbox for the verification email or try signing up with a different email.'
        }
        console.error('Detailed error:', error)
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <div className="container mx-auto max-w-md px-4">
        <h2 className="font-display mb-12 text-center text-4xl font-bold text-white">
          Join the Waitlist
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      className="border-yellow-400/30 bg-black/50 text-white placeholder:text-yellow-400/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-yellow-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Solana Wallet (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Solana wallet address"
                      className="border-yellow-400/30 bg-black/50 text-white placeholder:text-yellow-400/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-yellow-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Twitter Handle (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="@username"
                      className="border-yellow-400/30 bg-black/50 text-white placeholder:text-yellow-400/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-yellow-400" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-yellow-400 text-black transition-colors hover:bg-yellow-500"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Join Waitlist'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
