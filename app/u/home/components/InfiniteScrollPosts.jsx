// InfiniteScrollPost.jsx

"use client";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { Separator } from "@/components/ui/separator";

const InfiniteScrollPost = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const totalElements = 50; // Set the total number of elements

  const fetchMoreData = () => {
    // A fake async API call that sends 20 more records in 1.5 secs
    setTimeout(() => {
      const newItems =
        items.length + 20 > totalElements
          ? Array.from({ length: totalElements })
          : items.concat(Array.from({ length: 20 }));
      setItems(newItems);
    }, 1500);
  };

  return (
    <InfiniteScroll
      className="flex flex-col gap-4 w-full ml-1.5"
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={items.length < totalElements}
      loader={<h4>Loading...</h4>}
    >
      {items.map((item, index) => (
        <Post key={index} />
      ))}
      <Separator className="mt-4" />
      <div className="flex justify-center">
        <h1>You Have Reached The End</h1>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollPost;
