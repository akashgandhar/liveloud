"use client";

import React, { useState } from "react";
import { Flag, HeartCrack, UserX, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePost } from "@/contexts/posts/context";
import { useAuth } from "@/contexts/auth/context";

export function PostOptions({ children, postId, ownerId }) {
  const { handleDeletePost } = usePost();
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem className="cursor-pointer gap-2 hover:font-bold">
          <Flag size={20} /> Report
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="cursor-pointer gap-2 hover:font-bold "> <Flag size={20} /> Report</DropdownMenuItem> */}
        {ownerId == user?.uid && (
          <DropdownMenuItem
            onClick={() => handleDeletePost(postId)}
            className="cursor-pointer gap-2 hover:font-bold"
          >
            {" "}
            <Trash2 size={20} />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
