import { Mission } from "@/lib/interfaces"; // or your path to Mission type
import React from "react";
import { MissionItem } from "./mission-list-item";

interface MissionListProps {
  missions: Mission[];
  onMissionSelect: (mission: Mission) => void;
  selectedMissions: Mission[];
  lang: any;
}

// Define the component with a named function
function MissionListComponent({
  missions,
  onMissionSelect,
  selectedMissions,
  lang,
}: MissionListProps) {
  return (
    <div className="flex flex-col gap-4">
      {missions.map((mission) => (
        <MissionItem
          key={mission.missionId}
          mission={mission}
          onSelect={() => onMissionSelect(mission)}
          isActive={selectedMissions.some(
            (selectedMission) => selectedMission.missionId === mission.missionId
          )}
          lang={lang}
        />
      ))}
    </div>
  );
}

// Wrap the named component with React.memo
const MissionList = React.memo(MissionListComponent);

MissionList.displayName = "MissionList";

export default MissionList;
