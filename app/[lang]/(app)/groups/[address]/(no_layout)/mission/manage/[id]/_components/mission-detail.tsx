"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { uploadMissionChanges } from "@/lib/data/mission";
import { Mission, MissionDetails } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MissionList } from "./mission-list";

export default function MissionDetail({
  details,
}: {
  details: MissionDetails;
}) {
  const [initialSelectedMissions, setInitialSelectedMissions] = useState<
    Mission[]
  >([]);

  const [selectedMissions, setSelectedMissions] = useState<Mission[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  //check the user and see if he has selected some of the missions

  const searchParams = useSearchParams();

  const selectedMember = searchParams.get("memberId");

  useEffect(() => {
    //if it changed we want to change the select missions
    //get all the completed items for this users.
    const completedMissions = details.userProgress?.filter(
      (item) => item.completed && item.user.id === selectedMember
    );
    console.log(completedMissions);
    const missionIds: Mission[] =
      completedMissions?.map((item) => item.mission as Mission) || [];

    setInitialSelectedMissions(missionIds);
    setSelectedMissions(missionIds);
  }, [selectedMember, details.userProgress]);

  useEffect(() => {
    const calculateTotalPoints = (): number => {
      return selectedMissions.reduce((total, missionId) => {
        const mission = details.missions.find((m: Mission) => m === missionId);
        return total + (mission ? mission.score : 0);
      }, 0);
    };

    const result = calculateTotalPoints();
    setTotalPoints(result);
  }, [selectedMissions, details.missions]);

  // Function to handle mission selection
  const handleMissionSelect = (mission: Mission) => {
    setSelectedMissions((prevSelected) => {
      // Check if the mission is already selected based on missionId
      const isAlreadySelected = prevSelected.some(
        (selected) => selected.missionId === mission.missionId
      );

      if (isAlreadySelected) {
        return prevSelected.filter(
          (selected) => selected.missionId !== mission.missionId
        );
      } else {
        return [...prevSelected, mission];
      }
    });
  };

  // Function to upload selected missions to backend
  async function uploadSelectedMissions() {
    //now we only need to make sure that upload this list of items with the selected and change it
    const addedMissionsIds = selectedMissions
      .filter(
        (mission) =>
          !initialSelectedMissions
            .map((m) => m.missionId)
            .includes(mission.missionId)
      )
      .map((mission) => mission.missionId);

    const removedMissionsIds = initialSelectedMissions
      .filter(
        (mission) =>
          !selectedMissions.map((m) => m.missionId).includes(mission.missionId)
      )
      .map((mission) => mission.missionId);

    if (!selectedMember) return;
    const result = await uploadMissionChanges(
      addedMissionsIds,
      removedMissionsIds,
      selectedMember
    );

    toast(result);
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-subhead_m">보상 수여하기 </h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-7 mt-7">
        <MissionList
          missions={details.missions}
          onMissionSelect={handleMissionSelect}
          selectedMissions={selectedMissions}
        />
        <section className="flex justify-between text-subhead_s">
          <span>
            달성한 미션 ( {selectedMissions.length} / {details.missions.length}{" "}
            )
          </span>
          <div>
            총 획득 점수{" "}
            <span className="text-accent-primary text-subhead_l">
              {totalPoints}
            </span>{" "}
            점
          </div>
        </section>
        <section className="flex justify-between">
          <Button size="lg" variant="secondary">
            Go Back
          </Button>
          <Button
            size="lg"
            onClick={uploadSelectedMissions}
            disabled={!selectedMember}
          >
            Upload Missions
          </Button>
        </section>
      </CardContent>
    </Card>
  );
}
