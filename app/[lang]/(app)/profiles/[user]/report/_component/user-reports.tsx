import { serverApi } from "@/lib/data/general";
import { PROFESSION_TYPE } from "@/lib/interfaces";
import { ChevronDown } from "lucide-react";
import { Suspense } from "react";
import UserStatistics from "./user-statistics";

export default async function UserReports({
  lang,
  address,
  selectedLang,
  project,
}: {
  lang: any;
  address: string;
  selectedLang: any;
  project: string;
}) {
  const report = await serverApi(
    `/survey-report/getUserReport?address=${address}&projectId=${project}`
  );

  if (!report.data.surveyReports || !report.data.assessments) {
    return (
      <div className="py-20 text-center text-state-error">
        {" "}
        No Evaludated Report
      </div>
    );
  }

  const totalRecommendationsSum = Object.values(
    report.data.swotReports.recommendScoresByRole
  ).reduce((sum: number, current: any) => {
    return sum + current.totalRecommendations;
  }, 0);

  return (
    <div>
      <h3 className="mt-[60px] mb-4 text-heading_s text-center">
        {report.data.project && report.data.project[0]?.name
          ? report.data.project[0]?.name
          : lang.profile.statistics.total}
        {report.data.project && report.data.project[0]?.name && <br />}
        {lang.profile.statistics.reputation_report}
      </h3>

      <div className="mb-5 text-center text-title_m text-text-secondary">
        {lang.profile.statistics.total_evaluation} (
        {totalRecommendationsSum || 0})
      </div>

      <ChevronDown className="mb-[60px] w-5 h-5 mx-auto"></ChevronDown>

      <Suspense fallback={<div>Loading reports.....</div>}>
        {report?.data && report.data ? (
          <UserStatistics
            lang={lang}
            statistics={report.data}
            selectedLang={selectedLang}
          />
        ) : (
          <div className="text-center text-body_m">No Results found</div>
        )}
      </Suspense>

      {/* <pre className="max-h-[500px] overflow-auto">{JSON.stringify(report, null, 2)}</pre> */}
    </div>
  );
}
