"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/context";
import { GetAllPosts } from "@/lib/posts/firebase_read";
import { AmplifyPost, LikePost, SharePost } from "@/lib/posts/firebase_write";
import { FollowOrUnfollowUser } from "@/lib/follow/firebase_write";

const FollowContext = createContext();

export default function FollowProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);

  const handleFollowOrUnfollowUser = async (userId) => {
    setIsLoading(true);
    if (userId === user.uid) {
      alert("You cannot follow yourself");
      setIsLoading(false);
      return;
    }
    if (userId === null || userId === "" || userId === undefined) {
      alert("User not found");
      setIsLoading(false);
      return;
    }

    if (!user) {
      alert("Please login to follow");
      setIsLoading(false);
      return;
    }

    const followed = await FollowOrUnfollowUser(user, userId);
    if (followed != true) {
      alert("An error occured");
      setIsLoading(false);
      return;
    }
    // alert("Done");
    setIsLoading(false);
  };

  return (
    <FollowContext.Provider
      value={{
        error,
        isLoading,
        handleFollowOrUnfollowUser,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export const useFollow = () => useContext(FollowContext);
