"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

type PropType = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};
const UploadImage = ({ setFile, file }: PropType) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  //   useEffect(() => {
  //     if(file){
  //         setPreviewUrl(file)
  //     }
  //   },[file])

  return (
    <div className="space-y-2">
      <label
        htmlFor="file"
        className="border border-dashed border-gray-400 rounded-md h-32 flex justify-center items-center cursor-pointer"
      >
        <div className="flex flex-col items-center text-gray-500">
          <Upload />
          <span>Select Image</span>
        </div>

        <input type="file" id="file" hidden onChange={handleFileSelect} />
      </label>

      {previewUrl && (
        <div className="flex">
          <div className="h-[60px] relative w-[60px] border border-gray-700 rounded-md">
            <button
              type="button"
              onClick={() => setPreviewUrl(null)}
              className="rounded-full size-5 bg-red-500 inline-flex items-center justify-center absolute -top-1 -right-1"
            >
              <X className="size-3"></X>
            </button>
            <img
              src={previewUrl}
              alt="Preview"
              className="h-[60px] w-[60px] object-cover rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
