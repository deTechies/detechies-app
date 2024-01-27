"use client";

import { useState } from "react";
import UserProjects from "./user-projects";
import UserStatistics from "./user-statistics";
import { ChevronDown } from "lucide-react";
import { Project } from "@/lib/interfaces";
export default function UserReports({
  projects,
  survey,
  lang,
}: {
  projects: Project[];
  survey: any;
  lang: any;
}) {
  const [selectProject, setSelectProject] = useState<Project | null>(null);

  const workIds = new Set(survey.map((item: any) => item.projectWork.workId));
  const evaluated_projects = projects.filter((item: any) => {
    return workIds.has(item.works[0]?.workId);
  });

  return (
    <div>
      {/* {selectProject} */}

      <UserProjects
        projects={evaluated_projects}
        lang={lang}
        selectProject={selectProject}
        setSelectProject={setSelectProject}
      />

      <h3 className="mt-[60px] mb-4 text-heading_s text-center">
        통합 평판 보고서
      </h3>

      <div className="mb-5 text-center text-title_m text-text-secondary">
        총 받은 평가 ({12})
      </div>

      <ChevronDown className="mb-[60px] w-5 h-5 mx-auto"></ChevronDown>

      <UserStatistics projects={projects} lang={lang}></UserStatistics>
    </div>
  );
}
