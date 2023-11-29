"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ConfettiProps {
  count?: number;
  images?: string[];
}

const Confetti: React.FC<ConfettiProps> = ({ count = 10, images = [] }) => {
  const [pieces, setPieces] = useState<Array<JSX.Element>>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [iterations, setIterations] = useState<number[]>(new Array(count).fill(0));

  useEffect(() => {
    const newPieces: Array<JSX.Element> = [];

    const handleAnimationIteration = (index: number) => {
      setIterations(prev => {
        const newIterations = [...prev];
        newIterations[index]++;
        if (newIterations[index] >= 10) {
          setIsVisible(false);
        }
        return newIterations;
      });
    };
    

    for (let i = 0; i < count; i++) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const randomX = (Math.random() - 0.5) * 2000; // Random horizontal direction
      const randomY = (Math.random() - 0.5) * 2000; // Random vertical direction
      const style = {
        animationName: `popper-${i}`, // Unique animation name for each confetti piece
        animationDuration: `${1 + Math.random()}s`,
        animationDelay: `${Math.random() * 0.5}s`,
        animationIterationCount: "10", // Repeat the animation three times
        animationFillMode: "forwards", // Keep the state of the animation's end state
      };
      // Create unique keyframes for each confetti piece
      const styleSheet: any = document.styleSheets[0];
      const keyframes = `
      @keyframes popper-${i} {
        0% {
          transform: scale(1) rotate(0deg);
        }
        100% {
          transform: scale(2) translate(${randomX}px, ${randomY}px) rotate(360deg);
        }
      }
    `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      newPieces.push(
        <Image
          key={i}
          src={randomImage}
          alt="confetti"
          width={32}
          height={28}
          className="fixed w-8 h-8 top-50 left-50  bg-center animate-popper z-[-10] ${!isVisible ? 'hidden' : ''}`"
          style={style}
          onAnimationIteration={() => handleAnimationIteration(i)}
        />
      );
    }
    setPieces(newPieces);
  }, [count, images]);

  return <>{pieces}</>;
};

export default Confetti;
