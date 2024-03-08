import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { ProjectMember, ProjectWork } from "@/lib/interfaces";
import { beginEndDates } from "@/lib/utils";

export default function ProjectMemberInline({
  projectMember,
  projectWork,
  lang,
  title,
}: {
  projectMember: ProjectMember;
  projectWork?: ProjectWork;
  lang: any;
  title?: string;
}) {
  return (
    <div className="self-stretch p-5 border rounded-sm bg-background-layer-1 border-border-div">
      {title && <div className="mb-5 text-subhead_s">{title}</div>}

      <div className="inline-flex gap-5 ">
        <div className="relative w-20 h-20 rounded-xl bg-background-layer-2">
          <IPFSImageLayer
            hashes={
              projectMember?.user?.avatar
                ? projectMember.user.avatar
                : defaultAvatar
            }
          />
        </div>

        <div className="inline-flex flex-col gap-4 grow shrink basis-0">
          <h5 className="text-title_m">
            {projectMember?.user?.display_name} |{" "}
            {lang.interface.role_type[projectMember?.role]}
          </h5>
          <div className="flex flex-col gap-2">
            <div className="inline-flex self-stretch gap-2">
              <span className="text-text-secondary ">
                {
                  lang.interface.profession_type[
                    projectWork?.role || projectMember?.works[0]?.role
                  ]
                }
              </span>

              <span className="text-text-secondary ">
                | {lang.project.details.members.evalu.contribution}{" "}
                {projectWork?.percentage || projectMember?.works[0]?.percentage}
                %
              </span>
            </div>
            <div className="inline-flex self-stretch gap-2">
              <div className="text-text-secondary text-label_m ">
                {lang.project.details.members.evalu.job_period}:
              </div>

              <div className="tracking-wide text-text-secondary">
                {projectWork
                  ? beginEndDates(projectWork.begin_date, projectWork.end_date)
                  : beginEndDates(
                      projectMember?.works[0].begin_date,
                      projectMember?.works[0].end_date
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
