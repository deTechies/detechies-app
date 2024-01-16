"use client";
import { Card } from "@/components/ui/card";
import { MissionDetails } from "@/lib/interfaces";
import { beginEndDates } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { useState } from "react";

export default function MissionSummary({
  details,
  lang,
}: {
  details: MissionDetails;
  lang: any;
}) {
  const [showFull, setShowFull] = useState(false);

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

      {details.description && (
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
      )}
    </Card>
  );
}
