"use client";

import { useState } from "react";
import UserProjects from "./user-projects";
import UserStatistics from "./user-statistics";
import { ChevronDown } from "lucide-react";
export default function UserReports({
  profile,
  lang,
}: {
  profile: any;
  lang: any;
}) {
  const [selectProject, setSelectProject] = useState<any>(null);

  return (
    <div>
      {/* {selectProject} */}

      <UserProjects
        profile={profile}
        lang={lang}
        selectProject={selectProject}
        setSelectProject={setSelectProject}
      />

      <h3 className="mt-[60px] mb-4 text-heading_s text-center">통합 평판 보고서</h3>

      <div className="mb-5 text-center text-title_m text-text-secondary">
        총 받은 평가 ({12})
      </div>

      <ChevronDown className="mb-[60px] w-5 h-5 mx-auto"></ChevronDown>

      <UserStatistics profile={profile} lang={lang}></UserStatistics>
    </div>
  );
}
