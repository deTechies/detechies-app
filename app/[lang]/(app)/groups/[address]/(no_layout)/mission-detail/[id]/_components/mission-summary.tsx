"use client";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { beginEndDates } from "@/lib/utils";

export default function MissionSummary({}: {}) {
  const [showFull, setShowFull] = useState(false);

  const details = {
    name: "시니어 미션",
    description: `The problem Careerzen solves
    Problem
    There is 2 problems in job market such as Linkedin. The first problem is career information such as resume, experience and job description. Many recruiter have said they have had experiences cancelling recruit after onboarding because many job seekers exaggerate their experience on their resume. Companies have waste much cost and time in the process that recruit and onboard workers who aren't a good fit for them.
    Secondly, junior job seekers don't have enough career that has been authenticated from an external objectively.they always try to get experiences related on their job like bootcamp, but as a company, this is not enough. Because It cannot improve skill level of juniors. They need reference such as project performance certifications or referrals.
    Solution
    Users can own career NFTs in there account and show profile image combining metadata about certificated career to other users who are company, headhunter and other buliders etc.
    User can network anonimously and with career authenticated. If other users like company request to v`,
    begin_date: "2023-12-22T11:20:32.691Z",
    end_date: "2024-01-22T11:20:32.691Z",
  };

  return (
    <Card className="w-full gap-8 px-8 pt-8 pb-5">
      <header className="flex items-end gap-9 ">
        <Image
          src="/images/mission.png"
          width={100}
          height={100}
          className="rounded-[6px] bg-accent-secondary max-h-[100px]"
          alt="mission"
        />
        <div className="flex flex-col justify-end gap-2">
          <h1 className="text-heading_s">{details.name}</h1>

          <div className="text-label_l text-text-secondary">
            {beginEndDates(details.begin_date, details.end_date)}
          </div>
        </div>
      </header>

      <div className="flex flex-col w-full gap-5">
        <div className={`overflow-hidden ${showFull ? "" : "max-h-[100px]"}`}>
          <div
            className="text-body_m"
            dangerouslySetInnerHTML={{ __html: details.description }}
          ></div>
        </div>

        {details.description.length > 200 && (
          <button
            onClick={() => {
              setShowFull(!showFull);
            }}
            className="flex items-center gap-2 mx-auto text-label_m text-text-secondary w-fit"
          >
            {showFull ? "hide" : "show_more"}
            {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
          </button>
        )}
      </div>
    </Card>
  );
}
