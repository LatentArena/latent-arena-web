import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - Latent Arena',
  description: 'Authenticate to access Latent Arena',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
