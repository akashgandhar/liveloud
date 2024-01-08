"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/context";
import { GetAllPosts } from "@/lib/posts/firebase_read";

const PostContext = createContext();

export default function PostProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const [allPosts, setAllPosts] = useState([]);

  `
  posts/{postId}:{
    postId: "postId",
    content: "content",
    media:[{
      type: "image",
      url: "url",
    }]
    owner: uid,
    likes: [uid],
    comments: [uid],
    amplified: [uid],
    shared: [uid],
    visibility: "public",
    flag: "flag",
    createdAt: timestamp,
  }
  `;


  return (
    <PostContext.Provider
      value={{
        allPosts,
        isLoading,
        error,
        isDone,
        isRefresh,
        setIsRefresh,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);
