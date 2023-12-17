import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectMember } from "@/lib/data/project";
import ProjectMemberInline from "../_components/project-member-inline";
import ProjectSwitcher from "../_components/project-switcher";
import BasicEvaluationInfo from "./_components/basic-info";
import ProjectMemberWorkDetails from "./_components/details-work";

export default async function ProjectMemberEvaluation({
  params,
}: {
  params: { lang: Locale; address: string; member: string };
}) {
  const details = await getProjectMember(params.address, params.member);
  const dictionary = await getDictionary(params.lang);
  return (
    <main className="flex gap-4">
      {/* LEFT SIDE  */}
      <section className="w-[360px] flex flex-col gap-8">
        <ProjectSwitcher project={details.project} />
        <ProjectMemberInline projectMember={details} />
        <ProjectMemberWorkDetails projectMember={details} />
      </section>

      {/* RIGHT SIDE */}
      <section className="flex grow shrink">
        <div className="space-y-8 grow">
          <BasicEvaluationInfo
            text={dictionary.project.member.evaluate}
            projectId={params.address}
            userId={params.member}
            verified={true}
          />
        </div>
      </section>
    </main>
  );
}
