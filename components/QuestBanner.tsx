'use client'

import { useState, useEffect } from 'react'
import { getSecondsUntilMidnightUTC, formatCountdown } from '@/lib/quests'
import type { Quest } from '@/lib/quests'

interface QuestBannerProps {
  quest: Quest & { questNumber: number }
  onComplete: () => void
  hasCompleted: boolean
}

export default function QuestBanner({ quest, onComplete, hasCompleted }: QuestBannerProps) {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSecondsLeft(getSecondsUntilMidnightUTC())
    const interval = setInterval(() => {
      setSecondsLeft(getSecondsUntilMidnightUTC())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const urgencyColor =
    secondsLeft < 3600
      ? 'text-red-300'
      : secondsLeft < 10800
      ? 'text-amber-300'
      : 'text-violet-200'

  return (
    <div className="mx-4 mt-4 mb-2">
      {/* Gradient border trick */}
      <div className="rounded-2xl p-px bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400">
        <div className="rounded-2xl bg-gradient-to-br from-violet-950 via-purple-900 to-pink-950 p-5">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">
              Quest #{quest.questNumber}
            </span>
            <span className="text-xs font-semibold text-pink-300 bg-pink-500/20 border border-pink-500/30 px-2.5 py-0.5 rounded-full">
              {quest.category}
            </span>
          </div>

          {/* Emoji */}
          <div className="text-6xl mb-3 leading-none">{quest.emoji}</div>

          {/* Title + description */}
          <h2 className="text-2xl font-black text-white mb-1 leading-tight">{quest.title}</h2>
          <p className="text-purple-200 text-sm leading-relaxed mb-4">{quest.description}</p>

          {/* Hint */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 mb-4">
            <p className="text-xs text-purple-300">
              <span className="text-yellow-400">💡</span> {quest.hint}
            </p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-base">⏰</span>
            <span className={`font-mono text-2xl font-black tracking-tight ${urgencyColor}`}>
              {mounted ? formatCountdown(secondsLeft) : '--:--:--'}
            </span>
            <span className="text-xs text-purple-400 ml-1">remaining</span>
          </div>

          {/* CTA */}
          {hasCompleted ? (
            <div className="w-full flex items-center justify-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold py-3.5 rounded-xl text-sm">
              <span className="text-lg">✓</span>
              Quest Completed! Great work today 🎉
            </div>
          ) : (
            <button
              onClick={onComplete}
              className="w-full bg-white text-violet-900 font-black py-3.5 rounded-xl hover:bg-violet-50 active:scale-95 transition-all duration-150 text-sm tracking-wide"
            >
              Complete Quest →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
