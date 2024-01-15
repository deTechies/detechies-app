import { Check } from "lucide-react";
import React from "react";

interface RankElementProps {
  size: number;
  bgColor: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const RankElement: React.FC<RankElementProps> = ({
    size,
    bgColor,
    active,
    disabled,
    onClick,
  }) => {
    
    return (
      <div
        onClick={!disabled ? onClick : undefined} // conditional onClick
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
  disabled?: boolean; 
  onSelectRank: (rank: number) => void;
}

export const Ranking: React.FC<RankingProps> = ({
  ranks = 5,
  minText = "Low",
  maxText = "High",
  activeRank = 0,
  disabled = false,
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
    <div className="grid grid-cols-8 items-center gap-8">
      <button
      onClick={() => handleRankSelect(1)}
        className={`col-span-2 file:flex px-4 py-2 text-sm bg-background-layer-2 rounded-[4px] text-center  text-title_s ease-out duration-200 
        ${
          activeRank < AVERAGE + 1 &&
          "!bg-accent-secondary rounded-lg outline outline-1 outline-accent-primary"
        }`}
      >
        {minText}
      </button>
      <div className="col-span-4 shrink justify-center grow flex items-center max-w-[420px]">
      {Array.from({ length: ranks }, (_, index) => (
        <React.Fragment key={index}>
          <RankElement
            size={SMALL + Math.abs(index - AVERAGE) * SIZE}
            active={activeRank === index + 1}
            onClick={() => !disabled &&  handleRankSelect(index + 1)}
            bgColor="bg-button-secondary w-12"
            disabled={disabled}
          />
          {index < ranks - 1 && (
            <div className="grow basis-0 h-0 border border-background-layer-2"></div>
          )}
        </React.Fragment>
      ))}
      </div>
      <button
      onClick={() => handleRankSelect(5)}
        className={`col-span-2 file:flex px-4 py-2 text-sm bg-background-layer-2 rounded-[4px] text-center  text-title_s ease-out duration-200 ${
          activeRank > AVERAGE + 1 &&
          "!bg-accent-secondary rounded-lg outline outline-1 outline-accent-primary"
        }`}
      >
        {maxText}
      </button>
    </div>
  );
};
