"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../auth/context";
import { CreateNewPost } from "@/lib/posts/firebase_write";

const NewPostContext = createContext();

export default function NewPostProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isDone, setIsDone] = useState(false);

  const [postData, setPostData] = useState({
    content: "",
    media: [],
  });

  const handleChange = (key, value) => {
    setPostData({
      ...postData,
      [key]: value,
    });
  };

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

  const handleMediaChange = (event) => {
    const selectedMedia = event.target.files[0];

    if (selectedMedia) {
      const mediaType = selectedMedia.type.startsWith("image/")
        ? "image"
        : "video";
      const mediaItem = {
        file: selectedMedia,
        type: mediaType,
      };

      setPostData((prevState) => ({
        ...prevState,
        media: [...prevState?.media, mediaItem],
      }));
    }
  };

  const createNewPost = async () => {
    setIsLoading(true);
    setIsDone(false);
    if (postData?.content === "" || postData?.content === null || !postData) {
      alert("Content is required");
      setIsLoading(false);
      return;
    }
    try {
      // Create a new post document

      await CreateNewPost({ user, post: postData });

      alert("Post created successfully");
      setPostData({ content: "" });
      // setPostData(null);

      setIsDone(true);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <NewPostContext.Provider
      value={{
        isLoading,
        postData,
        handleChange,
        isDone,
        setIsDone,
        createNewPost,
        handleMediaChange,
      }}
    >
      {children}
    </NewPostContext.Provider>
  );
}

export const useNewPost = () => useContext(NewPostContext);