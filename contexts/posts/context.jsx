"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/context";
import { GetAllPosts } from "@/lib/posts/firebase_read";
import {
  AmplifyPost,
  CommentPost,
  DeletePost,
  LikePost,
  SavePost,
  SharePost,
} from "@/lib/posts/firebase_write";
import { set } from "firebase/database";

const PostContext = createContext();

export default function PostProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [isAmplifyLoading, setIsAmplifyLoading] = useState(false);

  const handleLikePost = async (postId, ownerId) => {
    setIsLikeLoading(true);
    const liked = await LikePost(user, postId, ownerId);
    if (liked != true) {
      alert("An error occured");
      setIsLikeLoading(false);
    }
    setIsLikeLoading(false);
  };
  const handleSavePost = async (postId, ownerId) => {
    setIsSaveLoading(true);
    const saved = await SavePost(user, postId, ownerId);
    if (saved != true) {
      alert("An error occured");
      setIsSaveLoading(false);
      return;
    }

    setIsSaveLoading(false);
  };

  const handleSharePost = async (postId, ownerId) => {
    setIsShareLoading(true);
    const shared = await SharePost(user, postId, ownerId);
    if (shared != true) {
      alert("An error occured");
      setIsShareLoading(false);
      return;
    }
    setIsShareLoading(false);
  };

  const handleAmplifyPost = async (postId, ownerId) => {
    setIsAmplifyLoading(true);
    const amplified = await AmplifyPost(user, postId, ownerId);
    if (amplified != true) {
      alert("An error occured");
      setIsAmplifyLoading(false);
      return;
    }
    setIsAmplifyLoading(false);
  };

  const handleShare = async (data) => {
    try {
      await navigator.share({
        text: data?.text,
        url: data?.url,
        files: data?.files,
        title: data?.title,
      });
      console.log("Successfully shared");
    } catch (error) {
      console.error("Error sharing:", error.message);
      console.log(data);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e, postId, ownerId) => {
    e.preventDefault();
    setIsLoading(true);

    if (!newComment || newComment?.trim() === "") {
      alert("Comment cannot be empty");
      setIsLoading(false);
      return;
    }

    try {
      const commented = await CommentPost(user, postId, ownerId, newComment);

      if (commented != true) {
        alert("An error occured");
        setIsLoading(false);
        return;
      }
      handleCommentChange({ target: { value: "" } });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
      return;
    }
  };


  const handleDeletePost = async (postId) => {
    setIsLoading(true);
    try {
      const deleted = await DeletePost(user, postId);

      if (deleted != true) {
        alert("An error occured");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
      return;
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
        handleCommentChange,
        handleCommentSubmit,
        handleSavePost,
        isLikeLoading,
        isSaveLoading,
        isShareLoading,
        isAmplifyLoading,
        handleDeletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);
