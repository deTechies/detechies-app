"use client";

import { useEffect, useState } from "react";
import UserProjects from "./user-projects";
import UserStatistics from "./user-statistics";
import { ChevronDown } from "lucide-react";
import { ProjectMember, SurveyResponse } from "@/lib/interfaces";

export default function UserReports({
  projects,
  survey,
  lang,
  totalResult,
}: {
  projects: ProjectMember[];
  survey: any;
  lang: any;
  totalResult: any;
}) {

  const [selectedProject, setSelectedProject] = useState<ProjectMember | null>(
    null
  );
  const [selectedProjectSurvey, setSelectedProjectSurvey] = useState<
    any | undefined
  >(null);
  const workIds = new Set(survey.map((item: any) => item.projectWork.workId));
  const evaluated_projects = projects.filter((item: any) => {
    return workIds.has(item.works[0]?.workId);
  });

  useEffect(() => {
    const selected =
      survey &&
      survey.find((item: any) => {
        return item.projectWork.workId === selectedProject?.works[0].workId;
      });

    if (selected) {
      setSelectedProjectSurvey([selected]);
    } else {
      setSelectedProjectSurvey(survey);
    }
  }, [selectedProject]);

  
  useEffect(() => {
    // console.log(totalResult);
    // console.log(selectedProjectSurvey);
  }, [selectedProjectSurvey]);

  return (
    <div>
      <UserProjects
        projects={evaluated_projects}
        lang={lang}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />

      <h3 className="mt-[60px] mb-4 text-heading_s text-center">
        {selectedProject ? selectedProject.project.name : "통합 "}
        {selectedProject && <br />}
        평판 보고서
      </h3>

      <div className="mb-5 text-center text-title_m text-text-secondary">
        총 받은 평가 ({12})
      </div>

      <ChevronDown className="mb-[60px] w-5 h-5 mx-auto"></ChevronDown>

      <UserStatistics
        projects={projects}
        lang={lang}
        statistics={totalResult}
      ></UserStatistics>
    </div>
  );
}

