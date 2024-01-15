import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { ProjectMember, ProjectWork } from "@/lib/interfaces";
import { beginEndDates } from "@/lib/utils";

export default function ProjectMemberInline({
  projectMember,
  projectWork,
  lang,
}: {
  projectMember: ProjectMember;
  projectWork?: ProjectWork;
  lang: any;
}) {
  console.log(projectMember);

  return (
    <div className="bg-background-layer-1 self-stretch p-5 rounded-[20px] border border-border-div gap-5 inline-flex">
      <div className="relative w-20 h-20 rounded-xl bg-background-layer-2">
      <IPFSImageLayer hashes={projectMember.user.avatar ? projectMember.user.avatar : defaultAvatar} />
      </div>

      <div className="inline-flex flex-col gap-4 grow shrink basis-0">
        <h5 className="text-title_m">
          {projectMember?.user?.display_name} | {lang.interface.role_type[projectMember?.role]}
        </h5>
        <div className="flex flex-col gap-2">
          <div className="inline-flex self-stretch gap-2">
            <span className="text-text-secondary text-label_m">
              {lang.interface.profession_type[projectMember.works[0].role]}
            </span>

            <span className="text-text-secondary text-label_m">
              | 기여도 {projectMember?.percentage}%
            </span>
          </div>
          <div className="inline-flex self-stretch gap-2">
            <div className="text-text-secondary text-label_m ">업무기간:</div>

            <div className="tracking-wide text-text-secondary text-label_m">
              {projectMember && beginEndDates(projectMember.created_at)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
