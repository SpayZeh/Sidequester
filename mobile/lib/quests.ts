export interface Quest {
  id: number
  title: string
  description: string
  category: string
  emoji: string
  hint: string
}

const quests: Quest[] = [
  { id: 1, title: 'Red Alert', description: 'Find something RED and take a selfie with it', category: 'Color Hunt', emoji: '🔴', hint: 'Red cars, fire hydrants, roses — anything red works!' },
  { id: 2, title: 'Dog Whisperer', description: 'Pet a dog and take a photo together', category: 'Animal Love', emoji: '🐕', hint: "Yours, a friend's, or a stranger's — with permission!" },
  { id: 3, title: 'Call Mom', description: 'Call your mom (or someone you love) and screenshot it', category: 'Connection', emoji: '📞', hint: 'A video call counts double! Any loved one is perfect.' },
  { id: 4, title: 'Sky Watcher', description: "Photograph today's sky — clouds, blue, or golden hour", category: 'Nature', emoji: '☁️', hint: 'Any time of day counts. Dramatic clouds are a bonus!' },
  { id: 5, title: 'Food Explorer', description: "Try a food you've never eaten before and document it", category: 'Foodie', emoji: '🍜', hint: 'One bite counts. Be brave — your face reaction is the post!' },
  { id: 6, title: 'Street Art', description: 'Find a piece of street art and stand next to it', category: 'Culture', emoji: '🎨', hint: 'Murals, graffiti, sculptures — anything public art counts!' },
  { id: 7, title: 'Yellow Fellow', description: 'Find something YELLOW and photograph it', category: 'Color Hunt', emoji: '🟡', hint: 'Flowers, taxis, signs, or a banana — all valid!' },
  { id: 8, title: 'Random Act of Kindness', description: 'Do something kind for a stranger and document it', category: 'Kindness', emoji: '💛', hint: 'Hold a door, buy a coffee, leave a kind note!' },
  { id: 9, title: 'Green Machine', description: 'Find something GREEN in nature and photograph it', category: 'Color Hunt', emoji: '🟢', hint: 'Plants, leaves, moss — the more nature-y the better!' },
  { id: 10, title: 'Mirror Mirror', description: 'Take a creative mirror selfie', category: 'Creative', emoji: '🪞', hint: 'Bathroom mirrors, car mirrors, shop windows — all count!' },
  { id: 11, title: 'Cat Whisperer', description: 'Find a cat and get a photo together', category: 'Animal Love', emoji: '🐈', hint: 'Indoor or outdoor cats. Even a cat café photo works!' },
  { id: 12, title: 'Flower Power', description: 'Find a flower and photograph it up close', category: 'Nature', emoji: '🌸', hint: 'Wild, garden, or shop flowers — any bloom counts!' },
  { id: 13, title: 'Blue Mood', description: 'Find something BLUE and take a photo with it', category: 'Color Hunt', emoji: '🔵', hint: 'Blue doors, clothing, sky, or ocean!' },
  { id: 14, title: 'Chef Mode', description: 'Cook something from scratch and photograph your creation', category: 'Foodie', emoji: '👨‍🍳', hint: 'Even toast with toppings counts! Presentation matters.' },
  { id: 15, title: 'Water World', description: 'Find a body of water and take a photo with it', category: 'Nature', emoji: '💧', hint: 'Ocean, lake, river, fountain, or even a big puddle!' },
  { id: 16, title: 'Old Friends', description: "Take a photo with someone you haven't seen in a while", category: 'Connection', emoji: '🤝', hint: 'Reaching out is half the quest. Go see someone today!' },
  { id: 17, title: 'Sunset Chaser', description: "Catch tonight's sunset and photograph it", category: 'Nature', emoji: '🌅', hint: 'Find a spot with a clear western horizon!' },
  { id: 18, title: 'Orange You Glad', description: 'Find something ORANGE and take a photo with it', category: 'Color Hunt', emoji: '🟠', hint: 'Traffic cones, pumpkins, citrus, autumn leaves!' },
  { id: 19, title: 'Bookworm', description: 'Visit a bookstore or library and take a photo', category: 'Culture', emoji: '📚', hint: 'Bonus points for finding a book with a great title!' },
  { id: 20, title: 'Workout Win', description: 'Do any form of exercise and document it', category: 'Active', emoji: '💪', hint: 'Walk, run, yoga, dance — moving your body counts!' },
  { id: 21, title: 'Purple Haze', description: 'Find something PURPLE and take a selfie with it', category: 'Color Hunt', emoji: '🟣', hint: 'Lavender, eggplant, purple clothing, or amethyst!' },
  { id: 22, title: 'Bird Watch', description: 'Spot a bird and photograph it', category: 'Animal Love', emoji: '🐦', hint: 'Pigeons totally count. All birds are valid wildlife!' },
  { id: 23, title: 'Night Owl', description: 'Photograph something after dark tonight', category: 'Creative', emoji: '🌙', hint: 'City lights, stars, street lamps — nighttime is magical!' },
  { id: 24, title: 'Sweet Tooth', description: 'Eat your favorite dessert and document the moment', category: 'Foodie', emoji: '🍰', hint: 'Make it, buy it, or share it — the joy is the quest!' },
  { id: 25, title: 'High Vantage', description: 'Get to a high point and take a photo of the view', category: 'Active', emoji: '🏔️', hint: 'A rooftop, hill, bridge, or tall building all work!' },
  { id: 26, title: 'Plant Parent', description: 'Water a plant (or buy one) and photograph it', category: 'Nature', emoji: '🪴', hint: "Your own, a friend's, or a community garden plant!" },
  { id: 27, title: 'Coffee Art', description: 'Get a fancy coffee and photograph the latte art', category: 'Foodie', emoji: '☕', hint: 'Or make your own art on top of any drink!' },
  { id: 28, title: 'Vintage Find', description: 'Find something vintage or antique and photograph it', category: 'Culture', emoji: '🪙', hint: "Old buildings, antique shops, grandma's china!" },
  { id: 29, title: 'Dance Break', description: 'Dance for 30 seconds anywhere and record it', category: 'Active', emoji: '💃', hint: 'Kitchen, park, office — anywhere you feel the vibe!' },
  { id: 30, title: 'Smile Quest', description: 'Make a stranger smile and take a selfie right after', category: 'Kindness', emoji: '😊', hint: 'A compliment, a joke, or just a warm wave!' },
]

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

export function getTodaysQuest(): Quest & { questNumber: number } {
  const today = new Date()
  const day = getDayOfYear(today)
  return { ...quests[(day - 1 + quests.length) % quests.length], questNumber: day }
}

export function getSecondsUntilMidnightUTC(): number {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setUTCHours(24, 0, 0, 0)
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000))
}

export function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
