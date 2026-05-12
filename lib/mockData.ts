export interface Post {
  id: string
  user: {
    name: string
    avatar: string
  }
  mediaUrl: string
  mediaType: 'image' | 'video'
  caption: string
  reactions: Record<string, number>
  timeAgo: string
  isNew?: boolean
}

export function getMockPosts(): Post[] {
  return [
    {
      id: '1',
      user: { name: 'Maya Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
      mediaUrl: 'https://picsum.photos/seed/sq-red1/500/500',
      mediaType: 'image',
      caption: 'Found this gorgeous red mailbox downtown!! 📮✨',
      reactions: { '❤️': 24, '🔥': 18, '😂': 3, '👏': 7 },
      timeAgo: '23m ago',
    },
    {
      id: '2',
      user: { name: 'Jake Rivera', avatar: 'https://i.pravatar.cc/150?img=12' },
      mediaUrl: 'https://picsum.photos/seed/sq-red2/500/500',
      mediaType: 'image',
      caption: 'Red door in my neighborhood — been walking past it for years 🚪',
      reactions: { '❤️': 41, '🔥': 29, '😂': 0, '👏': 15 },
      timeAgo: '1h ago',
    },
    {
      id: '3',
      user: { name: 'Sofia Andrade', avatar: 'https://i.pravatar.cc/150?img=9' },
      mediaUrl: 'https://picsum.photos/seed/sq-red3/500/500',
      mediaType: 'image',
      caption: 'My red jacket counts right?? 😂🔴',
      reactions: { '❤️': 56, '🔥': 12, '😂': 88, '👏': 22 },
      timeAgo: '2h ago',
    },
    {
      id: '4',
      user: { name: 'Theo Williams', avatar: 'https://i.pravatar.cc/150?img=18' },
      mediaUrl: 'https://picsum.photos/seed/sq-red4/500/500',
      mediaType: 'image',
      caption: 'Fire hydrant on my morning run. A classic. 🏃',
      reactions: { '❤️': 33, '🔥': 44, '😂': 5, '👏': 11 },
      timeAgo: '3h ago',
    },
    {
      id: '5',
      user: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=25' },
      mediaUrl: 'https://picsum.photos/seed/sq-red5/500/500',
      mediaType: 'image',
      caption: 'Red roses from my garden 🌹🌹 Living the quest!',
      reactions: { '❤️': 97, '🔥': 31, '😂': 2, '👏': 43 },
      timeAgo: '4h ago',
    },
    {
      id: '6',
      user: { name: 'Luca Marino', avatar: 'https://i.pravatar.cc/150?img=33' },
      mediaUrl: 'https://picsum.photos/seed/sq-red6/500/500',
      mediaType: 'image',
      caption: 'Does tomato sauce count? Asking for a friend 🍅',
      reactions: { '❤️': 28, '🔥': 8, '😂': 124, '👏': 19 },
      timeAgo: '5h ago',
    },
    {
      id: '7',
      user: { name: 'Amara Diallo', avatar: 'https://i.pravatar.cc/150?img=44' },
      mediaUrl: 'https://picsum.photos/seed/sq-red7/500/500',
      mediaType: 'image',
      caption: 'Red phone booth! London calling 📞🇬🇧',
      reactions: { '❤️': 62, '🔥': 55, '😂': 9, '👏': 31 },
      timeAgo: '6h ago',
    },
    {
      id: '8',
      user: { name: 'Noah Park', avatar: 'https://i.pravatar.cc/150?img=53' },
      mediaUrl: 'https://picsum.photos/seed/sq-red8/500/500',
      mediaType: 'image',
      caption: 'Wore my red sneakers especially for this 👟🔴 no regrets',
      reactions: { '❤️': 45, '🔥': 37, '😂': 14, '👏': 28 },
      timeAgo: '8h ago',
    },
  ]
}

export const REACTION_EMOJIS = ['❤️', '🔥', '😂', '👏'] as const
