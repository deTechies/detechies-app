"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProjectMember } from "@/lib/interfaces";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import ProjectMemberInline from "./project-member-inline";
import ProjectSwitcher from "./project-switcher";
import { Badge } from "@/components/ui/badge";

type ProjectContributionProps = {
  projectMember: ProjectMember;
};
export default function ProjectMemberEvaluate({
  projectMember,
}: ProjectContributionProps) {
  const router = useRouter();

  console.log(projectMember);
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="primary">
          평가하기
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-8 ">
        <div className="inline-flex flex-col self-stretch gap-6">
          <div className="flex flex-col gap-4 ">
            <h1 className="text-xl font-semibold leading-7">
              업무/성과 평가하기
            </h1>

            <h5 className="text-body_m">
              평가받는 사람의 정보와 프로젝트 정보가 일치하는지 다시 한번 확인
              해주세요.
            </h5>
          </div>

          <Alert variant="info">
            <AlertTitle className="text-state-info">관리자 평가</AlertTitle>

            <AlertDescription>
              이 평가는 관리자 입장에서 팀원의 성과/기여도/전문성 등을 평가하며,
              팀원의 성과 인증에 가장 영향을 많이 미치는 평가 입니다. 신중하게
              평가를 남겨주세요. 사실과 다른 평가를 하는 경우 윤창진님의
              커리어에 불이익이 생길 수 있어요.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col self-stretch gap-4">
            <h3 className="text-title_m">프로젝트</h3>
            <ProjectSwitcher project={projectMember.project} />
          </div>

          <div className="flex flex-col self-stretch gap-4">
            <h3 className="text-title_m">평가받는 사람</h3>
            <ProjectMemberInline projectMember={projectMember} />
          </div>
          <div className="flex flex-col self-stretch gap-4">
            <div className="text-base font-semibold leading-tight tracking-tight text-neutral-900">
              업무 내용
            </div>
          </div>

          {projectMember.works.length > 0 &&
            projectMember.works.map((work) => {
              return (
                <div className="p-5 border rounded-md border-border-div">
                  <div className="flex gap-2 mb-5">
                    {work.tags.length > 0 &&
                      work.tags.map((tag: string, index: number) => (
                        <Badge shape="outline" variant="accent" key={index}>
                          {tag}
                        </Badge>
                      ))}
                  </div>

                  <div className="text-body_m">
                    {work.description}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center gap-2">
          <DialogClose className="max-w-[212px] grow w-full">
            <Button variant="secondary" size="lg" className="w-full">
              나중에 할게요
            </Button>
          </DialogClose>
          
          <Button
            variant={"primary"}
            size="lg"
            onClick={() => {
              router.push(`/work/${projectMember.works[0].workId}`);
            }}
          >
            {/* to evaluation */}
            평가하러 가기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
