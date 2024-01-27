"use client";
import InviteContributionMember from "@/components/invite-project-member/invite-contribution-member";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Project } from "@/lib/interfaces";
import { useState } from "react";
import {
  ContributionFormData,
} from "./project-contribution-form";
import ProjectContributionInviteForm from "./project-contribution-invite-form";
import ProjectSwitcher from "./project-switcher";
const newContribution = {
  valid: false,
} as ContributionFormData;

type ProjectContributionProps = {
  project: Project;
};
export default function ProjectContributionInvite({
  project,
  lang,
  onlyOne,
}: {
  // ProjectContributionProp
  project: Project;
  lang: any;
  onlyOne?: boolean;
}) {
  const [invite, setInvite] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"primary"} size={"lg"} className={"px-6"}>
          {lang.project.details.members.add_works.button}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 px-8">
        {!invite && (
          <>
            <header className="flex flex-col gap-4">
              <h3 className="text-subhead_s">
                {lang.project.details.members.add_works.title}
              </h3>
              <h6 className="text-body_m">
                {lang.project.details.members.add_works.desc}
              </h6>
            </header>

            <section>
              <h4 className="mb-5 text-subhead_s">
                {lang.project.details.members.add_works.project}
              </h4>
              <ProjectSwitcher project={project} lang={lang}/>
            </section>

            <section>
              <h4 className="mb-5 text-subhead_s">
                {lang.project.details.members.add_works.my_work}
              </h4>

              {project?.id && (
                <ProjectContributionInviteForm
                  projectId={project.id}
                  lang={lang}
                />
              )}
            </section>
          </>
        )}
        {invite && (
          <>
            {project?.id && (
              <InviteContributionMember projectId={project.id} lang={lang} />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
