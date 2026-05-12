'use client'

import PostCard from './PostCard'
import type { Post } from '@/lib/mockData'

interface FeedProps {
  posts: Post[]
}

export default function Feed({ posts }: FeedProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-zinc-600 px-8 text-center">
        <span className="text-5xl mb-4">📷</span>
        <p className="font-semibold text-zinc-400 text-lg">No completions yet</p>
        <p className="text-sm mt-1">Be the first to complete today's quest!</p>
      </div>
    )
  }

  return (
    <section className="pt-3">
      <div className="flex items-center gap-2 px-4 mb-3">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Today's Completions
        </span>
        <span className="text-xs font-bold text-violet-400 bg-violet-500/15 px-1.5 py-0.5 rounded-full">
          {posts.length}
        </span>
      </div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  )
}
