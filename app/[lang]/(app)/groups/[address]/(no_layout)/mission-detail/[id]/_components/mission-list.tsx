"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { startMissionCampaign } from "@/lib/data/mission";
import { Mission, MissionDetails, UserProgress } from "@/lib/interfaces";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MissionList({
  mission,
  userProgress,
  lang,
}: {
  mission: MissionDetails;
  userProgress: UserProgress[] | [];
  lang: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const totalPoints = mission.missions.reduce(
    (accumulator, currentItem) => accumulator + currentItem.score,
    0
  );

  const checkedPoints = Array.isArray(userProgress)
    ? userProgress?.reduce((accumulator: any, currentItem: UserProgress) => {
        if (currentItem.completed) {
          return accumulator + currentItem.mission.score;
        }
        return accumulator;
      }, 0)
    : 0;

  const startCampaign = async () => {
    setLoading(true);
    const result = await startMissionCampaign(mission.campaignId);

    if (result) {
      toast({
        title: "Success",
        description: "Succesfully started missoin campaign.",
      });

      router.refresh();
    }

    setLoading(false);
  };

  if (userProgress.length > 0) {
    return (
      <div className="flex flex-col gap-3">
        <Card className="flex flex-row items-center justify-between px-8 py-7">
          <>
            <span className="text-subhead_s">
              {lang.mission.detail.all_mission} ({userProgress.length})
            </span>

            <div className="p-3 text-center rounded-full text-title_l grow max-w-[140px] border-2 border-icon-primary">
              {checkedPoints}/{totalPoints}
            </div>
          </>
        </Card>

        {userProgress &&
          userProgress.map((item: UserProgress, index: number) => {
            return (
              <Card className="flex-row items-center px-8 py-7" key={index}>
                <div
                  className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${
                    item.completed
                      ? "bg-accent-primary text-accent-on-primary"
                      : "bg-background-layer-2 text-text-placeholder"
                  }`}
                >
                  <Check className="w-8 h-8" />
                </div>

                <div className="flex flex-col items-start gap-3 grow">
                  <span className="text-title_l">{item.mission.name}</span>

                  {item.mission.essential ? (
                    <Badge variant="success" className="px-1.5">
                      {lang.mission.detail.required}
                    </Badge>
                  ) : null}
                </div>

                <div
                  className={`p-3 text-center rounded-full text-title_l grow max-w-[140px] ${
                    item.completed
                      ? "bg-accent-secondary"
                      : "bg-background-layer-2 text-text-secondary"
                  }`}
                >
                  {item.mission.essential
                    ? `${item.mission.score} ${lang.mission.detail.get_points}`
                    : `${item.mission.score} ${lang.mission.detail.point}`}
                </div>
              </Card>
            );
          })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-row items-center justify-between px-8 py-7">
        <Button
          onClick={startCampaign}
          loading={loading}
          disabled={loading || userProgress.length > 0}
        >
          {lang.mission.detail.start}
        </Button>
      </Card>

      {mission.missions &&
        mission.missions.map((item: Mission, index: number) => {
          return (
            <Card className="flex-row items-center px-8 py-7" key={index}>
              <div
                className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${
                  false
                    ? "bg-accent-primary text-accent-on-primary"
                    : "bg-background-layer-2 text-text-placeholder"
                }`}
              >
                <Check className="w-8 h-8" />
              </div>

              <div className="flex flex-col items-start gap-3 grow">
                <span className="text-title_l">{item.name}</span>

                {item.essential ? (
                  <Badge variant="success" className="px-1.5">
                    {lang.mission.detail.required}
                  </Badge>
                ) : null}
              </div>

              <div
                className={`p-3 text-center rounded-full text-title_l grow max-w-[140px] ${
                  item.essential
                    ? "bg-accent-secondary"
                    : "bg-background-layer-2 text-text-secondary"
                }`}
              >
                {item.essential
                  ? `${item.score} ${lang.mission.detail.get_points}`
                  : `${item.score} ${lang.mission.detail.point}`}
                {/* {item.score}점 {item.essential ? " 획득!" : null} */}
              </div>
            </Card>
          );
        })}
    </div>
  );
}
