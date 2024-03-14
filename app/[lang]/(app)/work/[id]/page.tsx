import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import ProjectMemberInline from "../../project/_components/project-member-inline";
import ProjectSwitcher from "../../project/_components/project-switcher";
import BasicEvaluationInfo from "./_components/basic-info";
import ProjectMemberWorkDetails from "./_components/details-work";
import InvalidWorkAccess from "./_components/invalid-work-access";
import NonAdminContributionForm from "./_components/non-admin-contribution-form";

export default async function ProjectMemberEvaluation({
  params,
}: {
  params: { lang: Locale; id: string };
}) {
  //const details = await getProjectWork(params.id);
  const result = await serverApi(`/survey-response/surveyByWork/${params.id}`);
  const dictionary = await getDictionary(params.lang);

  const details = result.data;
  
  if (!result) {
    return <InvalidWorkAccess details={details} />;
  }
  
  return (
    <main className="flex flex-wrap justify-center gap-4 md:flex-nowrap">
      {/* LEFT SIDE  */}
      <section className="w-full md:w-[504px] shrink-0 flex flex-col gap-4">
        <ProjectSwitcher
          title={dictionary.project.work.project}
          project={details.projectWork?.projectMember?.project}
          lang={dictionary}
        />
        <ProjectMemberInline
          title={dictionary.project.work.evaluatee}
          projectMember={details.projectWork?.projectMember}
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
      <section className="flex grow shrink max-w-[1027px]">
        <div className="space-y-8 grow">
          {details?.evaluator?.role === "admin" && (
            <BasicEvaluationInfo
              text={dictionary.project.evaluate}
              workId={params.id}
              verified={details.matching != null}
              defaultValues={details.matching}
              // projectId={details.data.evaluator.project.id}
              projectId={""}
            />
          )}
          {details?.evaluator?.role != "admin" && (
            <NonAdminContributionForm
              workId={params.id}
              text={dictionary.project.evaluate}
              defaultValues={details.matching}
              verified={details.matching != null}
              sameRole={
                details.evaluator?.works[0].role ===
                details.projectWork.role
              }
            />
          )}
        </div>
      </section>
    </main>
  );
}
