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
import { useEditUser } from "@/contexts/profile/context";
import { useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";

export function BannerUpload() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [image, setImage] = useState(null);

  const { handleUploadBannerPic, isLoading, userData, handleChange } =
    useEditUser();

  // console.log(acceptedFiles);

  useEffect(() => {
    function fileToDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
          resolve(event.target.result);
        };

        reader.onerror = function (error) {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    }

    if (acceptedFiles.length > 0) {
      fileToDataURL(acceptedFiles[0]).then((data) => {
        setImage(data);
        handleChange("photoURL", data);
      });
    }
  }, [acceptedFiles, handleChange]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Banner</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <section className="p-4 border border-dashed border-[#009ed9]">
          <div {...getRootProps({ className: "dropzone" })}>
            <input  {...getInputProps()} />
            <p className="cursor-pointer">Drag & drop some files here, or click to select files</p>
          </div>
        </section>
        <section className=" h-[150px] flex items-center justify-center w-full">
          <img
            className="object-cover object-center aspect-[5/1] border h-[150px]"
            alt="Profile"
            src={userData?.banner || image}
          />
        </section>

        <DialogFooter>
          <Button
            disabled={!image || isLoading}
            onClick={() => {
              handleUploadBannerPic(acceptedFiles[0]);
            }}
            type="submit"
          >
            {isLoading ? "Loading..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
