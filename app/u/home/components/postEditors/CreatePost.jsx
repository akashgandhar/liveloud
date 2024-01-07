"use client";

import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { MediaCarousel } from "./MediaCarousel";
import { Smile, BarChartBig, GalleryThumbnails, ImagePlus } from "lucide-react";
import { useNewPost } from "@/contexts/newPost/context";

export function CreatePostDiolog({ children }) {
  const {
    isLoading,
    handleChange,
    isDone,
    postData,
    createNewPost,
    handleMediaChange,
  } = useNewPost();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl p-1">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col justify-center items-center">
          <Textarea
            onChange={(e) => handleChange("content", e.target.value)}
            value={postData?.content}
            name="content"
            placeholder="Whats Happening"
            className="resize-none text-2xl mt-3 pb-3 w-full h-fit max-h-56  outline-none border-none  py-2"
          />
          {postData?.media?.length > 0 && (
            <MediaCarousel postMedia={postData?.media} />
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <div className="flex justify-start gap-4">
            <label className="flex m-2">
              <input
                onChange={(e) => handleMediaChange(e)}
                className="hidden"
                type="file"
              />
              <ImagePlus className="text-2xl mt-1 text-blue-700 cursor-pointer" />
            </label>
            {/* emoji icon */}
            <label className="flex m-2">
              <input className="hidden" type="file" />
              <Smile className="text-2xl mt-1 text-blue-700 cursor-pointer" />
            </label>
            {/* gif icon */}
            <label className="flex m-2">
              <input className="hidden" type="file" />
              <GalleryThumbnails className="text-2xl mt-1 text-blue-700 cursor-pointer" />
            </label>
            {/* poll icon */}
            <label className="flex m-2">
              <input className="hidden" type="file" />
              <BarChartBig className="text-2xl mt-1 text-blue-700 cursor-pointer" />
            </label>
          </div>

          <Button
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              console.log(postData);
              createNewPost();
            }}
            className="p-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
