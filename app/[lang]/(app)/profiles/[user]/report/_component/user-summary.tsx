"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function UserSummary({
  profile,
  lang,
  survey,
}: {
  profile: any;
  lang: any;
  survey: any;
}) {
  const [showMore, setShowMore] = useState(false);

  const onShowMore = () => {
    setShowMore(!showMore);
  };

  const calculateAverages = () => {
    let totalWeeklyHours = 0;
    let totalHourlyRate = 0;
    let count = 0;

    survey.forEach((item: any) => {
      item.surveyResponses.forEach((response: any) => {
        if (response.matching) {
          if (
            response.matching.weekly_hours && response.matching.hourly_rate &&
            !isNaN(response.matching.weekly_hours) && !isNaN(response.matching.hourly_rate)
          ) {
            totalWeeklyHours += Number(response.matching.weekly_hours);
            totalHourlyRate += Number(response.matching.hourly_rate);
            count++;
          }
        }
      });
    });

    const averageWeeklyHours = totalWeeklyHours / count;
    const averageHourlyRate = totalHourlyRate / count;

    return { averageWeeklyHours, averageHourlyRate };
  };

  return (
    <div>
      <Card className="flex flex-row flex-wrap items-start px-6 pt-6 pb-7">
        <div className="relative w-[7.5rem] aspect-square shrink-0 rounded-sm bg-background-layer-2">
          <IPFSImageLayer
            hashes={profile.avatar ? profile.avatar : defaultAvatar}
          />
        </div>

        <div className="grow">
          <div className="mb-1 text-subhead_s">{profile.display_name}</div>

          <div className="mb-1 text-title_m">
            {
              lang.interface.profession_type[
                profile.profile_details?.profession
              ]
            }
          </div>

          <div className="text-body_s mb-2.5 flex flex-wrap gap-2">
            <span>{lang.profile.summary.billing}</span>
            <span className="text-title_s">
              {calculateAverages().averageHourlyRate.toLocaleString()}
              {lang.profile.summary.billing_unit} |{" "}
            </span>
            <span>{lang.profile.summary.hours}</span>
            <span className="text-title_s">
              {calculateAverages().averageWeeklyHours.toLocaleString()}{" "}
              {lang.profile.summary.hours_unit}
            </span>
          </div>

          <div className="flex flex-wrap items-end gap-2">
            {profile.profile_details &&
              profile.profile_details.skills.length > 0 &&
              profile.profile_details.skills.map((_skill: string) => {
                return (
                  <Badge variant="accent" shape="outline" key={_skill}>
                    {_skill}
                  </Badge>
                );
              })}

            <div
              className="flex gap-1 ml-auto cursor-pointer text-label_m text-text-secondary"
              onClick={onShowMore}
            >
              {lang.profile.summary.introduction}
              <ChevronUp
                className={`w-5 h-5 transition ${showMore && "rotate-180"}`}
              ></ChevronUp>
            </div>
          </div>

          {showMore && (
            <div className={`pt-4 transition-all`}>
              <div className="p-5 break-words border rounded-md border-border-div">
                {profile.profile_details.description}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
