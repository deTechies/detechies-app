import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";
import { getEvaluationSurvey } from "@/lib/data/survey";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectMemberInline from "../../../project/_components/project-member-inline";
import ProjectSwitcher from "../../../project/_components/project-switcher";
import BasicEvaluationInfo from "../_components/basic-info";
import ProjectMemberWorkDetails from "../_components/details-work";
import NonAdminContributionForm from "../_components/non-admin-contribution-form";
import EvaluateTeamForm from "../feedback/evaluate-team-form";
import { SurveyForm } from "../survey/surveyform";
import FinalFeedbackOverview from "./_components/swot-analysis";

export default async function EvaluationResult({
  params,
}: {
  params: { lang: Locale; id: string };
}) {
  const { data: details } = await getProjectWork(params.id);
  const dictionary = await getDictionary(params.lang);
  const { data: surveyData } = await getEvaluationSurvey(params.id);
  

  if (!details) redirect(`/work/${params.id}`);


  return (
    <main className="flex gap-4">
      {/* LEFT SIDE  */}
      <section className="w-[360px] flex flex-col gap-8 shrink-0">
        <ProjectSwitcher
          project={details.evaluator?.project}
          lang={dictionary}
        />
        <ProjectMemberInline
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
      <section className="flex mb-10 grow shrink">
        <div className="space-y-8 grow">
          {details.matching && details.matching.rate_requirements > 0 ? (
            <BasicEvaluationInfo
              text={dictionary.project.evaluate}
              workId={params.id}
              verified={details.matching != null}
              defaultValues={details.matching}
              result={true}
            />
          ) : (
            <NonAdminContributionForm
              text={dictionary.project.evaluate}
              workId={params.id}
              verified={details.matching != null}
              defaultValues={details.matching}
              result={true}
              sameRole={details.evaluator.role === details.role}
            />
          )}

          {details.answers.length > 0 && (
            <SurveyForm
              workId={params.id}
              responseId={details.id}
              survey={surveyData}
              defaultValues={details.answers}
              result={true}
              lang={dictionary}
              selectedLanguage={params.lang}
            />
          )}

          <EvaluateTeamForm
            workId={params.id}
            surveyId={details.id}
            defaultValues={details.assessment}
            result={true}
            lang={dictionary}
          />
          <FinalFeedbackOverview data={details.swot} lang={dictionary} />

          <Card>
            <header className="flex flex-col gap-4 mb-10">
              <h1 className="text-center text-subhead_s">
                {dictionary.project.evaluate.exactly}
              </h1>
              <h5 className="text-center text-label_m text-text-secondary">
                {dictionary.project.evaluate.exactly_desc}
              </h5>
            </header>
            <div className="inline-flex justify-between gap-2">
              <Link
                href={`/work/${params.id}/swot`}
                passHref
                className="w-full max-w-[212px]"
              >
                <Button size="lg" variant={"secondary"}>
                  {dictionary.project.evaluate.edit_assessment}
                </Button>
              </Link>
              <Link
                href={`/project/${details.projectWork?.projectMember?.project.id}`}
                passHref
                className="w-full max-w-[212px]"
              >
                <Button size="lg" variant={"primary"}>
                  {dictionary.project.evaluate.go_to_project}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
