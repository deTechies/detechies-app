"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface NewImageProps extends Omit<ImageProps, "src"> {
  src?: string;
  placeholderSrc?: string;
  defaultSrc?: string;
}

const NewImage: React.FC<NewImageProps> = ({
  src,
  alt,
  placeholderSrc = "/images/careerzen.png",
  defaultSrc = "/images/careerzen.png",
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src || defaultSrc);

  useEffect(() => {
    setCurrentSrc(src || defaultSrc);
  }, [src, defaultSrc]);

  const handleError = () => {
    setCurrentSrc(defaultSrc);
  };

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      blurDataURL={placeholderSrc}
      placeholder="blur"
      onError={handleError}
      className={`bg-state-info-secondary aspect-square ${currentSrc === defaultSrc ? "object-contain" : ""} ${props.className}`}
    />
  );
};

export default NewImage;
