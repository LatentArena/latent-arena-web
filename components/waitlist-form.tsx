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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
  const supabase = createClientComponentClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      console.log('Submitting form with values:', values)

      const callbackUrl = `${window.location.origin}/auth/callback`
      console.log('Using callback URL:', callbackUrl)

      // Send magic link using signInWithOtp
      const { data, error: authError } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: callbackUrl,
          shouldCreateUser: true,
          data: {
            wallet_address: values.wallet || '',
            twitter_handle: values.twitter || '',
            joined_waitlist_at: new Date().toISOString(),
          },
        },
      })

      console.log('Auth response:', {
        data,
        error: authError,
        redirectTo: callbackUrl,
      })

      if (authError) {
        console.error('Auth error:', {
          message: authError.message,
          status: authError?.status,
          name: authError?.name,
        })
        throw authError
      }

      toast({
        title: 'Check your email',
        description: 'We sent you a magic link to verify your email and join the waitlist!',
      })

      form.reset()
    } catch (error) {
      console.error('Form submission error:', error)
      let errorMessage = 'There was a problem joining the waitlist. Please try again.'

      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          errorMessage = 'Please wait a few minutes before requesting another verification email.'
        }
        console.error('Detailed error:', {
          message: error.message,
          name: error.name,
        })
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
            {isLoading ? 'Sending...' : 'Join Waitlist'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
