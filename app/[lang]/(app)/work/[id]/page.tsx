import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";
import { redirect } from "next/navigation";
import ProjectMemberInline from "../../project/_components/project-member-inline";
import ProjectSwitcher from "../../project/_components/project-switcher";
import BasicEvaluationInfo from "./_components/basic-info";
import ProjectMemberWorkDetails from "./_components/details-work";

export default async function ProjectMemberEvaluation({
  params,
}: {
  params: { lang: Locale; id: string };
}) {
  
  const {data: details} = await getProjectWork(params.id);
  const dictionary = await getDictionary(params.lang);
  
  if(!details?.projectWork){
    return (
      <pre>
        {JSON.stringify(
          details, null, 4
        )}
      </pre>
    )
  }
  
  if(details?.evaluator.role != 'admin'){
    redirect(`/work/${params.id}/feedback`)
  }

  return (
    <main className="flex gap-4">
      {/* LEFT SIDE  */}
      <section className="w-[360px] flex flex-col gap-4">
        <ProjectSwitcher
          title={dictionary.project.work.project}
          project={details.evaluator?.project}
          lang={dictionary}
        />
        <ProjectMemberInline
          title={dictionary.project.work.evaluatee}
          projectMember={details.projectWork.projectMember}
          projectWork={details.projectWork}
          lang={dictionary}
        />
        <ProjectMemberWorkDetails
          projectMember={details.projectMember}
          projectWork={details.projectWork}
          lang={dictionary}
        />
      </section>

      {/* RIGHT SIDE */}
      <section className="flex grow shrink">
        <div className="space-y-8 grow">
          <BasicEvaluationInfo
            text={dictionary.project.evaluate}
            workId={params.id}
            verified={details.matching != null}
            defaultValues={details.matching}
          />
        </div>
      </section>
    </main>
  );
}
