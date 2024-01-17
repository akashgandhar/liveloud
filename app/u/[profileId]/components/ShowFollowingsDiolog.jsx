import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth/context";
import { UseUserStream } from "@/lib/users/firebase_read";
import { useParams } from "next/navigation";
import FollowerShowCard from "./FollowerShowCard";
import FollowingShowCard from "./FollowingShowCard";

export function ShowFollowingsDiolog({ children }) {
  const { user, isLoading } = useAuth();

  const { profileId } = useParams();

  const {
    data: profile,
    isLoading: IsProLoading,
    error: isProfileError,
  } = UseUserStream(profileId);

  return (
    <Dialog className="max-h-screen sm:min-h-[60%]">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  overflow-hidden">
        <DialogHeader>
          <DialogTitle>{profile?.name}&apos;s followings</DialogTitle>
        </DialogHeader>

        {IsProLoading && !profile && <p>Loading...as</p>}
        {isProfileError && <p>{isProfileError.message}</p>}
        {profile?.following?.length === 0 && (
          <DialogDescription>
            <p className="text-center">No followers yet</p>
          </DialogDescription>
        )}
        <div className="w-full h-full pb-10 overflow-auto">
          {profile?.following?.map((followerId, index) => {
            return <FollowingShowCard key={index} followerId={followerId} />;
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
