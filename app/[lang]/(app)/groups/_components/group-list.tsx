"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Club } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";
import Search from "@/components/extra/search";
import GroupListItem from "./group-list-item";
import { ArrowRight } from "lucide-react";

export default function GroupList({
  groups,
  lang,
}: {
  groups: Club[];
  lang: any;
}) {
  const { data: user } = useSession();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const TAB_BUTTONS = {
    ALL: "all",
    JOINED: "joined",
    CREATED: "created",
  };

  const [currentTab, setCurrentTab] = useState(TAB_BUTTONS.ALL);
  const [groupList, setGroupList] = useState<Club[]>([]);

  useEffect(() => {
    let filtered = groups.filter((group) =>
      group.name.toLowerCase().includes(search?.toLowerCase() || "")
    );

    if (currentTab === TAB_BUTTONS.JOINED) {
      filtered = filtered.filter((group) => group.isUserMember);
    } else if (currentTab === TAB_BUTTONS.CREATED) {
      filtered = filtered.filter(
        (group) => group.owner === user?.web3?.address
      );
    }

    const sorted = filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setGroupList(sorted);
  }, [groups, search, currentTab, user?.web3?.address]);

  const onClickViewMore = () => {
    console.log("MORE VIEW!");
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {Object.values(TAB_BUTTONS).map((tab) => (
          <Button
            key={tab}
            size="sm"
            variant={currentTab === tab ? "default" : "inactive"}
            className="py-3"
            onClick={() => setCurrentTab(tab)}
          >
            {lang.group.list[tab]}
          </Button>
        ))}
      </div>

      <div className="w-full my-10 max-w-[27rem] mx-auto">
        <Search
          placeholder={lang.group.list.search_placeholder}
          className="bg-background-layer-1"
        />
      </div>

      <div className="grid items-stretch w-full gap-5 mb-10 md:grid-cols-2 lg:grid-cols-3">
        {groupList.reverse().map((group: any) => (
          <GroupListItem
            key={group.id}
            details={group}
            lang={lang}
            isPending={!group.verified}
          />
        ))}
      </div>

      {/* <div className="mb-10"></div> */}

      {/* 
      To be added later

      <div className="mb-7" onClick={onClickViewMore}>
        <Button variant="secondary" size="lg" className="max-w-full"> 
          {lang.group.list.view_more}
        </Button>
      </div> */}

      <Link
        href="groups/create"
        className="px-10 py-10 max-w-[1028px] min-h-[217px] rounded-md bg-no-repeat bg-contain flex mx-auto bg-[url('/images/banner-create-group.png')]"
      >
        <div className="max-w-[430px]">
          <div className="mb-1 text-subhead_m text-accent-primary">
            {lang.group.list.banner}
          </div>

          <div className="mb-5 text-subhead_m text-text-fixed">
            {lang.group.list.banner2}
          </div>

          <div className="flex items-center gap-1 text-title_m text-text-fixed">
            {lang.group.list.banner3}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  );
}
