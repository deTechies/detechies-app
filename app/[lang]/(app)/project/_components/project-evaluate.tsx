"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProjectMember } from "@/lib/interfaces";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import ProjectMemberInline from "./project-member-inline";
import ProjectSwitcher from "./project-switcher";

type ProjectContributionProps = {
  projectMember: ProjectMember;
  lang: any;
};
export default function ProjectMemberEvaluate({
  projectMember,
  lang,
}: ProjectContributionProps) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="primary">
          {lang.project.details.members.evalu.button}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-8 ">
        <div className="inline-flex flex-col self-stretch gap-6">
          <div className="flex flex-col gap-4 ">
            <h1 className="text-xl font-semibold leading-7">
              {lang.project.details.members.evalu.title}
            </h1>

            <h5 className="text-body_m">
              {lang.project.details.members.evalu.desc}
            </h5>
          </div>

          <Alert variant="info">
            <AlertTitle className="text-state-info">
              {lang.project.details.members.evalu.eval_admin}
            </AlertTitle>

            <AlertDescription>
              {lang.project.details.members.evalu.desc}
            </AlertDescription>
          </Alert>

          <div className="flex flex-col self-stretch gap-4">
            <h3 className="text-title_m">
              {lang.project.details.members.evalu.project}
            </h3>
            <ProjectSwitcher project={projectMember.project} />
          </div>

          <div className="flex flex-col self-stretch gap-4">
            <h3 className="text-title_m">
              {lang.project.details.members.evalu.evaluated}
            </h3>
            <ProjectMemberInline projectMember={projectMember} />
          </div>
          <div className="flex flex-col self-stretch gap-4">
            <div className="text-base font-semibold leading-tight tracking-tight text-neutral-900">
              {lang.project.details.members.evalu.job_desc}
            </div>
          </div>

          {projectMember.works.length > 0 &&
            projectMember.works.map((work, index: number) => {
              return (
                <div
                  className="p-5 border rounded-md border-border-div"
                  key={index}
                >
                  <div className="flex gap-2 mb-5">
                    {work.tags.length > 0 &&
                      work.tags.map((tag: string, index: number) => (
                        <Badge shape="outline" variant="accent" key={index}>
                          {tag}
                        </Badge>
                      ))}
                  </div>

                  <div className="text-body_m">{work.description}</div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center gap-2">
          <DialogClose className="max-w-[212px] grow w-full">
            <Button variant="secondary" size="lg" className="w-full">
              {lang.project.details.members.evalu.later}
            </Button>
          </DialogClose>

          <Button
            variant={"primary"}
            size="lg"
            onClick={() => {
              router.push(`/work/${projectMember.works[0].workId}`);
            }}
          >
            {lang.project.details.members.evalu.go_eval}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
