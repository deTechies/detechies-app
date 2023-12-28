"use client";
import { useRouter } from "next/navigation";
import { Address } from "wagmi";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import Image from "next/image";
import React from "react";

export default function MemberCard({
  address,
  info,
  children,
}: {
  address: string;
  info?: any;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  const getDaysUntilEnd = (dateEndString: string): string => {
    const today = new Date();
    const endDate = new Date(dateEndString);
    const timeDiff = endDate.getTime() - today.getTime();

    const daysUntilEnd = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysUntilEnd > 0) {
      return `미션 종료 ${daysUntilEnd}일 전`;
    } else if (daysUntilEnd === 0) {
      return "미션 종료일";
    } else {
      return "미션 종료";
    }
  };

  const content = children || (
    <div>
      {info.chips.length <= 3 ? (
        <div className="flex flex-wrap gap-2 text-title_m">
          {info.chips.map((chip: string, index: number) => {
            return (
              <Badge variant={"info"} className="rounded-[5px]" key={index}>
                {chip}
              </Badge>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 text-title_m">
          {info.chips.slice(0, 2).map((chip: string, index: number) => {
            return (
              <Badge variant={"info"} className="rounded-[5px]" key={index}>
                {chip}
              </Badge>
            );
          })}

          <Badge className="rounded-[5px]">+{info.chips.length - 2}</Badge>
        </div>
      )}
    </div>
  );

  if (!info) return <div>no data</div>;

  return (
    <Card
      className="gap-1 p-0 border rounded-md overflow-hidden cursor-pointer border-border-div bg-background-layer-1 hover:shadow-lg max-w-[288px]"
      onClick={() => {}}
    >
      <div className="relative m-0 rounded-t-sm bg-accent-secondary">
        <Image
          src="/images/mission.png"
          alt="mission"
          className="object-cover"
          width={288}
          height={234}
        ></Image>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h5 className="text-title_l">{info.title}</h5>
        <div className="text-label_l">{getDaysUntilEnd(info.end_date)}</div>
        {content}
      </div>
    </Card>
  );
}