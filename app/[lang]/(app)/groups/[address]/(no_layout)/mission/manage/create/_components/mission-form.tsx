"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, XIcon } from "lucide-react";
import { ChangeEvent } from "react";
import { useEffect } from "react";

interface StepTwoProps {
  updateMission: (index: number, mission: Mission) => void;
  removeMission: (index: number) => void; // Function to remove a mission
  missions: Mission[];
  lang: any;
}
interface Mission {
  name: string;
  description: string;
  score: number;
  essential: boolean;
}

export const StepTwo: React.FC<StepTwoProps> = ({
  updateMission,
  removeMission,
  missions,
  lang,
}) => {
  const handleMissionInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    const updatedMission = {
      ...missions[index],
      [name]: type === "checkbox" ? checked : value,
    };
    updateMission(index, updatedMission);
  };

  const handleAddMission = () => {
    updateMission(missions.length, {
      name: "",
      description: "",
      score: 0,
      essential: false,
    });
  };

  const calculateTotalPoints = (): number => {
    return missions.reduce((total: number, mission) => {
      return total + parseInt(mission.score.toString() || "0");
    }, 0);
  };

  return (
    <section>
      <div className="flex flex-col gap-3 mb-6">
        {missions.map((mission, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-6 border rounded-md border-border-input"
          >
            <Label className="text-title_m shrink-0">
              {lang.mission.create.mission} {index + 1}{" "}
              <span className="ml-1 text-state-error">*</span>
            </Label>

            <Input
              type="text"
              name="name"
              placeholder="Mission Name"
              value={mission.name}
              onChange={(e) => handleMissionInputChange(index, e)}
              className="flex grow h-[60px]"
            />

            <Label className="text-title_m shrink-0">
              {lang.mission.create.point}{" "}
              <span className="ml-1 text-state-error">*</span>
            </Label>

            <Input
              type="number"
              name="score"
              placeholder="0"
              value={mission.score}
              onChange={(e) => handleMissionInputChange(index, e)}
              className="w-16 text-center h-[60px]"
              min={0}
              max={100}
              maxLength={3}
            />

            <div className="flex items-center gap-1 shrink-0">
              <Input
                type="checkbox"
                name="essential"
                checked={mission.essential}
                className="rounded-[4px] h-5 w-5 border-2 border-border-primary"
                onChange={(e) => handleMissionInputChange(index, e)}
              />

              <Label className="text-label_s shrink-0">
                {lang.mission.create.required_mission}
              </Label>
            </div>

            <div className="w-12 shrink-0">
              {index != 0 && (
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => removeMission(index)}
                >
                  <XIcon />
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button onClick={handleAddMission} size="lg" className="max-w-full">
          <Plus className="mr-2 text-accent-primary" />
          <div className="-mb-1">{lang.mission.create.add_mission}</div>
        </Button>
      </div>

      <div className="flex items-center justify-between py-7 px-9">
        <span className="text-subhead_s">
          {lang.mission.create.total_mission} ( {missions.length} )
        </span>

        <div className="flex items-center">
          <span className="mr-3 text-subhead_s">
            {lang.mission.create.total_point}
          </span>

          <span className="text-accent-primary text-subhead_l mr-0.5">
            {calculateTotalPoints()}
          </span>

          <span className="text-subhead_l">{lang.mission.create.points}</span>
        </div>
      </div>
    </section>
  );
};
