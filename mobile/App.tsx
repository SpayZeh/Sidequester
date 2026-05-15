import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import QuestBanner from './components/QuestBanner'
import Feed from './components/Feed'
import SubmitModal from './components/SubmitModal'
import { getTodaysQuest } from './lib/quests'
import { getMockPosts } from './lib/mockData'
import type { Post } from './lib/mockData'

export default function App() {
  const quest = getTodaysQuest()
  const [posts, setPosts] = useState<Post[]>(getMockPosts())
  const [showModal, setShowModal] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  const handleSubmit = (imageUri: string, caption: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: { name: 'You', avatar: 'https://i.pravatar.cc/150?img=70' },
      mediaUrl: imageUri,
      mediaType: 'image',
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
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* Header bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>questie</Text>
        <Text style={styles.headerCount}>{posts.length} posts</Text>
      </View>

      {/* Feed */}
      <Feed
        posts={posts}
        headerComponent={
          <QuestBanner
            quest={quest}
            onComplete={() => setShowModal(true)}
            hasCompleted={hasCompleted}
          />
        }
      />

      {/* Floating action button */}
      {!hasCompleted && (
        <View style={styles.fabContainer}>
          <Pressable
            onPress={() => setShowModal(true)}
            style={({ pressed }) => [styles.fabPressable, pressed && styles.fabPressed]}
          >
            <LinearGradient
              colors={['#7c3aed', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.fab}
            >
              <Text style={styles.fabText}>+ post your quest</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )}

      {/* Submit modal */}
      <SubmitModal
        visible={showModal}
        quest={quest}
        onSubmit={handleSubmit}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#18181b',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#a78bfa',
    letterSpacing: -0.5,
  },
  headerCount: {
    fontSize: 12,
    color: '#52525b',
    fontWeight: '500',
  },
  fabContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  fabPressable: {
    borderRadius: 30,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  fabPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  fab: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 30,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
})
