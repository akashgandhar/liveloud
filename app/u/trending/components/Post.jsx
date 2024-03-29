import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Share2, Bookmark } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Volume2 } from "lucide-react";
import { PostMediaSlider } from "./PostMediaSlider";
import {
  UsePostAmplifiedStream,
  UsePostCommentsStream,
  UsePostLikesStream,
  UsePostDisLikesStream,
  UsePostSavedStream,
  UsePostSharedStream,
  UsePostUsertStream,
  UsePostRepostStream,
} from "@/lib/posts/firebase_read";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { useAuth } from "@/contexts/auth/context";
import { usePost } from "@/contexts/posts/context";
import { PostOptions } from "./PostOptions";
import { CommentDiologBox } from "./CommentDiologBox";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Flag, HeartCrack, UserX, Trash2 } from "lucide-react";
import { RepostPost } from "@/lib/posts/firebase_write";

export default function Post({ post }) {
  const { data, isLoading, error } = UsePostUsertStream(post?.owner);
  const { data: RepostUserData, isLoading: repostDataLoading, error: repostError } = UsePostUsertStream(post?.repostedFrom);
  const { user } = useAuth();
  const {
    handleLikePost,
    handleDisLikePost,
    handleSharePost,
    handleAmplifyPost,
    handleShare,
    handleSavePost,
    isLikeLoading,
    isSaveLoading,
    isShareLoading,
    isAmplifyLoading,
  } = usePost();

  const router = useRouter();

  const {
    data: postLikes,
    isLoading: postLikesLoading,
    error: postLikesError,
  } = UsePostLikesStream(post?.postId);
  const {
    data: postDisLikes,
    isLoading: postDisLikesLoading,
    error: postDisLikesError,
  } = UsePostDisLikesStream(post?.postId);
  const {
    data: postComments,
    isLoading: postCommentsLoading,
    error: postCommentsError,
  } = UsePostCommentsStream(post?.postId);
  const {
    data: postSaved,
    isLoading: postSavedLoading,
    error: postSavedError,
  } = UsePostSavedStream(post?.postId);
  const {
    data: postAmplified,
    isLoading: postAmplifiedLoading,
    error: postAmplifiedError,
  } = UsePostAmplifiedStream(post?.postId);

  const {
    data: postShared,
    isLoading: postSharedLoading,
    error: postSharedError,
  } = UsePostSharedStream(post?.postId);
  const {
    data: postReposts,
    isLoading: postRepostsLoading,
    error: postRepostsError,
  } = UsePostRepostStream(post?.postId);

  return (
    <div className="flex border dark:text-black rounded-lg ml-0 mr-2 min-w-fit  shadow-lg sm:mx-3 pl-2 pr-1 sm:pr-0 sm:px-5 bg-white py-3 hover:bg-gray-100">
      <div className="mt-3 w-12 h-12 text-lg flex-none">
        <Link href={`/u/${data?.uid}`}>
          <img
            src={data?.photoURL}
            className="flex-none w-12 h-12 object-cover rounded-full cursor-pointer"
            alt="avatar"
          />
        </Link>
      </div>

      <div className="w-full px-4 py-3">
        <div className="w-full flex justify-between relative">
          <h2 className="font-semibold cursor-pointer">
            <Link href={`/u/${data?.uid}`}>{data?.name}</Link>
            <span className="text-slate-500 font-normal pl-1.5">
              <Link href={`/u/${data?.uid}`}>@{data?.handle}</Link>
            </span>
          </h2>

          {/* //todo popover */}

          <PostOptions postId={post?.postId} ownerId={post?.owner}>
            <MoreHorizontal className="text-xl cursor-pointer " />
          </PostOptions>
        </div>
        {post?.repostedFrom && <Link href={`/u/${RepostUserData?.uid}`}> <h1 className="text-xs">This Post is Amplified from <span className="hover:underline text-blue-400 hover:cursor-pointer">{RepostUserData?.name}</span> </h1></Link>}
        <p className="py-3 cursor-pointer max-w-lg break-words">
          {post?.content}{" "}
          {post?.tags
            ?.slice(1)
            ?.split("#")
            ?.map((tag, index) => (
              <h1
                className="
          text-blue-500
          cursor-pointer
          hover:underline
          w-fit
          
          "
                key={index}
              >
                #{tag}
              </h1>
            ))}
        </p>
        {post?.media?.length > 0 && (
          <div
            onClick={() => {
              router.push(`/u/posts/${post?.postId}`);
            }}
            className="max-w-3xl mx-auto flex justify-center bg-blue-100 rounded-md cursor-pointer"
          >
            <div
              // src="/bg.jpg"
              className="max-w-[90%]  rounded-md my-2 mx-auto"
            // alt="avatar"
            >
              <PostMediaSlider postMedia={post?.media} />
            </div>
          </div>
        )}

        <p className="text-sm text-gray-600">
          {moment(post?.createdAt?.seconds * 1000).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}
        </p>

        <div className="flex justify-between pt-8">
          <div title="Like" className="flex justify-center items-center gap-2">
            <button
              disabled={isLikeLoading}
              onClick={() => handleLikePost(post?.postId, post?.owner)}
            >
              <ThumbsUp
                fill={
                  postLikes?.map((like) => like?.uid)?.includes(user?.uid)
                    ? "#009ED9"
                    : "#fff"
                }
                stroke={
                  postLikes?.map((like) => like?.uid)?.includes(user?.uid)
                    ? "#009ED9"
                    : "#000"
                }
                className="text-xl cursor-pointer hover:text-red-500 "
              />
            </button>
            <span className="text-sm  font-semibold">
              {postLikes?.length || 0}
            </span>
          </div>
          <div
            title="DisLike"
            className="flex justify-center items-center gap-2"
          >
            <button
              disabled={isLikeLoading}
              onClick={() => handleDisLikePost(post?.postId, post?.owner)}
            >
              <ThumbsDown
                fill={
                  postDisLikes
                    ?.map((dislike) => dislike?.uid)
                    ?.includes(user?.uid)
                    ? "#009ED9"
                    : "#fff"
                }
                stroke={
                  postDisLikes
                    ?.map((dislike) => dislike?.uid)
                    ?.includes(user?.uid)
                    ? "#009ED9"
                    : "#000"
                }
                className="text-xl cursor-pointer hover:text-red-500 "
              />
            </button>
            <span className="text-sm  font-semibold">
              {postDisLikes?.length || 0}
            </span>
          </div>
          <div
            title="Comment"
            className="flex justify-center items-center gap-2"
          >
            <CommentDiologBox postId={post?.postId} postOwner={post?.owner}>
              <MessageSquare className="text-xl cursor-pointer hover:text-blue-500" />
            </CommentDiologBox>
            <span className="text-sm  font-semibold">
              {postComments?.length || 0}
            </span>
          </div>
          <div
            title="Amplify"
            className="flex justify-center items-center gap-2"
          >
            <button
              disabled={postRepostsLoading}
              onClick={() => {
                if (postReposts?.filter((repost) => {
                  repost?.uid === user?.uid
                })?.length > 0 || post?.owner === user?.uid) {
                  return;
                }
                RepostPost(post?.postId, user)
              }}
            >
              <Volume2
                stroke={
                  postReposts
                    ?.map((amplify) => amplify?.uid)
                    ?.includes(user?.uid)
                    ? "#009ED9"
                    : "#000"
                }
                className="text-xl cursor-pointer "
              />
            </button>
            <span className="text-sm  font-semibold">
              {postReposts?.length || 0}
            </span>
          </div>
          <div title="Share" className="flex justify-center items-center gap-2">
            <button
              disabled={isShareLoading}
              onClick={() => {
                const url = `http://localhost:3000/u/posts/${post?.postId}`;
                const title = `${data?.name} shared a post`;
                handleShare({
                  text: post?.content,
                  url: url,
                });
                handleSharePost(post?.postId, post?.owner);
              }}
            >
              <Share2
                stroke={
                  postShared?.map((share) => share?.uid)?.includes(user?.uid)
                    ? "#009ED9"
                    : "#000"
                }
                className="text-xl cursor-pointer "
              />
            </button>
            <span className="text-sm  font-semibold">
              {postShared?.length || 0}
            </span>
          </div>
          <div
            title="BookMark"
            className="flex justify-center items-center gap-2"
          >
            <button
              disabled={isSaveLoading}
              onClick={() => handleSavePost(post?.postId, post?.owner)}
            >
              <Bookmark
                stroke={
                  postSaved?.map((save) => save?.uid)?.includes(user?.uid)
                    ? "#009ED9"
                    : "#000"
                }
                fill={
                  postSaved?.map((save) => save?.uid)?.includes(user?.uid)
                    ? "#009ED9"
                    : "#fff"
                }
                onClick={() => handleSavePost(post?.postId)}
                className="text-xl cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
