"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ABI } from "@/lib/constants";
import { rewardMissionNFT } from "@/lib/data/achievements";
import { uploadMissionChanges } from "@/lib/data/mission";
import { getUserById } from "@/lib/data/user";
import { Club, Mission, MissionDetails } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Address, useContractWrite } from "wagmi";
import ManageMissionReward from "./manage-mission-reward";
import MissionList from "./mission-list";

export default function MissionDetail({
  details,
  club,
  lang,
}: {
  details: MissionDetails;
  club: Club;
  lang: any;
}) {
  const [initialSelectedMissions, setInitialSelectedMissions] = useState<
    Mission[]
  >([]);

  const [missionState, setMissionState] = useState({
    selectedMissions: [] as Mission[],
    totalPoints: 0,
  });

  const { write: distributeAchievement, data } = useContractWrite({
    address: club.contract as Address,
    abi: ABI.group,
    functionName: "distributeAchievement",
  });
  const searchParams = useSearchParams();
  const selectedMember = searchParams.get("memberId");

  useEffect(() => {
    //if it changed we want to change the select missions
    //get all the completed items for this users.
    const completedMissions = details.userProgress?.filter(
      (item) => item.completed && item.user.id === selectedMember
    );

    const missionIds: Mission[] =
      completedMissions?.map((item) => item.mission as Mission) || [];

    const totalPoints = missionIds.reduce(
      (accumulator, currentItem) => accumulator + currentItem.score,
      0
    );

    setInitialSelectedMissions(missionIds);
    setMissionState({ selectedMissions: missionIds, totalPoints: totalPoints });
  }, [selectedMember, details.userProgress]);

  // Function to handle mission selection
  const handleMissionSelect = useCallback((mission: Mission) => {
    setMissionState((prevState: any) => {
      const isAlreadySelected = prevState.selectedMissions.some(
        (selected: Mission) => selected.missionId === mission.missionId
      );

      const newSelectedMissions = isAlreadySelected
        ? prevState.selectedMissions.filter(
            (selected: Mission) => selected.missionId !== mission.missionId
          )
        : [...prevState.selectedMissions, mission];

      const newTotalPoints = newSelectedMissions.reduce(
        (total: number, mission: Mission) => {
          return total + mission.score;
        },
        0
      );

      return {
        selectedMissions: newSelectedMissions,
        totalPoints: newTotalPoints,
      };
    });
  }, []);

  async function uploadSelectedMissions() {
    const addedMissionsIds = missionState.selectedMissions
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
          !missionState.selectedMissions
            .map((m: Mission) => m.missionId)
            .includes(mission.missionId)
      )
      .map((mission) => mission.missionId);

    if (!selectedMember) return;
    const result = await uploadMissionChanges(
      addedMissionsIds,
      removedMissionsIds,
      selectedMember
    );

    //get the wallet of the selected member.
    const getUser = await getUserById(selectedMember);
    for (const achievement of details.achievements) {
      if (missionState.totalPoints >= achievement.min_score) {
        const result = await rewardMissionNFT(
          getUser.id,
          achievement.achievement.id,
          achievement.achievement.tokenId,
          "hash"
        );

        if (result.ok) {
          await distributeAchievement({
            args: [achievement.achievement.tokenId, getUser.wallet, 1],
          });
        }
        toast({
          title: "Success",
          description: <pre>{JSON.stringify(result, null, 2)}</pre>,
        });
      }
    }

    toast(result);
  }

  return (
    <div className="flex gap-4 flex-col">
      <ManageMissionReward
        achievements={details.achievements}
        totalPoints={missionState.totalPoints}
        lang={lang}
      />

      <Card>
        <CardHeader>
          <h2 className="text-subhead_m">{lang.mission.manage.evalu}</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-7 mt-7">
          <MissionList
            missions={details.missions}
            onMissionSelect={(mission) => handleMissionSelect(mission)}
            selectedMissions={missionState.selectedMissions}
            lang={lang}
          />
          <section className="flex justify-between text-subhead_s">
            <span>
              {lang.mission.manage.cleard_mission} ({" "}
              {missionState.selectedMissions.length} / {details.missions.length}{" "}
              )
            </span>
            <div>
              {lang.mission.manage.total_points}{" "}
              <span className="text-accent-primary text-subhead_l">
                {missionState.totalPoints}
              </span>{" "}
              {lang.mission.manage.points}
            </div>
          </section>
          <section className="flex justify-between">
            <Button size="lg" variant="secondary">
              {lang.mission.manage.back}
            </Button>
            <Button size="lg" onClick={uploadSelectedMissions}>
              {lang.mission.manage.save}
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
