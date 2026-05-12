import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import PostCard from './PostCard'
import type { Post } from '../lib/mockData'

interface Props {
  posts: Post[]
  headerComponent: React.ReactElement
}

function SectionHeader({ count }: { count: number }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Today's Completions</Text>
      <View style={styles.countBadge}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
  )
}

function EmptyState() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>📷</Text>
      <Text style={styles.emptyTitle}>No completions yet</Text>
      <Text style={styles.emptySubtitle}>Be the first to complete today's quest!</Text>
    </View>
  )
}

export default function Feed({ posts, headerComponent }: Props) {
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PostCard post={item} />}
      ListHeaderComponent={
        <>
          {headerComponent}
          <SectionHeader count={posts.length} />
        </>
      }
      ListEmptyComponent={<EmptyState />}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717a',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  countBadge: {
    backgroundColor: 'rgba(124,58,237,0.15)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a78bfa',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a1a1aa',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#52525b',
    textAlign: 'center',
  },
})
