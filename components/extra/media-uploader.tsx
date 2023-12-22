// MediaUploader.tsx
import { fileToBase64 } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface MediaUploaderProps {
  onFileSelected?: (file: File | null, base64: string | null) => void;
  width: number;
  height: number;
  deleteFile?: boolean;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onFileSelected,
  deleteFile,
  width,
  height,
}) => {
  const [mediaSource, setMediaSource] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log(width, height);
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image" || fileType === "video") {
        const src = URL.createObjectURL(file);
        setMediaSource(src);
        setMediaType(fileType);

        try {
          const base64String = await fileToBase64(file);
          if (onFileSelected) {
            onFileSelected(file, base64String);
          }
        } catch (error) {
          console.error("Error converting file to base64:", error);
        }
      } else {
        alert("Please upload an image or video format.");
      }
    }
  };

  return (
    <div className="flex gap-4">
      <div
        className="media-uploader relative rounded-sm bg-background-layer-2 flex items-center justify-center border border-dashed cursor-pointer hover:bg-background-layer-1"
        onClick={() => document.getElementById("media-input")?.click()}
      >
        <div
          className={`aspect-[${
            width / height
          }] w-[${width}] h-[${height}] flex items-center justify-center`}
        >
          {mediaType === "image" && mediaSource && (
            <Image
              src={mediaSource}
              alt="Uploaded Content"
              width={width}
              height={height}
              className={`w-${width} h-${height} block object-scale-down rounded-md`}
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
          {!mediaSource && (
            <div className="m-4 flex flex-col gap-4 text-text-secondary justify-center  items-center ">
              <ImagePlus
                size={64}
                className="text-text-secondary font-light"
                strokeWidth={1.5}
              />
              Click to upload
            </div>
          )}
          <input
            id="media-input"
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start justify-end">
        <p className="text-sm text-text-secondary">
          Upload a image for your project
        </p>
        <span className="text-body_s text-text-secondary">
          Recommended size: {width} x {height}
        </span>
        <Button
          size="sm"
          variant={"secondary"}
          type="button"
          onClick={() => {
            setMediaSource(null);
            setMediaType(null);
            if (onFileSelected) {
              onFileSelected(null, null);
            }
          }}
        >
          Delete Image
        </Button>
      </div>
    </div>
  );
};

export default MediaUploader;
