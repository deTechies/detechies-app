"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { createMissionCampaign } from "@/lib/data/mission";
import { Achievement } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { StepOne } from "./campaign-form";
import { StepTwo } from "./mission-form";
import RewardForm from "./reward-form";
import { CheckSquare, ChevronRight, Gift, Pencil } from "lucide-react";

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
  lang,
}: {
  clubId: string;
  achievements: Achievement[];
  lang: any;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);

    // we can create hte missions here
    const result = await createMissionCampaign(formData, clubId);
    toast({
      title: "Success",
      description: "Succesfully created missoin campaign.",
    });

    setLoading(false);
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
      <div className="mb-7">
        <h2 className="text-center text-heading_s ">
          {lang.mission.create.title}
        </h2>

        {/* progress tabs */}
      </div>

      <StepIndicator lang={lang} currentStep={currentStep}></StepIndicator>

      <Card className="w-full gap-6 py-10 px-14">
        <CardHeader className="flex-col items-start gap-3">
          {currentStep === 1 && (
            <h3 className="text-subhead_s">
              {lang.mission.create.mission_info}
            </h3>
          )}
          {currentStep === 2 && (
            <h3 className="text-subhead_s">
              {lang.mission.create.detail_info}
            </h3>
          )}
          {currentStep === 3 && (
            <h3 className="text-subhead_s">
              {lang.mission.create.reward_info}
            </h3>
          )}
          <span className="mb-1 text-body_s text-state-error">
            {lang.mission.create.required}
          </span>
        </CardHeader>

        <CardContent className="flex flex-col gap-10">
          {currentStep === 1 && (
            <StepOne
              onInputChange={onInputChange}
              formData={formData}
              lang={lang}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              updateMission={updateMission}
              removeMission={removeMission}
              missions={formData.missions}
              lang={lang}
            />
          )}
          {currentStep === 3 && (
            <RewardForm
              achievements={achievements}
              selectedAchievements={formData.selectedAchievements}
              onSelectAchievement={handleSelectAchievement}
              onRemoveAchievement={handleRemoveAchievement}
              onInputChange={handleInputChange}
              lang={lang}
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
                  {lang.mission.create.previous}
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
                  loading={loading}
                >
                  {lang.mission.create.next}
                </Button>
              )}
              {currentStep === 3 && (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={submitForm}
                  loading={loading}
                  disabled={nextDisabled() || loading}
                >
                  {lang.mission.create.submit}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =================================
// StepIndicator

const StepIndicator = ({
  lang,
  currentStep,
}: {
  lang: any;
  currentStep: number;
}) => {
  const stepIndicatorList = [
    { title: lang.mission.create.mission_info, icon: <Pencil></Pencil> },
    { title: lang.mission.create.detail_info, icon: <CheckSquare></CheckSquare> },
    { title: lang.mission.create.reward_info, icon: <Gift></Gift> },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center mb-10 gap-[30px]">
      {stepIndicatorList.map(
        (
          _stepItem: { title: string; icon: React.ReactNode },
          _index: number
        ) => {
          return (
            <>
              <StepIndicatorItem
                title={_stepItem.title}
                step={_index + 1}
                currentStep={currentStep}
              >
                {_stepItem.icon}
              </StepIndicatorItem>

              {_index + 1 < stepIndicatorList.length && (
                <ChevronRight className="w-7 text-border-input"></ChevronRight>
              )}
            </>
          );
        }
      )}
    </div>
  );
};

const StepIndicatorItem = ({
  title,
  step,
  currentStep,
  children,
}: {
  title: string;
  step: number;
  currentStep: number;
  children?: React.ReactNode;
}) => {
  const computedState = useMemo(() => {
    if (step < currentStep) {
      return "complete";
    } else if (step == currentStep) {
      return "active";
    } else {
      return "pre";
    }
  }, [step, currentStep]); 

  return (
    <div
      className={`flex items-center max-w-[190px] p-2 rounded-full w-full transition ${
        computedState == "active"
          ? "bg-accent-primary bg-animate"
          : "bg-background-layer-1"
      }`}
    >
      <div
        className={`flex items-center justify-center shrink-0 w-12 h-12 rounded-full transition aspect-square mr-3.5 ${
          computedState == "active"
            ? "bg-background-layer-1"
            : "bg-background-layer-2 text-border-input"
        }`}
      >
        {children}
      </div>

      <div>
        <div
          className={`text-title_l transition ${
            computedState == "active"
              ? "text-background-layer-1"
              : "text-border-input"
          }`}
        >
          STEP {step}
        </div>

        <div
          className={`text-label_s transition ${
            computedState == "active"
              ? "text-background-layer-1"
              : "text-text-secondary"
          }`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
