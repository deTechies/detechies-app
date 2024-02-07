"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Project } from "@/lib/interfaces";
import ProjectContributionForm, {
  ContributionFormData,
} from "./project-contribution-form";
import ProjectSwitcher from "./project-switcher";
const newContribution = {
  valid: false,
} as ContributionFormData;

type ProjectContributionProps = {
  project: Project;
  lang: any;
  defaultValues?: any;
};
export default function ProjectContribution({
  project,
  lang,
  defaultValues,
}: ProjectContributionProps) {

  return (
    <Dialog>
      <DialogTrigger>
        {defaultValues?.workId ? (
          <Button size="sm" variant="secondary">
            {lang.mypage.main.edit}
          </Button>
        ) : (
          <Button variant={"primary"} size={"lg"} className={"px-6"}>
            {lang.project.details.members.add_works.button}
          </Button>
        )}
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

        <section className="flex flex-col gap-5">
          <h4 className="text-subhead_s">
            {lang.project.details.members.add_works.project}
          </h4>
          <ProjectSwitcher project={project} lang={lang} />
        </section>

        <section>
          <h4 className="mb-5 text-subhead_s">Contribution</h4>

          {project?.id && (
            <ProjectContributionForm
              project={project}
              lang={lang}
              workDetails={defaultValues}
              workId={defaultValues?.workId}
            />
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
