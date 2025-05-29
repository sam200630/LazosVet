import React, {
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useRouter } from 'expo-router';
import { MediaContext, MediaPost } from '../../../context/mediaContext';
import BottomTabs from '../../../components/bottonsTab';
import styles from '../../../styles/media/principal';
import lupaIcon    from '../../../assets/images/lupa.png';
import plusIcon    from '../../../assets/images/+.png';
import likeIcon    from '../../../assets/images/like.png';
import gustaIcon   from '../../../assets/images/gusta.png';
import { Routes }  from '../../../route';
import defaultAvatar from '../../../assets/images/default-profile.jpeg';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/FirebaseConfig';
//
interface PostWithUser extends MediaPost {
  userName: string;
  userPhoto: string | null;
}

export default function MediaPrincipal() {
  const router = useRouter();
  const { posts, loading } = useContext(MediaContext);
  const [feed, setFeed] = useState<PostWithUser[]>([]);
  const [fetching, setFetching] = useState(true);

  // Search
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Likes
  const [liked, setLiked] = useState<Set<string>>(new Set());

  // Load user info
  useEffect(() => {
    let active = true;
    (async () => {
      setFetching(true);
      const enriched = await Promise.all(
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
      if (active) {
        setFeed(enriched);
        setFetching(false);
      }
    })();
    return () => { active = false; };
  }, [posts]);

  // Filtered feed
  const displayed = searchQuery
    ? feed.filter(p =>
        p.userName.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : feed;

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
        <TouchableOpacity onPress={() => setSearchActive(true)}>
          <Image source={lupaIcon} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.tabSelector}>
          <TouchableOpacity style={[styles.tabButton, styles.tabButtonActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>
              Publicaciones
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push(Routes.AddMedia)}>
          <Image source={plusIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Search input full width */}
      {searchActive && (
        <View style={searchStyles.searchContainer}>
          <TextInput
            style={searchStyles.searchInputFull}
            placeholder="Buscar usuario..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      )}

      {/* Feed */}
      <ScrollView contentContainerStyle={styles.feed}>
        {displayed.map(post => (
          <PostItem
            key={post.id}
            post={post}
            liked={liked.has(post.id)}
            onToggleLike={() => {
              const next = new Set(liked);
              next.has(post.id) ? next.delete(post.id) : next.add(post.id);
              setLiked(next);
            }}
          />
        ))}
      </ScrollView>

      {/* Tabs */}
      <BottomTabs />
    </SafeAreaView>
  );
}

// PostItem component
function PostItem({
  post,
  liked,
  onToggleLike,
}: {
  post: PostWithUser;
  liked: boolean;
  onToggleLike: () => void;
}) {
  const lastTap = useRef<number>(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      onToggleLike();
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 1500);
    }
    lastTap.current = now;
  };

  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <Image
          source={post.userPhoto ? { uri: post.userPhoto } : defaultAvatar}
          style={styles.avatarPlaceholder}
        />
        <Text style={styles.username}>@{post.userName}</Text>
      </View>

      <TouchableWithoutFeedback onPress={handleTap}>
        <View>
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.postImagePlaceholder}
            resizeMode="cover"
          />
          {showOverlay && (
            <Image
              source={gustaIcon}
              style={StyleSheet.flatten([styles.overlay])}
            />
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.postActions}>
        <TouchableOpacity onPress={onToggleLike}>
          <Image
            source={liked ? gustaIcon : likeIcon}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{post.description}</Text>
    </View>
  );
}

const searchStyles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchInputFull: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    paddingHorizontal: 12,
    fontFamily: 'Poppins-Regular',
    color: '#101419',
  },
});
