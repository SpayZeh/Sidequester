'use client'

import { useState, useRef } from 'react'
import type { Quest } from '@/lib/quests'

interface SubmitModalProps {
  quest: Quest & { questNumber: number }
  onSubmit: (mediaUrl: string, caption: string, mediaType: 'image' | 'video') => void
  onClose: () => void
}

export default function SubmitModal({ quest, onSubmit, onClose }: SubmitModalProps) {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [caption, setCaption] = useState('')
  const [posting, setPosting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const type = file.type.startsWith('video/') ? 'video' : 'image'
    setMediaType(type)
    if (mediaUrl) URL.revokeObjectURL(mediaUrl)
    setMediaUrl(URL.createObjectURL(file))
  }

  const handleClearMedia = () => {
    if (mediaUrl) URL.revokeObjectURL(mediaUrl)
    setMediaUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handlePost = async () => {
    if (!mediaUrl) return
    setPosting(true)
    await new Promise(r => setTimeout(r, 600))
    onSubmit(mediaUrl, caption.trim(), mediaType)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-zinc-900 rounded-t-3xl sm:rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-zinc-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-4 pb-4 border-b border-zinc-800">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-black text-lg text-white leading-tight">Post your quest</h3>
              <p className="text-sm text-zinc-400 mt-0.5">
                {quest.emoji} {quest.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition-colors ml-3 mt-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Upload area */}
          {!mediaUrl ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square rounded-2xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center gap-3 hover:border-violet-500 hover:bg-violet-500/5 active:scale-99 transition-all duration-200 mb-4 group"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-800 group-hover:bg-violet-500/15 flex items-center justify-center transition-colors">
                <span className="text-3xl">📷</span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-white text-sm">Add photo or video</p>
                <p className="text-xs text-zinc-500 mt-1">Show the world your completion!</p>
              </div>
            </button>
          ) : (
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-zinc-800">
              {mediaType === 'video' ? (
                <video src={mediaUrl} controls playsInline className="w-full h-full object-cover" />
              ) : (
                <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
              )}
              <button
                onClick={handleClearMedia}
                className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              >
                Change
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Caption */}
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Add a caption… (optional)"
            rows={2}
            maxLength={280}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 resize-none focus:outline-none focus:border-violet-500 transition-colors mb-4"
          />

          {/* Post button */}
          <button
            onClick={handlePost}
            disabled={!mediaUrl || posting}
            className="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-black py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:from-violet-500 hover:to-pink-400 active:scale-95 transition-all duration-150 text-sm tracking-wide flex items-center justify-center gap-2"
          >
            {posting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Posting…
              </>
            ) : (
              <>Share it ✦</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
