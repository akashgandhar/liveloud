"use client";
import React from "react";
import { ImagePlus } from "lucide-react";
import { Smile } from "lucide-react";
import { BarChartBig } from "lucide-react";
import { GalleryThumbnails } from "lucide-react";
import { useAuth } from "@/contexts/auth/context";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePostTrigger() {
  const { user, isLoading } = useAuth();
  return (
    // <div className="flex justify-center w-full">
    <div className="border border-gray-300 bg-white shadow-sm rounded-lg mx-2 ">
      <div className="flex items-start gap-2 px-2">
        <div className="mt-3 w-12 h-full flex flex-col items-start text-lg flex-none">
          <img
            src={user?.photoURL}
            className="flex-none w-12 h-12 rounded-full"
            alt="avatar"
          />
        </div>

        <Textarea
          placeholder="What's happening?"
          className="resize-none mt-3 pb-3 w-full h-28 bg-slate-100 focus:outline-none rounded-xl p-2"
        ></Textarea>
      </div>
      {/* image icon */}
      <div className="w-full px-4 ml-12">
        <div className="flex justify-start gap-4">
          <label className="flex m-2">
            <input className="hidden" type="file" />
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

          {/* <button className="p-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-xl shadow-md hover:shadow-lg transition duration-150 ease-in-out disabled:cursor-not-allowed">
              Post
            </button> */}
        </div>
      </div>
    </div>
    // </div>
  );
}
