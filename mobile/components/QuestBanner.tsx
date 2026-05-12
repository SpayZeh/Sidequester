import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { getSecondsUntilMidnightUTC, formatCountdown } from '../lib/quests'
import type { Quest } from '../lib/quests'

interface Props {
  quest: Quest & { questNumber: number }
  onComplete: () => void
  hasCompleted: boolean
}

export default function QuestBanner({ quest, onComplete, hasCompleted }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsUntilMidnightUTC())

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft(getSecondsUntilMidnightUTC()), 1000)
    return () => clearInterval(id)
  }, [])

  const timerColor =
    secondsLeft < 3600 ? '#f87171' : secondsLeft < 10800 ? '#fbbf24' : '#c4b5fd'

  return (
    <LinearGradient
      colors={['#2e1065', '#4c1d95', '#831843']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.questNum}>Quest #{quest.questNumber}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{quest.category}</Text>
        </View>
      </View>

      {/* Emoji + title */}
      <Text style={styles.emoji}>{quest.emoji}</Text>
      <Text style={styles.title}>{quest.title}</Text>
      <Text style={styles.description}>{quest.description}</Text>

      {/* Hint */}
      <View style={styles.hintBox}>
        <Text style={styles.hintText}>💡 {quest.hint}</Text>
      </View>

      {/* Countdown */}
      <View style={styles.countdownRow}>
        <Text style={styles.clockIcon}>⏰</Text>
        <Text style={[styles.countdown, { color: timerColor }]}>
          {formatCountdown(secondsLeft)}
        </Text>
        <Text style={styles.remainingLabel}> remaining</Text>
      </View>

      {/* CTA */}
      {hasCompleted ? (
        <View style={styles.completedBox}>
          <Text style={styles.completedText}>✓ Quest Completed! Great work today 🎉</Text>
        </View>
      ) : (
        <Pressable
          onPress={onComplete}
          style={({ pressed }) => [styles.ctaBtn, pressed && styles.ctaBtnPressed]}
        >
          <Text style={styles.ctaBtnText}>Complete Quest →</Text>
        </Pressable>
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 20,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questNum: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a78bfa',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  categoryBadge: {
    backgroundColor: 'rgba(236,72,153,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(236,72,153,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#f9a8d4',
  },
  emoji: {
    fontSize: 56,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#ddd6fe',
    lineHeight: 20,
    marginBottom: 16,
  },
  hintBox: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  hintText: {
    fontSize: 12,
    color: '#c4b5fd',
    lineHeight: 17,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  clockIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  countdown: {
    fontFamily: 'monospace',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -1,
  },
  remainingLabel: {
    fontSize: 12,
    color: '#a78bfa',
    marginLeft: 6,
  },
  ctaBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  ctaBtnText: {
    color: '#4c1d95',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  completedBox: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.3)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  completedText: {
    color: '#6ee7b7',
    fontSize: 14,
    fontWeight: '700',
  },
})
