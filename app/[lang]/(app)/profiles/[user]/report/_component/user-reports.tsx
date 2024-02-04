import { serverApi } from "@/lib/data/general";
import { PROFESSION_TYPE } from "@/lib/interfaces";
import { ChevronDown } from "lucide-react";
import { Suspense } from "react";
import UserStatistics from "./user-statistics";

interface ReportContribution {
  description: string;
  end_date: string | null;
  role: PROFESSION_TYPE;
  start_date: Date;
  surveyResults: any[];
  tags: string[];
}
interface ReportProject {
  begin_date: string;
  end_date: string | null;
  description: string;
  name: string;
  recommendScoresByRole: { [key: string]: number };
}

interface ReportContribution {
  description: string;
  end_date: string | null;
  role: PROFESSION_TYPE;
  start_date: Date;
  surveyResults: any[];
  tags: string[];
}
interface ReportProject {
  begin_date: string;
  end_date: string | null;
  description: string;
  name: string;
  recommendScoresByRole: { [key: string]: number };
}

export default async function UserReports({
  lang,
  address,
  selectedLang,
  selectedProject,
}: {
  lang: any;
  address: string;
  selectedLang: any;
  selectedProject: any;
}) {
  const report = await serverApi(
    `/survey-report/getUserReport?address=${address}&projectId=${selectedProject}`
  );

  return (
    <div>
      <h3 className="mt-[60px] mb-4 text-heading_s text-center">
        {selectedProject ? "FIXME" : lang.profile.statistics.total}
        {selectedProject && <br />}
        {lang.profile.statistics.reputation_report}
      </h3>

      <div className="mb-5 text-center text-title_m text-text-secondary">
        {lang.profile.statistics.total_evaluation} (0 fix me)
      </div>

      <ChevronDown className="mb-[60px] w-5 h-5 mx-auto"></ChevronDown>

      <Suspense fallback={<div>Loading reports.....</div>}>
        {report?.data && report.data ? (
          <UserStatistics lang={lang} statistics={report.data} selectedLang={selectedLang} />
        ) : (
          <div className="text-center text-body_m">No Results found</div>
        )}
      </Suspense>

      {/* <pre className="max-h-[500px] overflow-auto">{JSON.stringify(report, null, 2)}</pre> */}
    </div>
  );
}
