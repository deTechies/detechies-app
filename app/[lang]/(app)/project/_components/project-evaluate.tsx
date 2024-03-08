"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectMember } from "@/lib/interfaces";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import ProjectMemberInline from "./project-member-inline";

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
      <DialogTrigger >
        <Button size="sm" variant={"primary"} >
          {lang.project.details.members.evalu.button}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-8 ">
        <div className="inline-flex flex-col self-stretch gap-6">
          <DialogHeader>
            <DialogTitle>
              {lang.project.details.members.evalu.title}
            </DialogTitle>

            <DialogDescription>
              {lang.project.details.members.evalu.desc}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col self-stretch gap-4">
            <h3 className="text-title_m">
              {lang.project.details.members.evalu.evaluated}
            </h3>
            <ProjectMemberInline projectMember={projectMember} lang={lang} />
          </div>
         
          {projectMember.works.length > 0 && (
            <>
              <div className="text-body_m">
              {projectMember.works[0].description}
            </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {projectMember.works[0].tags.length > 0 &&
                  projectMember.works[0].tags.map(
                    (tag: string, index: number) => (
                      <Badge variant="accent" key={index}>
                        {tag}
                      </Badge>
                    )
                  )}
              </div>
              </>
              
          )}
        </div>
        <div className="flex justify-center gap-2">
          <DialogClose className="max-w-[212px] grow w-full">
            <Button variant="secondary" className="w-full">
              {lang.project.details.members.evalu.later}
            </Button>
          </DialogClose>

          <Button
            variant={"primary"}
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
