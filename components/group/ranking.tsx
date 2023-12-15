import { Check } from "lucide-react";
import React from "react";

interface RankElementProps {
  size: number;
  bgColor: string;
  active: boolean;
  onClick: () => void;
}

export const RankElement: React.FC<RankElementProps> = ({
    size,
    bgColor,
    active,
    onClick,
  }) => {
    
    return (
      <div
        onClick={onClick}
        style={{ width: size, height: size }}
        className={`relative cursor-pointer flex justify-center items-center rounded-full ${active ? "bg-accent-secondary shadow-inner" : bgColor}`}
      >
        {active ? (
          <Check size={16} className="absolute text-accent-primary transition-colors duration-500 ease-in-out" />
        ) : (
          <div className="w-1.5 h-1.5 bg-[#BEC3CA] rounded-full absolute" />
        )}
      </div>
    );
  };
  

interface RankingProps {
  ranks: number;
  minText: string;
  maxText: string;
  activeRank: number;
  onSelectRank: (rank: number) => void;
}

export const Ranking: React.FC<RankingProps> = ({
  ranks = 5,
  minText = "Low",
  maxText = "High",
  activeRank = 0,
  onSelectRank,
}) => {
  const BIG = 64;
  const SMALL = 32;
  const AVERAGE = Math.floor((ranks - 1) / 2);
  const SIZE = (BIG - SMALL) / AVERAGE;

  const handleRankSelect = (rank: number) => {
    onSelectRank(rank);
  };

  return (
    <div className="flex items-center gap-8">
      <span
        className={`col-span-1 px-4 py-2 text-sm bg-neutral-100 rounded-[4px] inline-flex text-title_s ease-out duration-200  
        ${
          activeRank < AVERAGE + 1 &&
          "bg-green-50 rounded-lg outline outline-1 outline-accent-primary"
        }`}
      >
        {minText}
      </span>
      <div className="grow shrink flex items-center">
      {Array.from({ length: ranks }, (_, index) => (
        <React.Fragment key={index}>
          <RankElement
            size={SMALL + Math.abs(index - AVERAGE) * SIZE}
            active={activeRank === index + 1}
            onClick={() => handleRankSelect(index + 1)}
            bgColor="bg-button-secondary"
          />
          {index < ranks - 1 && (
            <div className="flex-grow flex-shrink basis-0 h-0 border border-gray-100"></div>
          )}
        </React.Fragment>
      ))}
      </div>
      <span
        className={`flex px-4 py-2 text-sm bg-neutral-100 rounded-[4px]  text-title_s ease-out duration-200 ${
          activeRank > AVERAGE + 1 &&
          "bg-green-50 rounded-lg outline outline-1 outline-accent-primary"
        }`}
      >
        {maxText}
      </span>
    </div>
  );
};
