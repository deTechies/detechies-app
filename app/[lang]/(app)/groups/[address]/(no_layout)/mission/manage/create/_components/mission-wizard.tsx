"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { createMissionCampaign } from "@/lib/data/mission";
import { Achievement } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepOne } from "./campaign-form";
import { StepTwo } from "./mission-form";
import RewardForm from "./reward-form";

interface Mission {
  name: string;
  description: string;
  score: number;
  essential: boolean;
}

interface FormData {
  name: string;
  begin_date: string;
  description: string;
  end_date: string;
  missions: Mission[];
  selectedAchievements: Array<{
    id: string;
    min_score: number | "";
    min_required_missions: number | "";
  }>;
}

export const Wizard = ({
  clubId,
  achievements,
}: {
  clubId: string;
  achievements: Achievement[];
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    begin_date: "",
    end_date: "",
    description: "",
    missions: [],
    selectedAchievements: [],
  });

  const [selectedAchievements, setSelectedAchievements] = useState<
    Array<{
      id: string;
      min_score: number | "";
      min_required_missions: number | "";
    }>
  >([]);

  const handleSelectAchievement = (achievement: Achievement) => {
    if (selectedAchievements.some((a) => a.id === achievement.id)) {
      // Remove the achievement if it's already selected
      setSelectedAchievements(
        selectedAchievements.filter((a) => a.id !== achievement.id)
      );
    } else {
      // Add the achievement if it's not already selected
      setSelectedAchievements([
        ...selectedAchievements,
        { id: achievement.id, min_score: "", min_required_missions: "" },
      ]);
    }
  };

  const handleRemoveAchievement = (id: string) => {
    setSelectedAchievements(
      selectedAchievements.filter((achievement) => achievement.id !== id)
    );
  };

  const handleInputChange = (
    id: string,
    field: "min_score" | "min_required_missions",
    value: number
  ) => {
    setSelectedAchievements(
      selectedAchievements.map((achievement) =>
        achievement.id === id ? { ...achievement, [field]: value } : achievement
      )
    );
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addMission = (mission: any) => {
    setFormData({ ...formData, missions: [...formData.missions, mission] });
  };

  const submitForm = async () => {
    console.log("Submitting Form Data:", JSON.stringify(formData, null, 2));

    // we can create hte missions here
    const result = await createMissionCampaign(formData, clubId);
    toast({
      title: "Success",
      description: "Succesfully created missoin campaign.",
    });

    router.push(`/groups/${clubId}/missions`);
  };

  const updateMission = (index: number, mission: Mission) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      missions: [
        ...prevFormData.missions.slice(0, index),
        mission,
        ...prevFormData.missions.slice(index + 1),
      ],
    }));
  };

  const updateSelectedAchievements = (
    selected: Array<{
      id: string;
      min_score: number | "";
      min_required_missions: number | "";
    }>
  ) => {
    setFormData({ ...formData, selectedAchievements: selected });
  };

  const removeMission = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      missions: prevFormData.missions.filter((_, i) => i !== index),
    }));
  };

  const calculateTotalPoints = (): number => {
    return formData.missions.reduce((total: number, mission) => {
      return total + parseInt(mission.score.toString());
    }, 0);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex-row">
        <h3 className="text-subhead_s">Create Mission</h3>
        <span className="text-label_s text-state-error-secondary">
          *는 필수입력 사항입니다.
        </span>
      </CardHeader>
      <CardContent className="my-4 flex flex-col gap-8">
        {currentStep === 1 && (
          <StepOne onInputChange={onInputChange} formData={formData} />
        )}
        {currentStep === 2 && (
          <StepTwo
            updateMission={updateMission}
            removeMission={removeMission}
            missions={formData.missions}
          />
        )}
        {currentStep === 3 && (
          <RewardForm
            achievements={achievements}
            selectedAchievements={selectedAchievements}
            onSelectAchievement={handleSelectAchievement}
            onRemoveAchievement={handleRemoveAchievement}
            onInputChange={handleInputChange}
          />
        )}
        {currentStep > 1 && (
          <section className="flex justify-between text-subhead_s">
            <span>
              달성한 미션 ( {formData.missions.length} /{" "}
              {formData.missions.length} )
            </span>
            <div>
              총 획득 점수{" "}
              <span className="text-accent-primary text-subhead_l">
                {calculateTotalPoints()}
              </span>{" "}
              점
            </div>
          </section>
        )}

        <div className="flex justify-between w-full my-4">
          <div>
            {currentStep > 1 && (
              <Button variant="secondary" size="lg" onClick={prevStep}>
                Previous
              </Button>
            )}
          </div>
          <div>
            {currentStep < 3 && (
              <Button variant="primary" size="lg" onClick={nextStep}>
                Next
              </Button>
            )}
            {currentStep === 3 && (
              <Button onClick={submitForm} size="lg">
                Submit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
