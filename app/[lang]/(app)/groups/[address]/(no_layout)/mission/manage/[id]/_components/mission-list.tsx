
import { Mission } from "@/lib/interfaces";
import { MissionItem } from "./mission-list-item";


interface MissionListProps {
    missions: Mission[];
    onMissionSelect: (mission: Mission) => void;
    selectedMissions: Mission[];
  }
  
export const MissionList: React.FC<MissionListProps> = ({
    missions,
    onMissionSelect,
    selectedMissions,
  }) => {
    return (
      <div className="flex flex-col gap-4">
        {missions.map((mission) => (
          <MissionItem
            key={mission.missionId}
            mission={mission}
            onSelect={() => onMissionSelect(mission)}
            isActive={selectedMissions.some(
              selectedMission => selectedMission.missionId === mission.missionId
            )}
          />
        ))}
      </div>
    );
  };
  
  