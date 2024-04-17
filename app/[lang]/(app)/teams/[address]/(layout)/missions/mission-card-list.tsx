"use client";

import MissionCard from "@/components/card/mission-card";
import { Button } from "@/components/ui/button";
import { Club, MissionDetails } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function MissionList({
  address,
  missions,
  clubInfo,
  useTab = false,
  lang,
}: {
  address: string;
  missions: MissionDetails[];
  clubInfo?: Club;
  useTab: boolean;
  lang: any;
}) {
  const TAB_BUTTONS = {
    ALL: "all",
    MY_MISSION: "my_mission",
  };

  const [currentTab, setCurrentTab] = useState(TAB_BUTTONS.ALL);
  const [missionList, setMissionList] = useState<MissionDetails[]>([]);

  useEffect(() => {
    let filtered = missions;

    // if (currentTab === TAB_BUTTONS.MY_MISSION) {
    //   filtered = filtered.filter(
    //     (mission) => mission.joined
    //   );
    // }

    const sorted = filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setMissionList(sorted);
  }, [missions, currentTab]);

  return (
    <>
      {useTab && (
        <div className="flex flex-wrap justify-start gap-2 mb-5">
          {Object.values(TAB_BUTTONS).map((tab) => {
            if (
              tab === TAB_BUTTONS.MY_MISSION &&
              (clubInfo?.userRole === "none" || clubInfo?.userRole === "joined")
            ) {
              return;
            }

            return (
              <Button
                key={tab}
                size="sm"
                variant={currentTab === tab ? "secondary" : "ghost"}
                className="py-3"
                onClick={() => setCurrentTab(tab)}
              >
                {lang.group.details.missions[tab]}
              </Button>
            );
          })}
        </div>
      )}

      <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {missionList &&
          missionList.map((mission: MissionDetails, index: number) => (
            <MissionCard
              address={address.toString()}
              info={mission}
              key={index}
              lang={lang}
            />
          ))}
      </div>

      {missionList.length < 1 && (
        <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
          {lang.group.details.missions.no_mission}
        </div>
      )}
    </>
  );
}
