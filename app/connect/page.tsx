'use client'

export default function ConnectPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">Connect With Us</h1>
          <p className="text-lg text-gray-400">
            Let&apos;s collaborate and build the future of content monetization together
          </p>
        </div>
        <div className="relative aspect-[640/1146] w-full overflow-hidden rounded-xl border border-zinc-800">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSefEyObYPV_3iJvgk96a0jHVK0BinXMFQ3cElE08_hYU5PGHg/viewform?embedded=true"
            className="absolute inset-0 h-full w-full"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  )
}
