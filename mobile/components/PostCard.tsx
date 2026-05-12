import React, { useState } from 'react'
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native'
import type { Post } from '../lib/mockData'
import { REACTION_EMOJIS } from '../lib/mockData'

const CARD_WIDTH = Dimensions.get('window').width - 32

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  const [reacted, setReacted] = useState<Set<string>>(new Set())
  const [imgError, setImgError] = useState(false)

  const toggleReact = (emoji: string) => {
    setReacted(prev => {
      const next = new Set(prev)
      next.has(emoji) ? next.delete(emoji) : next.add(emoji)
      return next
    })
  }

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: post.user.avatar }}
          style={styles.avatar}
          defaultSource={{ uri: 'https://ui-avatars.com/api/?background=6d28d9&color=fff&name=U' }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.timeAgo}>{post.timeAgo}</Text>
        </View>
        {post.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>New!</Text>
          </View>
        )}
      </View>

      {/* Media */}
      <View style={styles.mediaContainer}>
        {imgError ? (
          <View style={[styles.mediaContainer, styles.mediaError]}>
            <Text style={styles.mediaErrorIcon}>📷</Text>
          </View>
        ) : (
          <Image
            source={{ uri: post.mediaUrl }}
            style={styles.media}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        )}
      </View>

      {/* Caption + reactions */}
      <View style={styles.footer}>
        {post.caption ? (
          <Text style={styles.caption} numberOfLines={3}>
            <Text style={styles.captionName}>{post.user.name} </Text>
            {post.caption}
          </Text>
        ) : null}

        <View style={styles.reactions}>
          {REACTION_EMOJIS.map(emoji => {
            const count = (post.reactions[emoji] ?? 0) + (reacted.has(emoji) ? 1 : 0)
            const active = reacted.has(emoji)
            return (
              <Pressable
                key={emoji}
                onPress={() => toggleReact(emoji)}
                style={({ pressed }) => [
                  styles.reactionBtn,
                  active && styles.reactionBtnActive,
                  pressed && styles.reactionBtnPressed,
                ]}
              >
                <Text style={styles.reactionEmoji}>{emoji}</Text>
                {count > 0 && (
                  <Text style={[styles.reactionCount, active && styles.reactionCountActive]}>
                    {count}
                  </Text>
                )}
              </Pressable>
            )
          })}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#3f3f46',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  timeAgo: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 1,
  },
  newBadge: {
    backgroundColor: 'rgba(124,58,237,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a78bfa',
  },
  mediaContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#27272a',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  mediaError: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaErrorIcon: {
    fontSize: 40,
  },
  footer: {
    padding: 14,
  },
  caption: {
    fontSize: 14,
    color: '#d4d4d8',
    lineHeight: 20,
    marginBottom: 12,
  },
  captionName: {
    fontWeight: '700',
    color: '#ffffff',
  },
  reactions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  reactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#27272a',
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  reactionBtnActive: {
    backgroundColor: 'rgba(124,58,237,0.25)',
    borderColor: 'rgba(124,58,237,0.5)',
  },
  reactionBtnPressed: {
    opacity: 0.7,
  },
  reactionEmoji: {
    fontSize: 16,
  },
  reactionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#a1a1aa',
  },
  reactionCountActive: {
    color: '#c4b5fd',
  },
})
