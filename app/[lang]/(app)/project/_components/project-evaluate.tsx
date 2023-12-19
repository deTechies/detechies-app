"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProjectMember } from "@/lib/interfaces";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import ProjectMemberInline from "./project-member-inline";
import ProjectSwitcher from "./project-switcher";

type ProjectContributionProps = {
  projectMember: ProjectMember;
};
export default function ProjectMemberEvaluate({
  projectMember,
}: ProjectContributionProps) {
    const router = useRouter()
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"primary"} size="sm">
          evaluate
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8 ">
        <div className="flex-col self-stretch gap-6 inline-flex">
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
            <AlertTitle className="text-state-info"> 관리자 평가</AlertTitle>
            <AlertDescription>
              이 평가는 관리자 입장에서 팀원의 성과/기여도/전문성 등을 평가하며,
              팀원의 성과 인증에 가장 영향을 많이 미치는 평가 입니다. 신중하게
              평가를 남겨주세요. 사실과 다른 평가를 하는 경우 윤창진님의
              커리어에 불이익이 생길 수 있어요.
            </AlertDescription>
          </Alert>

          <div className="self-stretch flex-col gap-4 flex">
            <h3 className="text-title_m">프로젝트</h3>
            <ProjectSwitcher project={projectMember.project} />
          </div>
          <div className="self-stretch flex-col gap-4 flex">
            <h3 className="text-title_m">평가받는 사람</h3>
            <ProjectMemberInline projectMember={projectMember} />
          </div>
          <div className="self-stretch flex-col gap-4 flex">
            <div className="text-neutral-900 text-base font-semibold leading-tight tracking-tight">
              업무 내용
            </div>
          </div>
          <div className="self-stretch p-5 rounded-md border border-border-div gap-5 inline-flex">
            <div className="text-body_m">
              {projectMember.works[0].description}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <DialogClose>
            <Button variant="secondary" size="lg">
              평가하기
            </Button>
          </DialogClose>
          <Button
            variant={"primary"}
            size="lg"
            onClick={() => {
                router.push(`/project/${projectMember.project.id}/${projectMember.user.id}`)
            }}
          >
            to evaluation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
