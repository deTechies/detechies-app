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
    achievementId: string;
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
    missions: [
      {
        name: "",
        description: "",
        score: 0,
        essential: false,
      },
    ],
    selectedAchievements: [],
  });

  const handleSelectAchievement = (achievement: Achievement) => {
    if (
      formData.selectedAchievements.some(
        (a) => a.achievementId === achievement.id
      )
    ) {
      // Remove the achievement if it's already selected
      setFormData({
        ...formData,
        selectedAchievements: formData.selectedAchievements.filter(
          (a) => a.achievementId !== achievement.id
        ),
      });
    } else {
      // Add the achievement if it's not already selected
      setFormData({
        ...formData,
        selectedAchievements: [
          ...formData.selectedAchievements,
          {
            achievementId: achievement.id,
            min_score: "",
            min_required_missions: "",
          },
        ],
      });
    }
  };

  const handleRemoveAchievement = (id: string) => {
    setFormData({
      ...formData,
      selectedAchievements: formData.selectedAchievements.filter(
        (a) => a.achievementId !== id
      ),
    });
  };

  const handleInputChange = (
    id: string,
    field: "min_score" | "min_required_missions",
    value: number
  ) => {
    setFormData({
      ...formData,
      selectedAchievements: formData.selectedAchievements.map((achievement) =>
        achievement.achievementId === id
          ? { ...achievement, [field]: value }
          : achievement
      ),
    });
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const onInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async () => {


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

  const removeMission = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      missions: prevFormData.missions.filter((_, i) => i !== index),
    }));
  };

  const nextDisabled = (): boolean => {
    if (currentStep == 1) {
      return (
        !formData.name ||
        !formData.description ||
        !formData.end_date ||
        !formData.begin_date ||
        new Date(formData.end_date) < new Date(formData.begin_date)
      );
    }

    if (currentStep == 2) {
      return formData.missions.some(
        (mission) => mission.score < 1 || mission.name === ""
      );
    }

    if (currentStep == 3) {
      return formData.selectedAchievements.some(
        (achievement) => !achievement.min_score || achievement.min_score < 1 
      );
    }

    return false;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-10">
        <h2 className="text-center text-heading_s">미션 생성하기</h2>

        {/* progress tabs */}
      </div>

      <Card className="w-full gap-6 py-10 px-14">
        <CardHeader className="flex-col items-start gap-3">
          {currentStep === 1 && (
            <h3 className="text-subhead_s">미션 정보 입력</h3>
          )}
          {currentStep === 2 && (
            <h3 className="text-subhead_s">상세 미션 등록</h3>
          )}
          {currentStep === 3 && (
            <h3 className="text-subhead_s">보상 정보 등록</h3>
          )}
          <span className="mb-1 text-body_s text-state-error">
            *는 필수입력 사항입니다.
          </span>
        </CardHeader>

        <CardContent className="flex flex-col gap-10">
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
              selectedAchievements={formData.selectedAchievements}
              onSelectAchievement={handleSelectAchievement}
              onRemoveAchievement={handleRemoveAchievement}
              onInputChange={handleInputChange}
            />
          )}

          <div className="flex justify-between w-full">
            <div className="max-w-[212px] grow">
              {
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={prevStep}
                >
                  Previous
                </Button>
              }
            </div>
            <div className="max-w-[212px] grow">
              {currentStep < 3 && (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={nextStep}
                  disabled={nextDisabled()}
                >
                  Next
                </Button>
              )}
              {currentStep === 3 && (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={submitForm}
                  disabled={nextDisabled()}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
