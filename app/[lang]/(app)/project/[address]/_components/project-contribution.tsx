"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { addMembersWork } from "@/lib/data/project";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import ProjectContributionForm, {
    ContributionFormData,
} from "./project-contribution-form";
import ProjectSwitcher from "./project-switcher";
const newContribution = {
  valid: false,
} as ContributionFormData;

type ProjectContributionProps = {
  projectId: string;
};
export default function ProjectContribution({projectId} : ProjectContributionProps) {
  const [contributions, setContributions] = useState<ContributionFormData[]>([
    newContribution,
  ]);
  const [activeContribution, setActiveContribution] = useState<number>(0);

  const handleProjectContributionSubmit = (
    index: number,
    projectData: ContributionFormData
  ) => {
    // Handle the project contribution data
    console.log(projectData);

    // Update the contributions state
    const newContributions = [...contributions];
    newContributions[index] = { ...projectData, valid: true };
    setContributions(newContributions);
  };

  async function saveNewContribution(){
    if (contributions.length === 0) {
      return;
    }
    //check if all is valid
    const allValid = contributions.every((contribution) => contribution.valid);
    if (!allValid) {
      toast({
        title: "error",
        description: "Please fill all the contributions",
        variant: "destructive",
      });
    }
    
    const result = await addMembersWork(contributions, projectId);
    console.log(contributions);
  };

  const addNewContribution = () => {
    // Add a new contribution

    const newContributions = [...contributions, newContribution];
    setContributions(newContributions);
    setActiveContribution(newContributions.length - 1);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Badge variant={"accent"}>Add Work</Badge>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <header className="flex flex-col gap-6">
          <h3 className="text-subhead_s">Add Contribution</h3>
          <h6 className="text-body_m">
            Record the results of your work in the project. I can be evaluated
            by team members, leaders, and clients and have solid certification
            for my career.
          </h6>
        </header>
        <section>
            <h4 className="text-subhead_s mb-2">Project</h4>
            <ProjectSwitcher projectId={"!"} />
        </section>
        <section className="flex flex-col gap-4">
          <header className="flex justify-between items-center">
            <h4 className="text-subhead_s">Contribution</h4>
            <div className="w-1/3 flex gap-2 justify-center">
              {contributions.map((contribution, index: number) => (
                <div
                  key={index}
                  className={`outline-none rounded-full w-2 h-2 outline-state-info-secondary cursor-pointer mx-2
                ${index === activeContribution && "outline-blue-600"} 
                `}
                  onClick={() => setActiveContribution(index)}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      contribution.valid
                        ? "bg-accent-primary"
                        : "bg-state-error"
                    }`}
                  />
                </div>
              ))}
            </div>
            <Badge
              onClick={addNewContribution}
              className="text-accent-primary cursor-pointer"
            >
              Add
            </Badge>
          </header>
          <ProjectContributionForm
            key={activeContribution}
            onFormSubmit={handleProjectContributionSubmit}
            removeForm={() => {
              const newContributions = [...contributions];
              newContributions.splice(activeContribution, 1);
              setContributions(newContributions);
              setActiveContribution(newContributions.length - 1);
            }}
            index={activeContribution}
            defaultValues={contributions[activeContribution]}
          />
        </section>
        <section className="flex w-full justify-center">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button onClick={saveNewContribution}>Save</Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}

    