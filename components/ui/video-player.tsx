'use client'

import { useState } from 'react'

interface VideoPlayerProps {
  videoId: string
  title: string
  isActive?: boolean
}

export function VideoPlayer({ videoId, title, isActive = false }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-zinc-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
        </div>
      )}
      <iframe
        className={`h-full w-full transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${
          isActive ? '1' : '0'
        }&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />

      {/* Overlay for inactive state */}
      {!isActive && (
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 hover:bg-black/30">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/90 text-black">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
