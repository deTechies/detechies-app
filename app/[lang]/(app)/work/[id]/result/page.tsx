import { Card } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";
import ProjectMemberInline from "../../../project/_components/project-member-inline";
import ProjectSwitcher from "../../../project/_components/project-switcher";
import ProjectMemberWorkDetails from "../_components/details-work";
import AssessmentOverview from "./_components/assessment-overview";
import CategoryOverview from "./_components/category-overview";
import MatchingCard from "./_components/matching-card";
import SwotAnalysis from "./_components/swot-analysis";

export default async function EvaluationResult({
  params,
}: {
  params: { lang: Locale; id: string };
}) {
  const details = await getProjectWork(params.id);
  const dictionary = await getDictionary(params.lang);

  if (!details.projectWork) {
    return <pre>{JSON.stringify(details, null, 4)}</pre>;
  }

  return (
    <main className="flex gap-4">
      {/* LEFT SIDE  */}
      <section className="w-[360px] flex flex-col gap-8 shrink-0">
        <ProjectSwitcher project={details.evaluator?.project} />
        <ProjectMemberInline
          projectMember={details.projectWork.projectMember}
          projectWork={details.projectWork}
        />
        <ProjectMemberWorkDetails
          projectMember={details.projectMember}
          projectWork={details.projectWork}
        />
      </section>

      {/* RIGHT SIDE */}
      <section className="flex grow shrink">
        <div className="space-y-8 grow">
          <MatchingCard data={details.matching} />
          <CategoryOverview responses={details.answers} />
          <Card>
            <AssessmentOverview selectedRanks={details.assessment} />
          </Card>
          <SwotAnalysis data={details.swot} />
        </div>
      </section>
    </main>
  );
}
