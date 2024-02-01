"use client";

import { useEffect, useState } from "react";
import UserProjects from "./user-projects";
import UserStatistics from "./user-statistics";
import { ChevronDown } from "lucide-react";
import {
  PROFESSION_TYPE,
  ProjectMember,
  SurveyResponse,
} from "@/lib/interfaces";

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

export default function UserReports({
  lang,
  totalResult,
  userReport,
}: {
  lang: any;
  totalResult: any;
  userReport: any;
}) {

  console.log(userReport);

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [contributionNumber, setContributionNumber] = useState(0);

  useEffect(() => {
    if (selectedProject) {
      const contributionNumber = selectedProject.contribution.length;
      setContributionNumber(contributionNumber);
    } else {
      const contributionNumber = userReport.projects.reduce(
        (acc: number, project: any) => {
          return acc + project.contribution.length;
        },
        0
      );
      setContributionNumber(contributionNumber);
    }

    // console.log(selectedProject);
  }, [selectedProject]);

  return (
    <div>
      <UserProjects
        projects={userReport.projects}
        lang={lang}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />

      <h3 className="mt-[60px] mb-4 text-heading_s text-center">
        {selectedProject
          ? selectedProject.project.name
          : lang.profile.statistics.total}
        {selectedProject && <br />}
        {lang.profile.statistics.reputation_report}
      </h3>

      <div className="mb-5 text-center text-title_m text-text-secondary">
        {lang.profile.statistics.total_evaluation} ({contributionNumber})
      </div>

      <ChevronDown className="mb-[60px] w-5 h-5 mx-auto"></ChevronDown>

      <UserStatistics
        lang={lang}
        statistics={
          totalResult
        }
      />
    </div>
  );
}
