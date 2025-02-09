import ResultsContent from './results-content'

// Mock data for demo - keep this in the server component
const RESULT_DATA = {
  jopwfhsdTuc: {
    title: 'BTS Permission to Dance Challenge',
    creator: '@bts.bighitofficial',
    finalScore: 8.7,
    totalPool: 125.5,
    winners: [
      { type: 'Creator', handle: '@bts.bighitofficial', reward: 25.1, range: '0.5' },
      { type: 'Predictor', handle: '@crypto_wizard', reward: 15.3, range: '0.25' },
      { type: 'Predictor', handle: '@viral_hunter', reward: 12.8, range: '0.1' },
      { type: 'Predictor', handle: '@trend_spotter', reward: 8.2, range: '0.5' },
    ],
    judgeComments: [
      {
        name: 'Ronald Triumph',
        comment:
          'Tremendous energy! The best dance moves, maybe ever. Viral potential through the roof!',
        score: 9.1,
      },
      {
        name: 'Dr. Shelton Cooper',
        comment: 'The choreographic precision demonstrates remarkable spatial awareness. Bazinga!',
        score: 8.5,
      },
      {
        name: 'Mike Scarn',
        comment: "That's what I call entertainment! The energy is infectious.",
        score: 8.9,
      },
      {
        name: 'Peter Griffith',
        comment: 'Hehehe, this is better than that time I tried K-pop dancing!',
        score: 8.3,
      },
    ],
  },
  '4CXRdcKbCZc': {
    title: 'When in India',
    creator: '@travelvibes',
    finalScore: 7.2,
    totalPool: 85.0,
    winners: [
      { type: 'Creator', handle: '@travelvibes', reward: 17.0, range: '0.5' },
      { type: 'Predictor', handle: '@wanderlust_pro', reward: 12.5, range: '0.25' },
      { type: 'Predictor', handle: '@culture_scout', reward: 8.5, range: '0.1' },
      { type: 'Predictor', handle: '@travel_guru', reward: 6.2, range: '0.5' },
    ],
    judgeComments: [
      {
        name: 'Ronald Triumph',
        comment:
          'Beautiful cinematography, folks. The colors, the culture - tremendous production value!',
        score: 7.5,
      },
      {
        name: 'Dr. Shelton Cooper',
        comment:
          'The cultural authenticity is fascinating, though the vertical format limits the panoramic potential.',
        score: 6.8,
      },
      {
        name: 'Mike Scarn',
        comment: 'This reminds me of that time I tried butter chicken. What a journey!',
        score: 7.4,
      },
      {
        name: 'Peter Griffith',
        comment:
          'Hehehe, more exotic than that time I ordered "extra spicy" at the Indian restaurant!',
        score: 7.1,
      },
    ],
  },
  nLXBinY7BwI: {
    title: 'Poor Cat Was Laughed',
    creator: '@hmminds',
    finalScore: 9.1,
    totalPool: 156.8,
    winners: [
      { type: 'Creator', handle: '@hmminds', reward: 31.3, range: '0.5' },
      { type: 'Predictor', handle: '@meme_master', reward: 18.8, range: '0.1' },
      { type: 'Predictor', handle: '@viral_sage', reward: 15.6, range: '0.25' },
      { type: 'Predictor', handle: '@laugh_tracker', reward: 12.5, range: '0.5' },
    ],
    judgeComments: [
      {
        name: 'Ronald Triumph',
        comment: 'This cat has better comedic timing than most comedians. Huge viral potential!',
        score: 9.3,
      },
      {
        name: 'Dr. Shelton Cooper',
        comment:
          "The feline's facial expressions demonstrate remarkable emotional range. Fascinating!",
        score: 8.9,
      },
      {
        name: 'Mike Scarn',
        comment: "That's what she said! About the cat's perfect timing!",
        score: 9.2,
      },
      {
        name: 'Peter Griffith',
        comment: 'Nyehehehehe, this cat is funnier than Brian after a catnip binge!',
        score: 9.0,
      },
    ],
  },
  tntmwLvbHCo: {
    title: 'Dad of the Year',
    creator: '@funnymoments',
    finalScore: 6.8,
    totalPool: 72.5,
    winners: [
      { type: 'Creator', handle: '@funnymoments', reward: 14.5, range: '0.5' },
      { type: 'Predictor', handle: '@dad_joke_expert', reward: 10.8, range: '0.25' },
      { type: 'Predictor', handle: '@family_content', reward: 7.2, range: '0.1' },
      { type: 'Predictor', handle: '@wholesome_wins', reward: 5.4, range: '0.5' },
    ],
    judgeComments: [
      {
        name: 'Ronald Triumph',
        comment: 'Good family values, very wholesome. Could use more production value though.',
        score: 6.5,
      },
      {
        name: 'Dr. Shelton Cooper',
        comment:
          'While the paternal instincts are admirable, the execution lacks scientific precision.',
        score: 6.7,
      },
      {
        name: 'Mike Scarn',
        comment: 'As a regional dad myself, I approve this message!',
        score: 7.1,
      },
      {
        name: 'Peter Griffith',
        comment: 'Hey Lois, this guy might be a better dad than me! Hehehe... wait.',
        score: 6.9,
      },
    ],
  },
  '4z_6MuN3JTQ': {
    title: 'Monica Freaks Out Chandler',
    creator: '@friends',
    finalScore: 8.9,
    totalPool: 143.2,
    winners: [
      { type: 'Creator', handle: '@friends', reward: 28.6, range: '0.5' },
      { type: 'Predictor', handle: '@sitcom_expert', reward: 17.2, range: '0.1' },
      { type: 'Predictor', handle: '@comedy_analyst', reward: 14.3, range: '0.25' },
      { type: 'Predictor', handle: '@nostalgia_pro', reward: 11.4, range: '0.5' },
    ],
    judgeComments: [
      {
        name: 'Ronald Triumph',
        comment: "Classic comedy, folks. They don't make them like this anymore. Huge engagement!",
        score: 9.0,
      },
      {
        name: 'Dr. Shelton Cooper',
        comment:
          'The situational humor demonstrates optimal comedic structure. Though I prefer physics jokes.',
        score: 8.7,
      },
      {
        name: 'Mike Scarn',
        comment: 'This is better than Prison Mike! The way the turntables...',
        score: 9.1,
      },
      {
        name: 'Peter Griffith',
        comment: 'Reminds me of when Lois gets mad about my shenanigans!',
        score: 8.8,
      },
    ],
  },
}

export default function ResultsPage({ params }: { params: { shortId: string } }) {
  return (
    <ResultsContent
      params={params}
      initialData={RESULT_DATA[params.shortId as keyof typeof RESULT_DATA]}
    />
  )
}

// Generate static paths for demo videos
export function generateStaticParams() {
  return Object.keys(RESULT_DATA).map((shortId) => ({
    shortId,
  }))
}
