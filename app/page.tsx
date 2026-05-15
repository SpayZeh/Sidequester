'use client'

import { useState } from 'react'
import QuestBanner from '@/components/QuestBanner'
import Feed from '@/components/Feed'
import SubmitModal from '@/components/SubmitModal'
import { getTodaysQuest } from '@/lib/quests'
import { getMockPosts } from '@/lib/mockData'
import type { Post } from '@/lib/mockData'

export default function Home() {
  const quest = getTodaysQuest()
  const [posts, setPosts] = useState<Post[]>(getMockPosts())
  const [showModal, setShowModal] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  const handleSubmit = (mediaUrl: string, caption: string, mediaType: 'image' | 'video') => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: { name: 'You', avatar: 'https://i.pravatar.cc/150?img=70' },
      mediaUrl,
      mediaType,
      caption,
      reactions: { '❤️': 0, '🔥': 0, '😂': 0, '👏': 0 },
      timeAgo: 'just now',
      isNew: true,
    }
    setPosts(prev => [newPost, ...prev])
    setHasCompleted(true)
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50 px-4 py-3 flex items-center justify-between">
        <span className="font-black text-xl tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          questie
        </span>
        {!hasCompleted && (
          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-1.5 rounded-full"
          >
            + post
          </button>
        )}
      </header>

      <main className="max-w-md mx-auto pb-8">
        <QuestBanner quest={quest} onComplete={() => setShowModal(true)} hasCompleted={hasCompleted} />
        <Feed posts={posts} />
      </main>

      {showModal && (
        <SubmitModal
          quest={quest}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
