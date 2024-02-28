import Image from 'next/image';
import React from 'react'; // Import React

interface AvatarProps {
  src: string;
  size?: number;
  className?: string;
  shape: 'rounded' | 'square';
}

// Wrap the component function with React.forwardRef
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ src, size = 16, className = '', shape= 'rounded' }, ref) => {
  const wrapperClass = `rounded-full bg-background-layer-2 border relative aspect-square hover:border-accent-primary ${className} w-${size} h-${size}`;
  
  const avatarClass = `rounded-full`
  //check if rounded or square and make it a dynamic class for rounded
  if (shape == 'square') {
    wrapperClass.replace('rounded-full', 'rounded-[6px]')
    avatarClass.replace('rounded-full', 'rounded-[6px]')
  }
  
  
  return (
    <div ref={ref} className={wrapperClass}>
      <Image
        src={src}
        alt="avatar"
        className={avatarClass}
        fill={true}
      />
    </div>
  );
});

Avatar.displayName = 'Avatar'; // Set a displayName for the component

export default Avatar;
