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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogCloseButton({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div class="flex min-h-screen items-center justify-center bg-gray-100">
          <div class="w-full max-w-md rounded-md bg-white p-4 shadow-lg">
            <div class="mb-4">
              <p class="text-sm font-medium text-gray-600">
                Comments on the Post:
              </p>
              <div class="mt-2 space-y-2 border-t pt-2">
                <div class="flex items-center space-x-2">
                  <img
                    src="https://via.placeholder.com/32"
                    alt="User Avatar"
                    class="h-8 w-8 rounded-full"
                  />
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-gray-800">
                      User1
                    </span>
                    <span class="text-sm font-medium text-gray-800">
                      @user1
                    </span>
                    <p class="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <img
                    src="https://via.placeholder.com/32"
                    alt="User Avatar"
                    class="h-8 w-8 rounded-full"
                  />
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-gray-800">
                      User2
                    </span>
                    <span class="text-sm font-medium text-gray-800">
                      @user2
                    </span>
                    <p class="text-sm text-gray-600">
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas.
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <img
                    src="https://via.placeholder.com/32"
                    alt="User Avatar"
                    class="h-8 w-8 rounded-full"
                  />
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-gray-800">
                      User3
                    </span>
                    <span class="text-sm font-medium text-gray-800">
                      @user3
                    </span>
                    <p class="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quis dignissimos libero laborum suscipit fugiat eos
                      architecto hic mollitia adipisci aliquam. Nisi illo autem
                      corrupti esse?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative mb-4">
              <label
                for="comment"
                class="block text-sm font-medium text-gray-600"
              >
                Your Comment:
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="3"
                class="mt-1 w-full resize-none rounded-md border p-2 focus:border-[#009ED9] focus:ring"
              ></textarea>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <button class="duration-250 rounded-md border bg-[#009ED9] px-4 py-2 text-white transition hover:border-[#009ED9] hover:bg-[white] hover:text-[#009ED9] focus:border-[#009ED9] focus:outline-none focus:ring">
                Post Comment
              </button>
              <span class="text-sm text-gray-600">250 characters left</span>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
