"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

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

  const onClickCard = () => {
    // router.push(`/groups/${address}/mission/12`);
    // router.push(`/en/groups/${address}/missions/${info.seq}`);
    router.push(`/groups/${address}/mission/manage/${info.id}`);
  }

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
      className="gap-1 p-0 border rounded-md overflow-hidden cursor-pointer border-border-div bg-bacound-layer-1 hover:shadow-lg max-w-[288px]"
      onClick={onClickCard}
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
        <h5 className="text-title_l">{info.name}</h5>
        <div className="text-label_l">{getDaysUntilEnd(info.end_date)}</div>
        {content}
      </div>
    </Card>
  );
}
