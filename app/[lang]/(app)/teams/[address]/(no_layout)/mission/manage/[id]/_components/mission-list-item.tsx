import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mission } from "@/lib/interfaces";
import { Check } from "lucide-react";
import React from "react";

interface MissionItemProps {
  mission: Mission;
  onSelect: () => void;
  isActive: boolean;
  lang: any;
}

export const MissionItem: React.FC<MissionItemProps> = ({
  mission,
  onSelect,
  isActive,
  lang,
}) => {
  return (
    <div
      className={`border rounded-md py-7 px-8 flex justify-between items-center flex-wrap ${
        isActive && "border-accent-primary"
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col gap-2.5 items-start">
        <h3 className="text-title_l">{mission.name}</h3>
        {mission.essential ? (
          <Badge variant="success" className="px-1.5">
            {lang.mission.detail.required}
          </Badge>
        ) : null}
      </div>
      <div className="flex items-center gap-5 ml-auto">
        <div
          className={`min-w-[140px] p-3 text-center rounded-full text-title_l grow max-w-[140px] ${
            isActive
              ? "bg-gradient-to-r from-accent-secondary to-state-success-secondary"
              : "bg-background-layer-2 text-text-secondary"
          }`}
        >
          {`${mission.score} ${lang.mission.detail.point}`}
        </div>

        {isActive ? (
          <Button
            size="icon_circle"
            variant={"success"}
            className="rounded-full"
          >
            <Check />
          </Button>
        ) : (
          <Button
            size="icon_circle"
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
