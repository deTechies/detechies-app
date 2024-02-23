// MediaUploader.tsx
import { fileToBase64 } from "@/lib/utils";
import { ImagePlus } from "lucide-react";
// import Image from "next/image";
import Image from "@/components/ui/image";
import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { useDictionary } from "@/lib/dictionaryProvider";

interface MediaUploaderProps {
  onFileSelected?: (file: File | null, base64: string | null) => void;
  width: number;
  height: number;
  deleteFile?: boolean;
  children?: React.ReactNode;
  defaultImage?: string;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  onFileSelected,
  defaultImage,
  deleteFile,
  width,
  height,
  children,
}) => {
  const [mediaSource, setMediaSource] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const random = Math.random();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dictionary = useDictionary();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

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
        window.alert("Please upload an image or video format.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
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
        window.alert("Please upload an image or video format.");
      }
    }
  };

  const content = children || (
    <>
      <p className="text-sm text-text-secondary">
        Upload a image for your project
      </p>
      <span className="text-body_s text-text-secondary">
        Recommended size: {width} x {height}
      </span>
    </>
  );

  return (
    <div className="flex flex-wrap gap-4">
      <div
        className="relative flex items-center justify-center overflow-hidden border-2 border-dashed rounded-sm cursor-pointer border-border-input media-uploader bg-background-layer-2 hover:bg-background-layer-1"
        onClick={() => document.getElementById(random.toString())?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className={`flex items-center justify-center`}
          style={{
            aspectRatio: width + "/" + height,
            width: width + "px",
            height: height + "px",
          }}
        >
          {mediaType === "image" && mediaSource && (
            <Image
              src={mediaSource}
              alt="Uploaded Content"
              width={width}
              height={height}
              className="block object-contain"
            />
          )}
          {mediaType === "video" && mediaSource && (
            <video
              controls
              autoPlay
              loop
              muted
              className="block max-w-full max-h-full"
            >
              <source src={mediaSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {defaultImage && !mediaSource && (
            <Image
              src={defaultImage}
              alt="default-image"
              width={width}
              height={height}
              className="block object-contain"
            />
          )}
          {!defaultImage && !mediaSource && (
            <div
              className={`flex flex-col gap-2 text-text-secondary py-3 px-4 text-center text-xs justify-center items-center w-full`}
            >
              <ImagePlus
                size={24}
                className="font-light text-text-secondary"
                strokeWidth={1.5}
              />
              {dictionary.media_uploader.drag}
            </div>
          )}
          <input
            id={random.toString()}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-end gap-5">
        {content}

        <div className="flex gap-1">
          <Button
            size="sm"
            variant={"secondary"}
            type="button"
            className="text-xs"
            onClick={() => {
              document.getElementById(random.toString())?.click();
            }}
          >
            {dictionary.media_uploader.upload_image}

            {/* Upload Image */}
          </Button>
          <Button
            size="sm"
            variant={"secondary"}
            type="button"
            className="text-xs"
            disabled={mediaSource == null}
            onClick={() => {
              setMediaSource(null);
              setMediaType(null);
              if (onFileSelected) {
                onFileSelected(null, null);
              }
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            {dictionary.media_uploader.delete_image}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediaUploader;
