"use client";
import { useAuth } from "@/contexts/auth/context";
import { useParams } from "next/navigation";
import React from "react";
import EditProfileDiolog from "./EditProfileDiolog";
import { useEditUser } from "@/contexts/profile/context";
import DragDropProfile, { ProfileUpload } from "./ProfileUpload";
import { BannerUpload } from "./BannerUpload";
import { UseUserPostsStream } from "@/lib/users/firebase_read";
import ShowMyPost from "./ShowMyPosts";
import { Separator } from "@/components/ui/separator";

export default function MainProfile() {
  const { user, isLoading } = useAuth();
  const { profileId } = useParams();
  const { userData } = useEditUser();
  const banner = userData?.banner || "/images/banner.jpg";

  const { data, isLoading: loading, error } = UseUserPostsStream(profileId);

  return (
    // <div class="container">
    <div className="w-screen flex flex-col">
      <div class="profile-card bg-gray-100 dark:bg-gray-800">
        <div
          style={{ backgroundImage: `url(${banner})` }}
          className={`relative border bg-cover bg-center m-[10px] rounded-t-[30px] profile-header`}
        >
          {user?.uid === profileId && (
            <div class="absolute text-white  bottom-2 end-2">
              <BannerUpload />
            </div>
          )}
          <div class="main-profile position:relative">
            <img src={userData?.photoURL} class="profile-image"></img>
            {/* <DragDropProfile /> */}
            {user?.uid === profileId && (
              <div class="absolute text-white bottom-2 left-24 ">
                <ProfileUpload />
              </div>
            )}
            <div class="profile-names pl-2 dark:bg-gray-800">
              <h1 class="username font-bold dark:text-white">
                {userData?.name}
              </h1>
              <small class="page-title dark:text-gray-100">
                @{userData?.handle || "..."}
              </small>
            </div>
          </div>
        </div>

        <div class="profile-body dark:bg-gray-800">
          <div class="profile-actions relative">
            {user?.uid === profileId ? (
              <EditProfileDiolog>
                <button class="follow absolute left-0">Edit</button>
              </EditProfileDiolog>
            ) : (
              <button class="follow">
                {isLoading ? "Loading..." : "Follow"}
              </button>
            )}
            {user?.uid != profileId && (
              <button class="message">Subscribe</button>
            )}

            <section class="bio">
              <div class="bio-header">
                <i class="fa fa-info-circle"></i>
                Info
              </div>
              <p class="bio-text">+91 7983461538</p>
              <p class="bio-text">+91 7983461538</p>
            </section>
            {/* {JSON.stringify(data)} */}
          </div>

          <div class="account-info">
            <div class="data bg-white p-4 rounded-lg shadow-md">
              <div class="important-data">
                <section class="data-item">
                  <h3 class="value font-bold">{data?.length}</h3>
                  <small class="title font-semibold">Post</small>
                </section>
                <section class="data-item hover:cursor-pointer">
                  <h3 class="value font-bold">
                    {userData?.followers?.length || 0}
                  </h3>
                  <small class="title font-semibold">Follower</small>
                </section>
                <section class="data-item hover:cursor-pointer">
                  <h3 class="value font-bold">
                    {userData?.following?.length || 0}
                  </h3>
                  <small class="title font-semibold">Following</small>
                </section>
                <section class="data-item">
                  <h3 class="value font-bold">41K</h3>
                  <small class="title font-semibold">Likes</small>
                </section>
                <section class="data-item hover:cursor-pointer">
                  <h3 class="value font-bold">12K</h3>
                  <small class="title font-semibold">Comments</small>
                </section>
                <section class="data-item hover:cursor-pointer">
                  <h3 class="value font-bold">2K</h3>
                  <small class="title font-semibold">Saved</small>
                </section>
              </div>
            </div>

            <div class="social-media">bio</div>

            <div class="last-post">
              <div class="post-cover">
                <span class="last-badge ">Last Post</span>
                <img
                  src={
                    data?.sort((a, b) => {
                      return b?.createdAt?.seconds - a?.createdAt?.seconds;
                    })[0].media[0].url || "/images/last-post.jpg"
                  }
                  className="h-full w-full"
                />
              </div>
              <h3 class="post-title">
                {data
                  ?.sort((a, b) => {
                    return b?.createdAt?.seconds - a?.createdAt?.seconds;
                  })[0]
                  .content.slice(0, 20)}
              </h3>
              <button class="post-CTA">View</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center  justify-center">
        <h1 className="text-2xl font-bold">{userData?.name}&apos;s Post</h1>
        <Separator className="my-2" />
        <ShowMyPost />
      </div>
    </div>
  );
}
