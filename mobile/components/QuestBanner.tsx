import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import type { Quest } from '../lib/quests'

interface Props {
  quest: Quest & { questNumber: number }
  onComplete: () => void
  hasCompleted: boolean
}

export default function QuestBanner({ quest, onComplete, hasCompleted }: Props) {
  return (
    <LinearGradient
      colors={['#7c3aed', '#ec4899', '#f97316']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.border}
    >
      <View style={styles.card}>
        <Text style={styles.emoji}>{quest.emoji}</Text>
        <View style={styles.info}>
          <Text style={styles.category}>{quest.category}</Text>
          <Text style={styles.title} numberOfLines={1}>{quest.title}</Text>
          <Text style={styles.description} numberOfLines={1}>{quest.description}</Text>
        </View>
        {hasCompleted ? (
          <View style={styles.doneBadge}>
            <Text style={styles.doneText}>✓ Done!</Text>
          </View>
        ) : (
          <Pressable
            onPress={onComplete}
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          >
            <Text style={styles.ctaText}>Do it →</Text>
          </Pressable>
        )}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  border: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 18,
    padding: 1.5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#18181b',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  emoji: {
    fontSize: 28,
    lineHeight: 34,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  category: {
    fontSize: 9,
    fontWeight: '700',
    color: '#a78bfa',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 18,
  },
  description: {
    fontSize: 11,
    color: '#71717a',
    marginTop: 1,
  },
  cta: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ctaPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#18181b',
  },
  doneBadge: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  doneText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6ee7b7',
  },
})
