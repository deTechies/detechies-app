"use client";

import Search from "@/components/extra/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Achievement } from "@/lib/interfaces";
import { DialogClose } from "@radix-ui/react-dialog";
import { ListPlus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const RewardForm = ({
  achievements,
  selectedAchievements,
  onSelectAchievement,
  onRemoveAchievement,
  onInputChange,
  lang,
}: {
  achievements: Achievement[];
  selectedAchievements: Array<{
    achievementId: string;
    min_score: number | "";
    min_required_missions: number | "";
  }>;
  onSelectAchievement: Function;
  onRemoveAchievement: Function;
  onInputChange: Function;
  lang: any;
}) => {
  const findSmallestMinScore = () => {
    let smallestScore = Infinity;

    selectedAchievements.forEach((achievement) => {
      if (
        typeof achievement.min_score === "number" &&
        achievement.min_score < smallestScore
      ) {
        smallestScore = achievement.min_score;
      }
    });

    return smallestScore === Infinity ? undefined : smallestScore;
  };

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const filteredData = achievements.filter((achievement: any) => {
    return achievement.name.toLowerCase().includes(search || "");
  });

  return (
    <div>
      <div className="flex flex-col justify-center gap-4 mb-6">
        {/* Display selected achievements with inputs for min_score and min_required_missions */}
        {selectedAchievements.map((achievement, index) => (
          <Card
            key={index}
            className="flex flex-row gap-4 p-6 border rounded-md border-border-input"
          >
            <div className="flex flex-col gap-4 grow">
              <div className="flex items-center justify-between gap-5">
                <div className="text-title_m">
                  {lang.mission.create.reward} {index + 1}
                  <span className="ml-1 text-state-error">*</span>
                </div>

                <div className="flex items-center gap-6 px-5 py-4 border rounded-md grow border-border-div">
                  <Image
                    src={
                      "https://ipfs.io/ipfs/" +
                      achievements.find(
                        (a) => a.id === achievement.achievementId
                      )?.image
                    }
                    alt="image_of_achievement"
                    width={60}
                    height={60}
                    className="rounded-sm"
                  />
                  <dl>
                    <dd className="mb-2 text-title_m">
                      {
                        achievements.find(
                          (a) => a.id === achievement.achievementId
                        )?.name
                      }
                    </dd>

                    <dd>
                      <Badge variant="info" shape="category">
                        {
                          achievements.find(
                            (a) => a.id === achievement.achievementId
                          )?.nft_type
                        }
                      </Badge>
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="flex items-center justify-end gap-5">
                <Label className="text-title_m">
                  <span>{lang.mission.create.reward_stand}</span>
                  <span className="ml-1 text-state-error">*</span>
                </Label>
                <Input
                  type="number"
                  className="w-16 text-center"
                  placeholder="100"
                  value={achievement.min_score}
                  onChange={(e) =>
                    onInputChange(
                      achievement.achievementId,
                      "min_score",
                      Number(e.target.value)
                    )
                  }
                />
                <Label className="text-title_m">
                  {lang.mission.create.reward_at_least}
                </Label>
                <Input
                  type="number"
                  className="w-16 text-center"
                  value={achievement.min_required_missions}
                  onChange={(e) =>
                    onInputChange(
                      achievement.achievementId,
                      "min_required_missions",
                      Number(e.target.value)
                    )
                  }
                  placeholder=" 2"
                />
              </div>
            </div>

            <div>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => onRemoveAchievement(achievement.achievementId)}
              >
                <X />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger className="grow">
            <Button variant="primary" size="lg" className="max-w-full">
              <Plus className="w-5 h-5 mr-2"></Plus>
              <span className="-mb-1">{lang.mission.create.add_reward}</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="gap-6">
            <div>
              <h2 className="mb-4 text-subhead_s">
                {lang.mission.create.select_nft}
              </h2>
              <h5 className="text-body_m">
                {lang.mission.create.select_nft_desc}
              </h5>
            </div>

            <Search placeholder={lang.mission.create.search_placeholder} />

            <div className="flex flex-col gap-3 max-h-[418px] overflow-y-auto">
              {filteredData.map((achievement) => (
                <button
                  key={achievement.id}
                  className={`flex items-center gap-4 border p-6 rounded-md 
                ${
                  selectedAchievements.some(
                    (a) => a.achievementId === achievement.id
                  ) && "bg-accent-secondary border-accent-primary"
                }
                `}
                  onClick={() => onSelectAchievement(achievement)}
                >
                  <Image
                    src={"https://ipfs.io/ipfs/" + achievement.image}
                    alt={achievement.name}
                    width={60}
                    height={60}
                    className="w-16 h-16 rounded-sm"
                  />

                  <div className="flex flex-col items-start">
                    <div className="mb-2 text-title_m">{achievement.name}</div>
                    <Badge variant={"info"} shape="category">
                      {achievement.nft_type}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              <DialogClose className="grow max-w-[212px]">
                <Button size="lg" className="w-full" variant="secondary">
                  {lang.mission.create.close}
                </Button>
              </DialogClose>

              <DialogClose className="grow max-w-[212px]">
                <Button size="lg" className="w-full">
                  {lang.mission.create.done}
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between py-7 px-9">
        <span className="text-subhead_s">
          {lang.mission.create.total_reward} ( {selectedAchievements.length} )
        </span>

        <div className="flex items-center">
          <span className="mr-3 text-subhead_s">
            {lang.mission.create.points_at_least}
          </span>

          <span className="text-accent-primary text-subhead_l mr-0.5">
            {findSmallestMinScore() || 0}
          </span>

          <span className="text-subhead_l">{lang.mission.create.points}</span>
        </div>
      </div>
    </div>
  );
};
export default RewardForm;
