"use client";

import { useState } from "react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!;

export const useUploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    if (!file) {
      setError("Please select a file.");
      return { message: "Fail", url: null };
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const url = data.secure_url;

      return {
        message: "Success",
        url,
      };
    } catch (err) {
      console.error("Upload failed", err);
      setError("Upload failed");
      return {
        message: "Fail",
        url: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
};
