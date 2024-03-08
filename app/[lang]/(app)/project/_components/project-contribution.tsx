"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import ProjectContributionForm from "./project-contribution-form";

export default function ProjectContribution({
  projectId,
  lang,
  defaultValues,
}: {
  projectId: string;
  lang?: any;
  defaultValues?: any;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        {defaultValues?.workId ? (
          <Button size="sm" variant="secondary">
            {lang.mypage.main.edit}
          </Button>
        ) : (
          <Button variant={"primary"} className={"px-6"}>
            {lang.project.details.members.add_works.button}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 px-8">
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle>
            {lang.project.details.members.add_works.title}
          </DialogTitle>
          <DialogDescription>
            {lang.project.details.members.add_works.desc}
          </DialogDescription>
        </DialogHeader>

        <section>
          {projectId && (
            <ProjectContributionForm
              projectId={projectId}
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
