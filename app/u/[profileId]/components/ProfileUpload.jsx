import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG"];

export default function DragDropProfile() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <img src={file} className="h-32" />
    </>
  );
}
