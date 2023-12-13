"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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




  return (
    <Dialog>
      <DialogTrigger>
        <Badge variant={"accent"}>Add Work</Badge>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <header className="flex flex-col gap-6">
          <h3 className="text-subhead_s">Add Contribution</h3>
          <h6 className="text-body_m">
            Record the results of your work in the project, which can be evaluated by your team mates and clients
          </h6>
        </header>
        <section>
            <h4 className="text-subhead_s mb-2">Project</h4>
            <ProjectSwitcher projectId={"!"} />
        </section>
        <section className="flex flex-col gap-4">
          <header className="flex justify-between items-center">
            <h4 className="text-subhead_s">Contribution</h4>
          </header>
          <ProjectContributionForm
          projectId={projectId}
          />
        </section>
        <section className="flex w-full justify-center">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}

    