import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth/context";
import { useFollow } from "@/contexts/follow/context";
import { UseUserStream } from "@/lib/users/firebase_read";
import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";

export default function FollowingShowCard({ followerId }) {
  const { user, isLoading } = useAuth();

  const { profileId } = useParams();

  const {
    error: isError,
    isLoading: loadingFollow,
    isDone,
    handleFollowUnfollow,
  } = useFollow();

  const {
    data: follower,
    isLoading: IsProfileLoading,
    error: isProfileError,
  } = UseUserStream(followerId);

  if (IsProfileLoading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-between py-2">
      {/* {JSON.stringify(follower)} */}
      <Link
        href={`
    /u/${follower?.uid}
    `}
        className="flex items-center space-x-2"
      >
        <img
          src={
            follower?.photoURL ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-semibold">{follower?.name}</p>
          <p className="text-sm text-gray-500">@{follower?.handle}</p>
        </div>
      </Link>
      {profileId === user?.uid ? (
        <Button
          disabled={loadingFollow}
          onClick={() => handleFollowUnfollow(follower?.uid)}
          className="text-sm"
        >
          UnFollow
        </Button>
      ) : (
        !follower?.followers?.includes(user?.uid) && (
          <Button
            disabled={loadingFollow}
            onClick={() => handleFollowUnfollow(follower?.uid)}
            className="text-sm"
          >
            Follow
          </Button>
        )
      )}
    </div>
  );
}
