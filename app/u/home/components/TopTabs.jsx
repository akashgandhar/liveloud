import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePostTrigger from "./CreatePostTrigger";
import InfiniteScrollPost from "./InfiniteScrollPosts";
import { Separator } from "@/components/ui/separator";

export default function TopTabs() {
  return (
    <Tabs defaultValue="explore" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="explore">Explore</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="explore">
        <div className="flex flex-col h-screen">
          <CreatePostTrigger />
          <Separator className="my-4" />
          <div className="flex-1 overflow-y-auto ">
            <InfiniteScrollPost />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="following">
        <CreatePostTrigger />
      </TabsContent>
    </Tabs>
  );
}
