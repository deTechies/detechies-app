"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Project } from "@/lib/interfaces";
import ProjectContributionForm, {
  ContributionFormData,
} from "./project-contribution-form";
import ProjectSwitcher from "./project-switcher";
import { Button } from "@/components/ui/button";
import InviteContributionMember from "@/components/invite-project-member/invite-contribution-member";
import { useState } from "react";
import ProjectContributionInviteForm from "./project-contribution-invite-form";
const newContribution = {
  valid: false,
} as ContributionFormData;

type ProjectContributionProps = {
  project: Project;
};
export default function ProjectContributionInvite({
  project,
  lang
}: {
  // ProjectContributionProp
  project:Project;
  lang:any;
}) {

  const [invite, setInvite] = useState<boolean>(false);
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"primary"} size={"lg"} className={"px-6"}>Add Work</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 px-8">
        {!invite && (
        <>
        <header className="flex flex-col gap-4">
        <h3 className="text-subhead_s">Add Contribution</h3>
        <h6 className="text-body_m">
          Record the results of your work in the project, which can be
          evaluated by your team mates and clients
        </h6>
        </header>

        <section>
          <h4 className="text-subhead_s mb-5">Project</h4>
          <ProjectSwitcher project={project} />
        </section>

        <section>
          <h4 className="text-subhead_s mb-5">Contribution</h4>

          {project?.id && <ProjectContributionInviteForm projectId={project.id} lang={lang} setInvite={setInvite}/> }
        </section>
        </>
        )}
        {invite && (
          <>
            <header className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
            <h5 className="text-subhead_m">{lang.details.invite_member.title}</h5>

            <p className="text-body_m">
              {lang.details.invite_member.body}
            </p>
            </div>
            </header>
    
            <InviteContributionMember projectId={project.id} lang={lang}/>
          </>
        )}
        
        </DialogContent>

    </Dialog>
  );
}
