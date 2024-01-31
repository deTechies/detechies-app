"use client";
import Search from "@/components/extra/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Club } from "@/lib/interfaces";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GroupListItem from "./group-list-item";
import { Button } from "@/components/ui/button";

//TODO: Add type dependency
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

  const [filteredData, setFilteredData] = useState(groups);

  useEffect(() => {
    // 검색어에 따라 필터링된 그룹 목록을 설정합니다.
    const searchFilteredData = groups.filter(group => 
      group.name.toLowerCase().includes(search?.toLowerCase() || '')
    );

    // 정렬된 데이터를 설정합니다.
    const sortedData = searchFilteredData.sort((a, b) => {
      if ((a.members?.length ?? 0) - (b.members?.length ?? 0) === 0) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return (a.members?.length ?? 0) - (b.members?.length ?? 0);
    });

    setFilteredData(sortedData);
  }, [groups, search]);

  const [currentTab, setCurrentTab] = useState('all');
  const displayGroups = filteredData.filter(group => {
    if (currentTab === 'joined') return group.isUserMember;
    if (currentTab === 'created') return group.owner === user?.web3?.address;
    return true;
  });

  return (
    <div defaultValue="all">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setCurrentTab("all")}>
          {lang.group.list.all}
        </Button>

        <Button onClick={() => setCurrentTab("joined")}>
          {lang.group.list.joined}
        </Button>

        <Button onClick={() => setCurrentTab("created")}>
          {lang.group.list.created}
        </Button>
      </div>

      <div className="w-full my-10 max-w-[27rem] mx-auto">
        <Search
          placeholder={lang.group.list.search_placeholder}
          className="bg-background-layer-1"
        />
      </div>

      <div className="grid items-stretch w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
        {displayGroups.reverse().map((group: any) => (
          <GroupListItem key={group.id} details={group} lang={lang} />
        ))}
      </div>

      <Link
        href="groups/create"
        className="px-10 py-10 max-w-[1028px] min-h-[217px] flex mx-auto bg-[url('/images/banner-create-group.png')]"
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
            <ArrowRight className="w-4 h-4"></ArrowRight>
          </div>
        </div>
      </Link>
    </div>
  );
}
