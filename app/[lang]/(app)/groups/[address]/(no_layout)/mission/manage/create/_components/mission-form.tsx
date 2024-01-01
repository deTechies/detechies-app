import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, XIcon } from "lucide-react";
import { ChangeEvent } from "react";


interface StepTwoProps {
  updateMission: (index: number, mission: Mission) => void;
  removeMission: (index: number) => void; // Function to remove a mission
  missions: Mission[];
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

  return (
    <section className="flex flex-col gap-5 my-4">
      {missions.map((mission, index) => (
        <div
          key={index}
          className="flex items-center gap-2 border rounded-sm px-3 py-2"
        >
          <Label className="shrink-0 text-xs">미션{index + 1} *</Label>
          <Input
            type="text"
            name="name"
            placeholder="Mission Name"
            value={mission.name}
            onChange={(e) => handleMissionInputChange(index, e)}
            className="flex grow"
          />
          <Label className="shrink-0 text-xs">점수 *</Label>
          <Input
            type="number"
            name="score"
            placeholder="0"
            value={mission.score}
            onChange={(e) => handleMissionInputChange(index, e)}
            className="w-16 text-center"
            min={0}
            max={100}
            maxLength={3}
          />

          <Input
            type="checkbox"
            name="essential"
            checked={mission.essential}
            className="rounded-[4px] h-8 w-8 border-2 border-border-primary"
            onChange={(e) => handleMissionInputChange(index, e)}
          />
          <Label className="shrink-0 text-xs">필수미션</Label>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => removeMission(index)}
          >
            <XIcon />
          </Button>
        </div>
      ))}
      <Button onClick={handleAddMission}>
        <Plus className="mr-4 text-accent-primary" />
        Add Another Mission
      </Button>
    </section>
  );
};