"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/context";
import { GetAllPosts } from "@/lib/posts/firebase_read";
import { AmplifyPost, LikePost, SharePost } from "@/lib/posts/firebase_write";

const PostContext = createContext();

export default function PostProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);

  const [allPosts, setAllPosts] = useState([]);

  const handleLikePost = async (postId) => {
    const liked = await LikePost(user, postId);
    if (liked != true) {
      alert("An error occured");
    }
  };

  const handleSharePost = async (postId) => {
    const shared = await SharePost(user, postId);
    if (shared != true) {
      alert("An error occured");
    }
  };

  const handleAmplifyPost = async (postId) => {
    const amplified = await AmplifyPost(user, postId);
    if (amplified != true) {
      alert("An error occured");
    }
  };

  const handleShare = async (data) => {
    try {
      await navigator.share({
        text: data,
      });
      console.log("Successfully shared");
    } catch (error) {
      console.error("Error sharing:", error.message);
      console.log(data);
    }
  };

  return (
    <PostContext.Provider
      value={{
        error,
        isLoading,
        handleLikePost,
        handleSharePost,
        handleAmplifyPost,
        handleShare,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);
