"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/context";
import { FollowUnfollow, RemoveFollower } from "@/lib/follow/firebase_write";

const FollowContext = createContext();

export default function FollowProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);

  const handleFollowUnfollow = async (profileId) => {
    setIsLoading(true);
    const followed = await FollowUnfollow(user, profileId);
    if (followed != true) {
      alert("An error occured");
      setIsLoading(false);
      return;
    }
    alert("Success");
    setIsDone(true);
    setIsLoading(false);
  };


  const removeFollower = async (profileId) => {
    setIsLoading(true);
    const followed = await RemoveFollower(user, profileId);
    if (followed != true) {
      alert("An error occured");
      setIsLoading(false);
      return;
    }
    alert("Success");
    setIsDone(true);
    setIsLoading(false);
  }




  return (
    <FollowContext.Provider
      value={{
        error,
        isLoading,
        isDone,
        handleFollowUnfollow,
        removeFollower
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export const useFollow = () => useContext(FollowContext);
