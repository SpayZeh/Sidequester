'use client'

import type { Quest } from '@/lib/quests'

interface QuestBannerProps {
  quest: Quest & { questNumber: number }
  onComplete: () => void
  hasCompleted: boolean
}

export default function QuestBanner({ quest, onComplete, hasCompleted }: QuestBannerProps) {
  return (
    <div className="mx-4 mt-4 mb-2">
      <div className="rounded-2xl p-px bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400">
        <div className="rounded-2xl bg-zinc-900 px-4 py-3.5 flex items-center gap-3">
          <span className="text-3xl leading-none shrink-0">{quest.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-0.5">
              {quest.category}
            </p>
            <h2 className="text-sm font-black text-white leading-tight truncate">{quest.title}</h2>
            <p className="text-xs text-zinc-500 leading-tight mt-0.5 line-clamp-1">{quest.description}</p>
          </div>
          {hasCompleted ? (
            <div className="shrink-0 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <span className="text-xs font-bold text-emerald-400">✓ Done!</span>
            </div>
          ) : (
            <button
              onClick={onComplete}
              className="shrink-0 bg-white text-zinc-900 font-black text-xs px-4 py-2 rounded-full hover:bg-violet-50 active:scale-95 transition-all whitespace-nowrap"
            >
              Do it →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
