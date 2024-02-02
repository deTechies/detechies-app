"use client";

<<<<<<< Updated upstream
import { useEffect, useState } from "react";
=======
<<<<<<< Updated upstream
import { useState } from "react";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  totalResult,
  userReport,
=======
=======
import { serverApi } from "@/lib/data/general";
import {
  PROFESSION_TYPE
} from "@/lib/interfaces";
import { ChevronDown } from "lucide-react";
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

export default async function UserReports({
  lang,
  selectedProject,
  totalResults,
  projects,
  userReport,
>>>>>>> Stashed changes
>>>>>>> Stashed changes
}: {
  lang: any;
<<<<<<< Updated upstream
  totalResult: any;
  userReport: any;
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        {lang.profile.statistics.total_evaluation} ({contributionNumber})
=======
        총 받은 평가 ({12})
=======
  selectedProject: any;
  totalResults: any;
  projects: any;
  userReport: any;
}) {
  //based on the select project we going to eval
  
  const  selectedReport  = await serverApi(
    `/survey-report/getUserReport?projectId=${selectedProject}&address=0xfFf09621F09CAa2C939386b688e62e5BE19D2D56`
    //
  );
  
  console.log(selectedReport);

  //we can make this now a async function, since we don't pass in anything 

  return (
    <div>
      <pre>
        {JSON.stringify(selectedReport, null, 2)}
      </pre>
     
   
      <h3 className="mt-[60px] mb-4 text-heading_s text-center">
        {selectedProject
          ? "FIX NAME"
          : lang.profile.statistics.total}
        {selectedProject && <br />}
        {lang.profile.statistics.reputation_report}
      </h3>

      <div className="mb-5 text-center text-title_m text-text-secondary">
        {lang.profile.statistics.total_evaluation} (0)
>>>>>>> Stashed changes
>>>>>>> Stashed changes
      </div>

      <ChevronDown className="mb-[60px] w-5 h-5 mx-auto"></ChevronDown>

<<<<<<< Updated upstream
      <UserStatistics
        lang={lang}
        statistics={
          totalResult
        }
      />
=======
<<<<<<< Updated upstream
      <UserStatistics profile={profile} lang={lang}></UserStatistics>
=======
      <UserStatistics
        lang={lang}
        statistics={
          totalResults
        }
      />
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    </div>
  );
}
