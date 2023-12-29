import { Mission } from "./mission-detail";
import { MissionItem } from "./mission-list-item";


interface MissionListProps {
    missions: Mission[];
    onMissionSelect: (missionId: number) => void;
    selectedMissions: number[];
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
            key={mission.id}
            mission={mission}
            onSelect={() => onMissionSelect(mission.id)}
            isActive={selectedMissions.includes(mission.id)}
          />
        ))}
      </div>
    );
  };
  
  