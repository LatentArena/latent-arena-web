import { Inter } from 'next/font/google'
import Image from 'next/image'
import { WalletDisplay } from '@/components/ui/wallet-display'
import { Toaster } from 'sonner'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LatentArena Demo',
  description: 'Where content meets AI & prediction',
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} min-h-screen bg-black text-white`}>
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-8">
            <Image
              src="/logo.png"
              alt="LatentArena"
              width={140}
              height={32}
              className="h-16 w-auto"
            />
            <nav className="hidden space-x-6 md:flex">
              <a href="/demo/browse" className="text-gray-300 transition hover:text-white">
                Browse
              </a>
              <a href="/demo/predict/example" className="text-gray-300 transition hover:text-white">
                Predict
              </a>
              <a href="/demo/judges" className="text-gray-300 transition hover:text-white">
                Judges
              </a>
              <a href="/demo/extension" className="text-gray-300 transition hover:text-white">
                Extension
              </a>
            </nav>
          </div>
          <WalletDisplay />
        </div>
      </div>
      <main className="pt-16">{children}</main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#18181b',
            border: '1px solid #27272a',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}
