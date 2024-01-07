import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RecommendedProfiles() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold">Who To Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="h-full w-full">
          <div className="flex flex-row flex-wrap overflow-hidden gap-2 items-center justify-between p-2">
            <div className="flex gap-2 flex-row items-center">
              {" "}
              <div className="flex h-12 w-12 rounded-full items-center ">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </div>
              <div className="relative flex flex-col text-nowrap  h-[40px] justify-start">
                <h1 className="font-bold ">John Doe</h1>
                <h2 className="to-gray-300 text-xs absolute top-4">@handle</h2>
              </div>
            </div>
            <Button className="text-white bg-[#009ED9] cursor-pointer border hover:text-[#009ED9] hover:bg-white hover:border-[#009ED9]">Follow</Button>
          </div>
        </Card>
      </CardContent>
      <CardFooter className="text-[#009ED9] text-lg font-semibold cursor-pointer mt-auto mb-0">
        <p>Show More</p>
      </CardFooter>
    </Card>
  );
}
