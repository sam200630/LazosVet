// app/screensShared/media/principal.tsx

import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MediaContext, MediaPost } from '../../../context/mediaContext';
import BottomTabs   from '../../../components/bottonsTab';
import styles       from '../../../styles/media/principal';
import lupaIcon     from '../../../assets/images/lupa.png';
import plusIcon     from '../../../assets/images/+.png';
import likeIcon     from '../../../assets/images/like.png';
import commentIcon  from '../../../assets/images/coments.png';
import { Routes }   from '../../../route';
import defaultAvatar from '../../../assets/images/default-profile.jpeg';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/FirebaseConfig';

interface PostWithUser extends MediaPost {
  userName: string;
  userPhoto: string | null;
}

export default function MediaPrincipal() {
  const router = useRouter();
  const { posts, loading } = useContext(MediaContext);
  const [tab, setTab] = useState<'publicaciones' | 'preguntas'>('publicaciones');
  const [feed, setFeed] = useState<PostWithUser[]>([]);
  const [fetching, setFetching] = useState(true);

  // Cada vez que cambian los posts, traemos name/photo de cada userId
  useEffect(() => {
    let isActive = true;
    (async () => {
      setFetching(true);
      const enriched: PostWithUser[] = await Promise.all(
        posts.map(async p => {
          try {
            const snap = await getDoc(doc(db, 'users', p.userId));
            const data = snap.data() || {};
            return {
              ...p,
              userName: data.name || 'anonymous',
              userPhoto: data.photoUrl || null,
            };
          } catch {
            return {
              ...p,
              userName: 'anonymous',
              userPhoto: null,
            };
          }
        })
      );
      if (isActive) {
        setFeed(enriched);
        setFetching(false);
      }
    })();
    return () => {
      isActive = false;
    };
  }, [posts]);

  if (loading || fetching) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#30C5FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {/* TODO: búsqueda */}}>
          <Image source={lupaIcon} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tab === 'publicaciones' && styles.tabButtonActive,
            ]}
            onPress={() => setTab('publicaciones')}
          >
            <Text
              style={[
                styles.tabText,
                tab === 'publicaciones' && styles.tabTextActive,
              ]}
            >
              Publicaciones
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tab === 'preguntas' && styles.tabButtonActive,
            ]}
            onPress={() => setTab('preguntas')}
          >
            <Text
              style={[
                styles.tabText,
                tab === 'preguntas' && styles.tabTextActive,
              ]}
            >
              P&R
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push(Routes.AddMedia)}>
          <Image source={plusIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <ScrollView contentContainerStyle={styles.feed}>
        {feed.map(post => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postHeader}>
              <Image
                source={
                  post.userPhoto
                    ? { uri: post.userPhoto }
                    : defaultAvatar
                }
                style={styles.avatarPlaceholder}
              />
              <Text style={styles.username}>@{post.userName}</Text>
            </View>

            <Image
              source={{ uri: post.imageUrl }}
              style={styles.postImagePlaceholder}
            />

            <View style={styles.postActions}>
              <View style={styles.actionItem}>
                <Image source={likeIcon} style={styles.actionIcon} />
                <Text style={styles.actionText}>10</Text>
              </View>
              <View style={styles.actionItem}>
                <Image source={commentIcon} style={styles.actionIcon} />
                <Text style={styles.actionText}>1</Text>
              </View>
            </View>

            <Text style={styles.description}>
              {post.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Tabs */}
      <BottomTabs />
    </SafeAreaView>
  );
}
