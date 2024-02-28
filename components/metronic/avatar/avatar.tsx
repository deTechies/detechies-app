import Image from 'next/image';
import React from 'react'; // Import React

interface AvatarProps {
  src: string;
  size?: number;
  className?: string;
}

// Wrap the component function with React.forwardRef
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ src, size = 16, className = '' }, ref) => {
  const wrapperClass = `rounded-full bg-background-layer-2 border relative aspect-square hover:border-accent-primary ${className} w-${size} h-${size}`;

  return (
    <div ref={ref} className={wrapperClass}>
      <Image
        src={src}
        alt="avatar"
        className="rounded-full"
        fill={true}
      />
    </div>
  );
});

Avatar.displayName = 'Avatar'; // Set a displayName for the component

export default Avatar;
