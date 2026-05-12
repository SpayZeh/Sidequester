import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { LinearGradient } from 'expo-linear-gradient'
import type { Quest } from '../lib/quests'

interface Props {
  visible: boolean
  quest: Quest & { questNumber: number }
  onSubmit: (imageUri: string, caption: string) => void
  onClose: () => void
}

export default function SubmitModal({ visible, quest, onSubmit, onClose }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [posting, setPosting] = useState(false)

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow photo access to upload your quest completion.')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    })
    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow camera access to photograph your quest.')
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    })
    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  const handlePost = async () => {
    if (!imageUri) return
    setPosting(true)
    await new Promise(r => setTimeout(r, 500))
    onSubmit(imageUri, caption.trim())
    setImageUri(null)
    setCaption('')
    setPosting(false)
  }

  const handleClose = () => {
    setImageUri(null)
    setCaption('')
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Complete Quest</Text>
              <Text style={styles.headerSubtitle}>
                {quest.emoji} {quest.description}
              </Text>
            </View>
            <Pressable onPress={handleClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          {/* Image preview or upload area */}
          {imageUri ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />
              <Pressable onPress={() => setImageUri(null)} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>✕</Text>
              </Pressable>
              <Pressable onPress={pickFromGallery} style={styles.changeBtn}>
                <Text style={styles.changeBtnText}>Change</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.uploadArea}>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadTitle}>Add your quest photo</Text>
              <Text style={styles.uploadSubtitle}>Show everyone your completion!</Text>
              <View style={styles.uploadBtns}>
                <Pressable
                  onPress={takePhoto}
                  style={({ pressed }) => [styles.uploadBtn, pressed && styles.uploadBtnPressed]}
                >
                  <LinearGradient
                    colors={['#7c3aed', '#ec4899']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.uploadBtnGradient}
                  >
                    <Text style={styles.uploadBtnText}>📸 Take Photo</Text>
                  </LinearGradient>
                </Pressable>
                <Pressable
                  onPress={pickFromGallery}
                  style={({ pressed }) => [styles.galleryBtn, pressed && styles.uploadBtnPressed]}
                >
                  <Text style={styles.galleryBtnText}>🖼 Choose from Gallery</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Caption */}
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Add a caption… (optional)"
            placeholderTextColor="#52525b"
            multiline
            maxLength={280}
            style={styles.captionInput}
          />

          {/* Post button */}
          <Pressable
            onPress={handlePost}
            disabled={!imageUri || posting}
            style={({ pressed }) => [
              styles.postBtnWrapper,
              (!imageUri || posting) && styles.postBtnDisabled,
              pressed && styles.postBtnPressed,
            ]}
          >
            <LinearGradient
              colors={!imageUri || posting ? ['#3f3f46', '#3f3f46'] : ['#7c3aed', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.postBtn}
            >
              {posting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.postBtnText}>Post to Feed 🎯</Text>
              )}
            </LinearGradient>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  scroll: {
    padding: 20,
    paddingTop: 60,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#71717a',
    marginTop: 3,
    maxWidth: 260,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: '#a1a1aa',
    fontSize: 14,
  },
  uploadArea: {
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#27272a',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 6,
    backgroundColor: '#18181b',
  },
  uploadIcon: {
    fontSize: 48,
    marginBottom: 4,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  uploadSubtitle: {
    fontSize: 13,
    color: '#71717a',
    marginBottom: 16,
  },
  uploadBtns: {
    gap: 10,
    width: '80%',
  },
  uploadBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  uploadBtnGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  uploadBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  galleryBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#27272a',
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  galleryBtnText: {
    color: '#d4d4d8',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadBtnPressed: {
    opacity: 0.75,
  },
  previewContainer: {
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  clearBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    color: '#ffffff',
    fontSize: 13,
  },
  changeBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  changeBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  captionInput: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#ffffff',
    minHeight: 72,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  postBtnWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  postBtnDisabled: {
    opacity: 0.45,
  },
  postBtnPressed: {
    opacity: 0.85,
  },
  postBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 16,
  },
  postBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
})
