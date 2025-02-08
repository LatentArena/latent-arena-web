export default function ExtensionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Predict Anywhere</h1>
          <p className="text-lg text-gray-400">
            Our Chrome extension lets you make predictions directly on YouTube
          </p>
        </div>

        {/* Browser Mock */}
        <div className="overflow-hidden rounded-2xl bg-zinc-900">
          {/* Browser Chrome */}
          <div className="flex items-center gap-4 bg-zinc-800 p-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 rounded-full bg-zinc-700 px-4 py-2 text-sm text-gray-400">
              youtube.com/shorts/xyz
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-zinc-700" />
              <div className="h-8 w-8 rounded-full bg-zinc-700" />
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
            {/* Video Area */}
            <div className="aspect-[9/16] overflow-hidden rounded-xl bg-zinc-800">
              <img
                src="https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg"
                alt="Video"
                className="h-full w-full object-cover"
              />
            </div>

            {/* YouTube Interface */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-zinc-800" />
                <div className="flex-1">
                  <h3 className="mb-1 font-bold">Mind-blowing AI Dance Moves 🤖</h3>
                  <p className="text-sm text-gray-400">@aiDancer • 2 hours ago</p>
                </div>
              </div>

              {/* Extension Overlay */}
              <div className="rounded-xl border border-zinc-800 bg-black/90 p-6 backdrop-blur">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                      <span className="font-bold text-black">LA</span>
                    </div>
                    <span className="font-bold">LatentArena</span>
                  </div>
                  <div className="text-sm text-gray-400">24h window</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-400">Current Pool</span>
                      <span className="font-medium">25.5 SOL</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                      <div className="h-full w-3/4 bg-gradient-to-r from-yellow-400 to-orange-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="rounded-lg bg-zinc-800 p-3 text-sm transition hover:bg-zinc-700">
                      Low Impact (0.1-0.3)
                    </button>
                    <button className="rounded-lg bg-zinc-800 p-3 text-sm transition hover:bg-zinc-700">
                      Moderate (0.4-0.6)
                    </button>
                    <button className="rounded-lg bg-zinc-800 p-3 text-sm transition hover:bg-zinc-700">
                      High Impact (0.7-0.8)
                    </button>
                    <button className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 p-3 text-sm font-medium text-black">
                      Viral Hit (0.9-1.0)
                    </button>
                  </div>

                  <button className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 py-3 font-bold text-black">
                    Make Prediction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extension Features */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'One-Click Predictions',
              description: 'Make predictions directly while browsing YouTube Shorts',
            },
            {
              title: 'Real-time Updates',
              description: 'Track your predictions and pool sizes as they happen',
            },
            {
              title: 'Smart Notifications',
              description: 'Get notified when prediction windows are closing',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl bg-zinc-900 p-6 transition hover:bg-zinc-800"
            >
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
