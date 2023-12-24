import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";
import ProjectMemberInline from "../../project/_components/project-member-inline";
import ProjectSwitcher from "../../project/_components/project-switcher";
import BasicEvaluationInfo from "./_components/basic-info";
import ProjectMemberWorkDetails from "./_components/details-work";

export default async function ProjectMemberEvaluation({
  params,
}: {
  params: { lang: Locale; id: string; };
}) {
  
  const details = await getProjectWork(params.id);
  console.log(details)
  const dictionary = await getDictionary(params.lang);
  
  if(!details.projectMember){
    return (
      <pre>
        {JSON.stringify(
          details, null, 2
        )}
      </pre>
    )
      
  }
  
  return (
    <main className="flex gap-4">
      {/* LEFT SIDE  */}
      <section className="w-[360px] flex flex-col gap-8">
        <ProjectSwitcher project={details.projectMember?.project} />
        <ProjectMemberInline projectMember={details.projectMember} projectWork={details}/>
        <ProjectMemberWorkDetails projectMember={details.projectMember} projectWork={details} />
      </section>

      {/* RIGHT SIDE */}
      <section className="flex grow shrink">
        <div className="space-y-8 grow">
          <BasicEvaluationInfo
            text={dictionary.project.member.evaluate}
            workId={params.id}
            verified={details.work_verified != null}
            defaultValues={details.work_verified}
          />
        </div>
      </section>
    </main>
  );
}
