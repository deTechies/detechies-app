"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { MissionList } from "./mission-list";

export interface Mission {
  id: number;
  title: string;
  points: number;
  isRequired: boolean;
}

export default function MissionDetail({ missions }: { missions: Mission[] }) {
  const initialMissions: Mission[] = [
    { id: 1, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
    { id: 2, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
    { id: 3, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
    { id: 4, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
    { id: 5, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
  ];

  const [selectedMissions, setSelectedMissions] = useState<number[]>([]);

  // Function to handle mission selection
  const handleMissionSelect = (missionId: any) => {
    setSelectedMissions((prevSelected) => {
      if (prevSelected.includes(missionId)) {
        return prevSelected.filter((id) => id !== missionId);
      } else {
        return [...prevSelected, missionId];
      }
    });
  };

  // Function to upload selected missions to backend
  const uploadSelectedMissions = () => {
    console.log("Uploading:", selectedMissions);
  };

  const calculateTotalPoints = (): number => {
    return selectedMissions.reduce((total, missionId) => {
      const mission = missions.find((m) => m.id === missionId);
      return total + (mission ? mission.points : 0);
    }, 0);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-subhead_m">보상 수여하기</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-7 mt-7">
        <MissionList
          missions={missions}
          onMissionSelect={handleMissionSelect}
          selectedMissions={selectedMissions}
        />
        <section className="flex justify-between text-subhead_s">
          <span>
            달성한 미션 ( {selectedMissions.length} / {missions.length} )
          </span>
          <div>
            총 획득 점수{" "}
            <span className="text-accent-primary text-subhead_l">
              {calculateTotalPoints()}
            </span>{" "}
            점
          </div>
        </section>
        <section className="flex justify-between">
          <Button size="lg" variant="secondary">
            Go Back
          </Button>
          <Button size="lg" onClick={uploadSelectedMissions}>
            Upload Missions
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
