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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "@/contexts/themeContext";
import GifPicker from "gif-picker-react";

export function CreatePostDiolog({ children }) {
  const { theme } = useTheme();
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
      <DialogContent className="sm:max-w-xl p-2">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Speak Loud Your Message to the Globe: Amplify Your Voice!
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col justify-center items-center">
          <Textarea
            onChange={(e) => handleChange("content", e.target.value)}
            value={postData?.content}
            name="content"
            placeholder="Whats Happening?!"
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
              <ImagePlus className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
            </label>
            {/* emoji icon */}
            <label className="flex m-2">
              <Popover>
                <PopoverTrigger>
                  <Smile className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  <Picker
                    data={data}
                    theme={theme}
                    onEmojiSelect={(e) => {
                      handleChange("content", postData?.content + e.native);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </label>
            {/* gif icon */}
            <label className="flex m-2">
              <Popover>
                <PopoverTrigger>
                <img
                  src="/gif2.svg"  
                  alt="GIF"
                  width={24}
                  height={24}
                  className="cursor-pointer item-center"/>
                                                                            
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  <GifPicker
                    onGifClick={(e) => {
                      // console.log(e);
                      handleMediaChange(e);
                    }}
                    tenorApiKey={"AIzaSyA6u39Z0ZKdnqk1SXfbrxm066ICUjQ4eKI"}
                  />
                </PopoverContent>
              </Popover>
            </label>
            {/* poll icon */}
            {/* <label className="flex m-2">
              <input className="hidden" type="file" />
              <BarChartBig className="text-2xl mt-1 text-[#009ED9] cursor-pointer" />
            </label> */}
          </div>

          <Button
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              // console.log(postData);
              createNewPost();
            }}
            className="p-2.5 rounded-xl shadow-md bg-[#009ED9] text-white border border-white hover:text-[#009ED9] hover:bg-white hover:border-[#009ED9] hover:shadow-lg transition duration-150 ease-in-out disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
