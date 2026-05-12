'use client'

import { useState } from 'react'
import type { Post } from '@/lib/mockData'
import { REACTION_EMOJIS } from '@/lib/mockData'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const [reacted, setReacted] = useState<Set<string>>(new Set())
  const [imgError, setImgError] = useState(false)

  const handleReact = (emoji: string) => {
    setReacted(prev => {
      const next = new Set(prev)
      if (next.has(emoji)) {
        next.delete(emoji)
      } else {
        next.add(emoji)
      }
      return next
    })
  }

  return (
    <div className="mx-4 mb-4 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80">
      {/* User header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-9 h-9 rounded-full object-cover bg-zinc-700"
          onError={e => {
            ;(e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.user.name)}&background=6d28d9&color=fff`
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-white truncate">{post.user.name}</p>
          <p className="text-xs text-zinc-500">{post.timeAgo}</p>
        </div>
        {post.isNew && (
          <span className="shrink-0 text-xs font-bold text-violet-400 bg-violet-500/20 border border-violet-500/30 px-2 py-0.5 rounded-full">
            New!
          </span>
        )}
      </div>

      {/* Media */}
      <div className="relative aspect-square bg-zinc-800">
        {post.mediaType === 'video' ? (
          <video
            src={post.mediaUrl}
            controls
            playsInline
            className="w-full h-full object-cover"
          />
        ) : imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
            <span className="text-4xl">📷</span>
            <span className="text-xs">Photo unavailable</span>
          </div>
        ) : (
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Caption + reactions */}
      <div className="px-4 py-3">
        {post.caption && (
          <p className="text-sm text-zinc-200 mb-3 leading-relaxed">
            <span className="font-semibold text-white">{post.user.name}</span>{' '}
            {post.caption}
          </p>
        )}

        <div className="flex gap-2 flex-wrap">
          {REACTION_EMOJIS.map(emoji => {
            const base = post.reactions[emoji] ?? 0
            const bonus = reacted.has(emoji) ? 1 : 0
            const count = base + bonus
            const active = reacted.has(emoji)
            return (
              <button
                key={emoji}
                onClick={() => handleReact(emoji)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-violet-500/25 border border-violet-500/50 scale-105'
                    : 'bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 active:scale-95'
                }`}
              >
                <span className="leading-none">{emoji}</span>
                {count > 0 && (
                  <span className={`text-xs font-semibold ${active ? 'text-violet-300' : 'text-zinc-400'}`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
