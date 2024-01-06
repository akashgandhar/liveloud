import React from "react";

export default function Post() {
  return (
    <div className="flex border rounded-lg ml-0 mr-2  shadow-lg sm:mx-3 pl-2 pr-1 sm:pr-0 sm:px-5 bg-white py-3 hover:bg-gray-100">
      <div className="mt-3 w-12 h-12 text-lg flex-none">
        <img
          src="/bg.jpg"
          className="flex-none w-12 h-12 rounded-full cursor-pointer"
          alt="avatar"
        />
      </div>

      <div className="w-full px-4 py-3">
        <div className="w-full flex justify-between relative">
          <h2 className="font-semibold cursor-pointer">
            firstName lastName
            <span className="text-slate-500 font-normal pl-1.5">@handle</span>
          </h2>

          {/* todo */}
          {/* <HiDotsHorizontal className="cursor-pointer mr-3"  /> */}

          {/* Post Options Modal */}
        </div>

        <p className="py-3 cursor-pointer max-w-lg break-words">
          post?.content
        </p>

        <div className="max-w-3xl max-h-80 mx-auto bg-blue-100 rounded-md cursor-pointer">
          <img
            src="/bg.jpg"
            className="max-w-full max-h-80 rounded-md my-2 mx-auto"
            alt="avatar"
          />
        </div>

        <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>

        <div className="flex justify-between pt-8">
          <div className="flex">
            {/* heart icon */}
            {/* <BsSuitHeart className="text-xl cursor-pointer"  /> */}

            <span className="text-sm pl-4 font-semibold">{0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
