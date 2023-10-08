// MediaUploader.tsx
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface MediaUploaderProps {
  onFileSelected?: (file: File) => void;
  width: number;
    height: number;
    deleteFile?: boolean;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ onFileSelected, deleteFile, width, height }) => {
  const [mediaSource, setMediaSource] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(width, height)
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image" || fileType === "video") {
        const src = URL.createObjectURL(file);
        setMediaSource(src);
        setMediaType(fileType);
      } else {
        alert("Please upload an image or video format.");
      }

      if (onFileSelected) {
        onFileSelected(file);
      }
    }
  };
  

  useEffect(() => {
    if (deleteFile) {
      setMediaSource(null)
      setMediaType(null)
    }
  }
  , [deleteFile])

  return (
    <div
      className="media-uploader relative border rounded-md bg-black-200 flex items-center justify-center cursor-pointer hover:bg-black-300"
      onClick={() => document.getElementById("media-input")?.click()}
    >
      <div className={`aspect-square w-full flex items-center justify-center`}>
        {mediaType === "image" && mediaSource && (
          <Image
            src={mediaSource}
            alt="Uploaded Content"
            className="max-w-full max-h-full block object-scale-down rounded-md"
            fill={true}
          />
        )}
        {mediaType === "video" && mediaSource && (
          <video
            controls
            autoPlay
            loop
            muted
            className="max-w-full max-h-full block"
          >
            <source src={mediaSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {!mediaSource && <div className="m-4 flex flex-col gap-4 text-black justify-center items-center">
          <Upload />
          Click to upload
          </div>}
        <input
          id="media-input"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MediaUploader;