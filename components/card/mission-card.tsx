"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { beginEndDates } from "@/lib/utils";
import AchievementChips from "../extra/achievement-chips";

export default function MemberCard({
  address,
  info,
  manage = false,
  children,
  dateFormat = "default",
  lang,
}: {
  address: string;
  manage?: boolean;
  info?: any;
  children?: React.ReactNode;
  dateFormat?: string;
  lang: any;
}) {
  const router = useRouter();
  const params = useParams();

  const onClickCard = (e: any) => {
    // router.push(`/groups/${address}/mission/12`);
    // router.push(`/en/groups/${address}/missions/${info.seq}`);

    if (manage) {
      router.push(
        `/${params.lang}/groups/${address}/mission/manage/${info.campaignId}`
      );
      return;
    }
    router.push(
      `/${params.lang}/groups/${address}/mission-detail/${info.campaignId}`
    );
  };

  const getDaysUntilEnd = (dateEndString: string): string => {
    const today = new Date();
    const endDate = new Date(dateEndString);
    const timeDiff = endDate.getTime() - today.getTime();

    const daysUntilEnd = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysUntilEnd > 0) {
      return `${lang.mission.card.end_date_1} ${daysUntilEnd} ${lang.mission.card.end_date_2}`;
    } else if (daysUntilEnd === 0) {
      return lang.mission.card.end;
    } else {
      return lang.mission.card.before_end;
    }
  };

  
  const content = children || (
    <AchievementChips
      achievements={info.achievements}
      limit={2}
      truncate={true}
    />
  );

  if (!info) return <div>no data</div>;

  return (
    <Card
      className="gap-1 p-0 overflow-hidden border rounded-md cursor-pointer border-border-div bg-bacound-layer-1 hover:shadow-lg"
      onClick={onClickCard}
    >
      <div className="relative w-full m-0">
        <Image
          src="/images/mission.png"
          alt="mission"
          className="object-cover"
          width="999"
          height="999"
        />
      </div>

      <div className="grow" />

      <div className="flex flex-col gap-3 p-5">
        <h5 className="text-title_l">{info.name}</h5>
        <div className="text-label_l text-text-secondary">
          {dateFormat == "beginEndDates"
            ? beginEndDates(info.begin_date, info.end_date)
            : getDaysUntilEnd(info.end_date)}
        </div>
        {content}
      </div>
    </Card>
  );
}
