// app/home.tsx
import { Avatar, Card, Icon, Image, Text } from '@rneui/themed';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    View,
    useWindowDimensions,
} from 'react-native';
import { ACCENT } from '../../theme';

type Post = {
  id: string;
  userName: string;
  avatarUrl: string;
  imageUrl: string;
  timestamp: string;
  caption: string;
  likes: number;
  liked: boolean;
  dislikes: number;
  disliked: boolean;
};

const initialPosts: Post[] = [
  {
    id: '1',
    userName: 'alice',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    timestamp: '1h ago',
    caption: 'Sunset in the city',
    likes: 12,
    liked: false,
    dislikes: 0,
    disliked: false,
  },
  {
    id: '2',
    userName: 'bob',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    timestamp: '2h ago',
    caption: 'Morning coffee',
    likes: 5,
    liked: false,
    dislikes: 1,
    disliked: false,
  },
  {
    id: '3',
    userName: 'carol',
    avatarUrl: 'https://i.pravatar.cc/150?u=carol',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    timestamp: '3h ago',
    caption: 'Cozy reading nook',
    likes: 8,
    liked: false,
    dislikes: 0,
    disliked: false,
  },
  {
    id: '4',
    userName: 'dave',
    avatarUrl: 'https://i.pravatar.cc/150?u=dave',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    timestamp: '4h ago',
    caption: 'Mountain trails',
    likes: 20,
    liked: false,
    dislikes: 2,
    disliked: false,
  },
  {
    id: '5',
    userName: 'eve',
    avatarUrl: 'https://i.pravatar.cc/150?u=eve',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    timestamp: '5h ago',
    caption: 'City lights',
    likes: 15,
    liked: false,
    dislikes: 1,
    disliked: false,
  },
  {
    id: '6',
    userName: 'frank',
    avatarUrl: 'https://i.pravatar.cc/150?u=frank',
    imageUrl: 'https://picsum.photos/400/300?random=6',
    timestamp: '6h ago',
    caption: 'Beach vibes',
    likes: 9,
    liked: false,
    dislikes: 0,
    disliked: false,
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState(initialPosts);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width * 0.9, 400);

  const toggleLike = (id: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        let { liked, likes, disliked, dislikes } = p;
        if (disliked) {
          disliked = false;
          dislikes = Math.max(0, dislikes - 1);
        }
        liked = !liked;
        likes = liked ? likes + 1 : Math.max(0, likes - 1);
        return { ...p, liked, likes, disliked, dislikes };
      })
    );
  };

  const toggleDislike = (id: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        let { liked, likes, disliked, dislikes } = p;
        if (liked) {
          liked = false;
          likes = Math.max(0, likes - 1);
        }
        disliked = !disliked;
        dislikes = disliked ? dislikes + 1 : Math.max(0, dislikes - 1);
        return { ...p, liked, likes, disliked, dislikes };
      })
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <Card containerStyle={[styles.card, { width: cardWidth }]}>
      <View style={styles.header}>
        <Avatar
          source={{ uri: item.avatarUrl }}
          rounded
          size={40}
          containerStyle={{ marginRight: 12 }}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerText}>
          <Text style={styles.username}>@{item.userName}</Text>
          <Text style={styles.captionInline}> {item.caption}</Text>
        </Text>
      </View>

      <Card.Divider style={styles.divider} />

      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        PlaceholderContent={<Icon name="image" type="font-awesome" />}
      />

      <Text style={styles.timestamp}>{item.timestamp}</Text>

      <View style={styles.actionsRow}>
        <Icon
          name={item.liked ? 'heart' : 'heart-o'}
          type="font-awesome"
          onPress={() => toggleLike(item.id)}
          color={item.liked ? 'red' : ACCENT}
          containerStyle={styles.actionIcon}
        />
        <Text style={styles.count}>{item.likes}</Text>

        <Icon
          name={item.disliked ? 'thumbs-down' : 'thumbs-o-down'}
          type="font-awesome"
          onPress={() => toggleDislike(item.id)}
          color={item.disliked ? 'red' : ACCENT}
          containerStyle={[styles.actionIcon, { marginLeft: 32 }]}
        />
        <Text style={styles.count}>{item.dislikes}</Text>
      </View>
    </Card>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Feed',
          headerStyle: { backgroundColor: '#000' },
          headerTitleStyle: { color: ACCENT },
          headerLeft: () => (
            <Icon
              name="home"
              type="font-awesome"
              color={ACCENT}
              onPress={() => router.replace('/home')}
              containerStyle={{ marginLeft: 16 }}
            />
          ),
          headerRight: () => (
            <Icon
              name="cog"
              type="font-awesome"
              color={ACCENT}
              onPress={() => router.push('/settings')}
              containerStyle={{ marginRight: 16 }}
            />
          ),
          contentStyle: { backgroundColor: '#000' },
        }}
      />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={p => p.id}
          renderItem={renderPost}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  list: { alignItems: 'center', paddingVertical: 16 },
  card: {
    borderRadius: 12,
    padding: 0,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#111111',
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    color: '#e0e0e0',
  },
  username: {
    color: ACCENT,
    fontWeight: 'bold',
  },
  captionInline: {
    color: '#e0e0e0',
  },
  divider: {
    backgroundColor: '#222222',
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
  },
  timestamp: {
    color: '#666666',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  actionIcon: {
    padding: 8,
  },
  count: {
    color: '#e0e0e0',
    marginLeft: 4,
    fontSize: 14,
  },
});
