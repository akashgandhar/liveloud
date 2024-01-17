import React from "react";
import { Heart } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Share2 } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Volume2 } from "lucide-react";
import { PostMediaSlider } from "./PostMediaSlider";
import { UsePostUsertStream } from "@/lib/posts/firebase_read";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { useAuth } from "@/contexts/auth/context";
import { usePost } from "@/contexts/posts/context";
import { PostOptions } from "./PostOptions";
import { CommentDiologBox } from "./CommentDiologBox";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Post({ post }) {
  const { data, isLoading, error } = UsePostUsertStream(post?.owner);
  const { user } = useAuth();
  const { handleLikePost, handleSharePost, handleAmplifyPost, handleShare } =
    usePost();

  const router = useRouter();

  return (
    <div className="flex border dark:text-black rounded-lg ml-0 mr-2 min-w-fit  shadow-lg sm:mx-3 pl-2 pr-1 sm:pr-0 sm:px-5 bg-white py-3 hover:bg-gray-100">
      <div className="mt-3 w-12 h-12 text-lg flex-none">
        <Link href={`/u/${user?.uid}`}>
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
            <Link href={`/u/${user?.uid}`}>{data?.name}</Link>
            <span className="text-slate-500 font-normal pl-1.5">
              <Link href={`/u/${user?.uid}`}>@{data?.handle}</Link>
            </span>
          </h2>

          {/* //todo popover */}
          <PostOptions>
            <MoreHorizontal className="text-xl cursor-pointer " />
          </PostOptions>
        </div>

        <p className="py-3 cursor-pointer max-w-lg break-words">
          {post?.content}
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
            <Heart
              onClick={() => handleLikePost(post?.postId)}
              fill={post?.likes?.includes(user?.uid) ? "#FF0000" : "#fff"}
              stroke={post?.likes?.includes(user?.uid) ? "#FF0000" : "#000000"}
              className="text-xl cursor-pointer hover:text-red-500 "
            />
            <span className="text-sm  font-semibold">
              {post?.likes?.length}
            </span>
          </div>
          <div
            title="Comment"
            className="flex justify-center items-center gap-2"
          >
            <CommentDiologBox postId={post?.postId}>
              <MessageSquare className="text-xl cursor-pointer hover:text-blue-500" />
            </CommentDiologBox>
            <span className="text-sm  font-semibold">
              {post?.comments?.length}
            </span>
          </div>
          <div
            title="Amplify"
            className="flex justify-center items-center gap-2"
          >
            <Volume2
              stroke={post?.amplified?.includes(user?.uid) ? "#009ED9" : "#000"}
              onClick={() => handleAmplifyPost(post?.postId)}
              className="text-xl cursor-pointer "
            />
            <span className="text-sm  font-semibold">
              {post?.amplified?.length}
            </span>
          </div>
          <div title="Share" className="flex justify-center items-center gap-2">
            <Share2
              stroke={post?.shared?.includes(user?.uid) ? "#009ED9" : "#000"}
              onClick={() => {
                const url = `http://localhost:3000/u/posts/${post?.postId}`;
                const title = `${data?.name} shared a post`;
                handleShare({
                  text: post?.content,
                  url: url,
                  files: post?.media?.map((media) => media?.url),
                  title: title,
                });
                handleSharePost(post?.postId);
              }}
              className="text-xl cursor-pointer "
            />
            <span className="text-sm  font-semibold">
              {post?.shared?.length}
            </span>
          </div>
          <div title="Share" className="flex justify-center items-center gap-2">
            <Share2
              stroke={post?.shared?.includes(user?.uid) ? "#009ED9" : "#000"}
              onClick={() => ''}
              className="text-xl cursor-pointer "
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
