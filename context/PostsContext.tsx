// app/context/PostsContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Post = {
  id: string;
  userName: string;
  imageUrl: string;
  timestamp: string;
  caption: string;
  likes: number;
  liked: boolean;
  dislikes: number;
  disliked: boolean;
};

type PostsContextValue = {
  posts: Post[];
  toggleLike: (id: string) => void;
  toggleDislike: (id: string) => void;
};

const initialPosts: Post[] = [
  {
    id: '1',
    userName: 'alice',
    imageUrl: 'https://picsum.photos/400/300?image=10',
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
    imageUrl: 'https://picsum.photos/400/300?image=20',
    timestamp: '2h ago',
    caption: 'Morning coffee',
    likes: 5,
    liked: false,
    dislikes: 1,
    disliked: false,
  },
  // … more posts
];

const PostsContext = createContext<PostsContextValue | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        // if currently disliked, remove that first
        const wasDisliked = p.disliked;
        const newDislikes = wasDisliked ? p.dislikes - 1 : p.dislikes;
        const newDisliked = wasDisliked ? false : p.disliked;
        // toggle like
        const newLiked = !p.liked;
        const newLikes = newLiked ? p.likes + 1 : p.likes - 1;
        return {
          ...p,
          liked: newLiked,
          likes: newLikes,
          disliked: newDisliked,
          dislikes: newDislikes,
        };
      })
    );
  };

  const toggleDislike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        // if currently liked, remove that first
        const wasLiked = p.liked;
        const newLikes = wasLiked ? p.likes - 1 : p.likes;
        const newLiked = wasLiked ? false : p.liked;
        // toggle dislike
        const newDisliked = !p.disliked;
        const newDislikes = newDisliked ? p.dislikes + 1 : p.dislikes - 1;
        return {
          ...p,
          disliked: newDisliked,
          dislikes: newDislikes,
          liked: newLiked,
          likes: newLikes,
        };
      })
    );
  };

  return (
    <PostsContext.Provider value={{ posts, toggleLike, toggleDislike }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within a PostsProvider');
  return ctx;
}
