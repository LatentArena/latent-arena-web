'use client'

import { useState } from 'react'
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
  email: z.string().email(),
  wallet: z.string().optional(),
  twitter: z.string().optional(),
})

export function WaitlistForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)

      // Check if email already exists in waitlist
      const { data: existingEntries, error: checkError } = await supabase
        .from('waitlist')
        .select('email, verified')
        .eq('email', values.email)

      if (checkError) {
        throw checkError
      }

      const existingEntry = existingEntries?.[0]

      if (existingEntry?.verified) {
        toast({
          title: 'Already Verified',
          description: 'This email is already verified and on our waitlist.',
          variant: 'destructive',
        })
        return
      }

      // Insert or update the waitlist entry first
      const { error: dbError } = await supabase.from('waitlist').upsert(
        {
          email: values.email,
          wallet_address: values.wallet || null,
          twitter_handle: values.twitter || null,
          verified: false,
        },
        { onConflict: 'email' }
      )

      if (dbError) throw dbError

      // Then send the verification email
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          shouldCreateUser: true,
          data: {
            email: values.email,
            wallet_address: values.wallet || null,
            twitter_handle: values.twitter || null,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) throw authError

      toast({
        title: existingEntry ? 'Verification Email Resent' : 'Verification email sent!',
        description: 'Please check your email to verify your address.',
      })
      form.reset()
    } catch (error) {
      console.error('Error:', error)
      let errorMessage = 'There was a problem joining the waitlist. Please try again.'

      // Check if it's an email sending error
      if (error instanceof Error && error.message.includes('send email')) {
        errorMessage =
          'Unable to send verification email. Our team has been notified. Please try again later.'
        // Log the error for monitoring
        console.error('Email sending error:', error)
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
