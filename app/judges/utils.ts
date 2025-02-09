export const JUDGES = [
  {
    name: 'Ronald Triumph',
    title: 'The Deal Artist',
    type: 'LEGENDARY',
    description: 'Nobody knows viral content better than me, believe me folks!',
    avatar: '/images/judges/ronald.png',
    roastQuote:
      "Folks, this is worse than when they told me I couldn't buy Greenland. Terrible ratings, even China is doing better. SAD!",
    metrics: {
      roast: 95,
      tech: 40,
      hype: 100,
      sass: 90,
    },
    cardColor: 'from-red-500 to-yellow-500',
    expertise: ['Marketing', 'Hype', 'Engagement'],
    rotationSchedule: 0,
  },
  {
    name: 'Elon Tusk',
    title: 'The Meme Lord',
    type: 'MYTHIC',
    description: 'Rating content with neural links and Mars-approved memes',
    avatar: '/images/judges/tusk.png',
    roastQuote:
      'My neural network suggests a 69.420% chance this was made by a bot running on a potato. Time to deploy the memes.',
    metrics: {
      roast: 85,
      tech: 100,
      hype: 90,
      sass: 80,
    },
    cardColor: 'from-blue-500 to-cyan-500',
    expertise: ['Innovation', 'Technology', 'Memes'],
    rotationSchedule: 1,
  },
  {
    name: 'Dick Sanchez',
    title: 'The Smartest Being',
    type: 'ULTRA RARE',
    description: 'Wubba lubba dub dub! *burp* Time to rate some content!',
    avatar: '/images/judges/rick.jpeg',
    roastQuote:
      "*burp* M-Morty, I've seen better creativity in a Jerry's daycare center. And that's saying something *burp*",
    metrics: {
      roast: 100,
      tech: 100,
      hype: 70,
      sass: 100,
    },
    cardColor: 'from-green-400 to-cyan-500',
    expertise: ['Science', 'Innovation', 'Multiverse'],
    rotationSchedule: 2,
  },
  {
    name: 'Jan Yang',
    title: 'The Silicon Savage',
    type: 'MYTHIC',
    description: 'Special occasion? I eat the fish.',
    avatar: '/images/judges/jian.png',
    roastQuote:
      'Eric Bachman, this your mom. You are not my baby. Your video? Not hot dog. Is trash.',
    metrics: {
      roast: 90,
      tech: 85,
      hype: 60,
      sass: 95,
    },
    cardColor: 'from-purple-500 to-pink-500',
    expertise: ['Startups', 'AI', 'Disruption'],
    rotationSchedule: 3,
  },
  {
    name: 'Erik Cartwright',
    title: 'The Respect Authority',
    type: 'LEGENDARY',
    description: 'Respect my authoritah! Time to rate some content!',
    avatar: '/images/judges/eric.jpeg',
    roastQuote:
      "This content is so weak it makes Kenny's immune system look like a superhero. Screw you guys, I'm giving this zero stars!",
    metrics: {
      roast: 100,
      tech: 50,
      hype: 95,
      sass: 100,
    },
    cardColor: 'from-red-500 to-orange-500',
    expertise: ['Manipulation', 'Social', 'Trends'],
    rotationSchedule: 4,
  },
  {
    name: 'Dr. Shelton Cooper',
    title: 'The Theoretical Judge',
    type: 'ULTRA RARE',
    description: 'Bazinga! Time for some peer review!',
    avatar: '/images/judges/sheldon.png',
    roastQuote:
      'Your understanding of basic principles is so flawed, it makes geology look like a real science. Bazinga!',
    metrics: {
      roast: 80,
      tech: 100,
      hype: 40,
      sass: 85,
    },
    cardColor: 'from-indigo-500 to-blue-500',
    expertise: ['Analysis', 'Theory', 'Precision'],
    rotationSchedule: 5,
  },
  {
    name: 'Mike Scarn',
    title: "The World's Best Judge",
    type: 'LEGENDARY',
    description: "That's what she said! - about great content",
    avatar: '/images/judges/michael.png',
    roastQuote:
      "I'm not superstitious, but I am a little stitious, and this gives me bad vibes. That's what she said!",
    metrics: {
      roast: 85,
      tech: 30,
      hype: 90,
      sass: 95,
    },
    cardColor: 'from-blue-400 to-purple-500',
    expertise: ['Entertainment', 'Management', 'Fun'],
    rotationSchedule: 6,
  },
  {
    name: 'Peter Griffith',
    title: 'The Meme Machine',
    type: 'MYTHIC',
    description: "Hehehehehe, time to judge some freakin' awesome reels!",
    avatar: '/images/judges/peter.jpeg',
    roastQuote:
      'Hehehehehe, this reminds me of that time I tried to become a social media influencer. Spoiler alert: it ended with a chicken fight. Nyehehehehe!',
    metrics: {
      roast: 90,
      tech: 20,
      hype: 85,
      sass: 100,
    },
    cardColor: 'from-green-500 to-yellow-500',
    expertise: ['Entertainment', 'Pop Culture', 'Comedy'],
    rotationSchedule: 0,
  },
] as const

export function getActiveJudges() {
  const currentDay = new Date().getDay()
  return JUDGES.filter((judge, index) => {
    // Get 4 judges based on current day rotation
    const adjustedIndex = (index + currentDay) % JUDGES.length
    return adjustedIndex < 4
  })
}
