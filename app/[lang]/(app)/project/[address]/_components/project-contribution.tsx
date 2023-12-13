"use client";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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



  return (
    <Dialog>
      <DialogTrigger>
        <Badge variant={"accent"}>Add Work</Badge>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8">
        <header className="flex flex-col gap-4">
          <h3 className="text-subhead_s">Add Contribution</h3>
          <h6 className="text-body_m">
            Record the results of your work in the project, which can be evaluated by your team mates and clients
          </h6>
        </header>
        <section>
            <h4 className="text-subhead_s mb-5">Project</h4>
            <ProjectSwitcher projectId={"!"} />
        </section>
        <section className="flex flex-col gap-4">
            <h4 className="text-subhead_s">Contribution</h4>

          <ProjectContributionForm
          projectId={projectId}
          />
        </section>
      
      </DialogContent>
    </Dialog>
  );
}

    