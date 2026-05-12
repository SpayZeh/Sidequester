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
      {/* Header */}
      <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">🎯</span>
          <span className="font-black text-lg tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            SideQuest
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 font-medium">
            {posts.length} completions
          </span>
          {!hasCompleted && (
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-bold text-violet-400 bg-violet-500/15 border border-violet-500/30 px-3 py-1.5 rounded-full hover:bg-violet-500/25 transition-colors"
            >
              + Complete
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-md mx-auto pb-24">
        <QuestBanner quest={quest} onComplete={() => setShowModal(true)} hasCompleted={hasCompleted} />
        <Feed posts={posts} />
      </main>

      {/* Floating action button (shown when not yet completed) */}
      {!hasCompleted && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-10 px-4 pointer-events-none">
          <button
            onClick={() => setShowModal(true)}
            className="pointer-events-auto bg-gradient-to-r from-violet-600 to-pink-500 text-white font-black px-8 py-4 rounded-full shadow-2xl shadow-violet-900/60 hover:from-violet-500 hover:to-pink-400 hover:scale-105 active:scale-95 transition-all duration-150 text-sm tracking-wide"
          >
            ✓ Complete Today's Quest
          </button>
        </div>
      )}

      {/* Submit modal */}
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
