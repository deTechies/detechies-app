"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mission } from "@/lib/interfaces";
import { Check } from "lucide-react";

  interface MissionItemProps {
    mission: Mission;
    onSelect: () => void;
    isActive: boolean;
  }

  
export const MissionItem: React.FC<MissionItemProps> = ({
    mission,
    onSelect,
    isActive,
  }) => {
    return (
      <div
        className={`border rounded-md py-7 px-8 flex justify-between items-center ${
          isActive && "border-accent-primary"
        }`}
        onClick={onSelect}
      >
        <div className="flex flex-col gap-2.5 items-start">
          <h3 className="text-title_l">{mission.name}</h3>
          {
            mission.essential ? (
            <Badge variant={"accent"} className="w-content text-sm">
              필수 미션
            </Badge>
            ) : null
          }
          
        </div>
        <div className="flex gap-5">
          <Button size="sm" className="text-text-primary px-8">
            {mission.score}점
          </Button>
          {isActive ? (
            <Button size="icon" variant={"success"} className="rounded-full">
              <Check />
            </Button>
          ) : (
            <Button
              size="icon"
              variant={"secondary"}
              className=" rounded-full text-[#BEC3CA]"
            >
              <Check strokeWidth={3} />
            </Button>
          )}
        </div>
      </div>
    );
  };
  