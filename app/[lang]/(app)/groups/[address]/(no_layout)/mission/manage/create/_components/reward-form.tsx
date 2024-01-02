import Search from "@/components/extra/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Achievement } from "@/lib/interfaces";
import { ListPlus, X } from "lucide-react";
import Image from "next/image";

const RewardForm = ({
  achievements,
  selectedAchievements,
  onSelectAchievement,
  onRemoveAchievement,
  onInputChange,
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
}) => {
  return (
    <div>
      <div className="rounded-sm py-6 px-4 flex flex-col gap-4 justify-center">
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger className="grow">
              <div className="bg-background-layer-2 rounded-[6px] flex justify-between items-center px-4">
                <span className="text-text-placeholder text-title_m">
                  보상으로 수여할 NFT를 선택하세요.
                </span>
                <Button variant="secondary" size="icon">
                  <ListPlus className="text-text-secondary" />
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <h2>보상 NFT 선택하기</h2>
              <h5>보상 기준 달성 시, 수여할 NFT를 선택해주세요.</h5>
              <Search placeholder="NFT를 검색해보세요." />
              {achievements.map((achievement) => (
                <button
                  key={achievement.id}
                  className={` flex items-center gap-4 border py-6 px-4 rounded-sm 
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
                  <div className="flex flex-col gap-2">
                    <span className="text-title_m">{achievement.name}</span>
                    <Badge variant={"info"}>{achievement.nft_type}</Badge>
                  </div>
                </button>
              ))}
            </DialogContent>
          </Dialog>
        </div>

        {/* Display selected achievements with inputs for min_score and min_required_missions */}
        {selectedAchievements.map((achievement, index) => (
          <div
            key={index}
            className="border rounded-sm py-6 px-4 flex flex-col gap-4 justify-center "
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-6 items-center">
                <Image
                  src={
                    "https://ipfs.io/ipfs/" +
                    achievements.find((a) => a.id === achievement.achievementId)
                      ?.image
                  }
                  alt="image_of_achievement"
                  width={32}
                  height={32}
                  className="w-16 h-16"
                />
                <dl className="spacing-y-4">
                  <dd className="text-title_m">
                    {" "}
                    {
                      achievements.find(
                        (a) => a.id === achievement.achievementId
                      )?.name
                    }
                  </dd>
                  <dd>
                    {" "}
                    <Badge variant="info">
                      {" "}
                      {
                        achievements.find(
                          (a) => a.id === achievement.achievementId
                        )?.nft_type
                      }
                    </Badge>
                  </dd>
                </dl>
              </div>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => onRemoveAchievement(achievement.achievementId)}
              >
                <X />
              </Button>
            </div>
            <div className="flex  gap-4 justify-center items-center">
              <Label>보상 기준점수 * </Label>
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
              <Label>최소 필수미션 달성 수</Label>
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
        ))}
      </div>
    </div>
  );
};
export default RewardForm;
