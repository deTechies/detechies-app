"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Project } from "@/lib/interfaces";
import ProjectContributionInviteForm from "../../../_components/project-contribution-invite-form";
import ProjectSwitcher from "../../../_components/project-switcher";

export default function AddProjectContribution({
  project,
  lang,
  defaultValues,
}: {
  // ProjectContributionProp
  project: Project;
  lang: any;
  defaultValues?: any;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"primary"} size={"lg"} className={"px-6"}>
          {lang.project.details.members.add_works.button}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 px-8">
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
          <ProjectSwitcher project={project} lang={lang} />
        </section>

        <section>
          <h4 className="mb-5 text-subhead_s">
            {lang.project.details.members.add_works.my_work}
          </h4>

          {project?.id && (
            <ProjectContributionInviteForm projectId={project.id} lang={lang} defaultValues={defaultValues}/>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
