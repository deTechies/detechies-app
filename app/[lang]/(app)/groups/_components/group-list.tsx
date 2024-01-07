"use client"
import { useSearchParams } from "next/navigation";
import GroupListItem from "./group-list-item";
import OnlySearch from "@/components/extra/only-search";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

//TODO: Add type dependency
export default function GroupList({
  groups,
  profileWallet,
}: {
  groups: any[];
  profileWallet: string;
}) {
  //const { search: searchValue } = searchParams as { [key: string]: string };

  //const resultsText = products.length > 1 ? 'results' : 'result';

  const filterJoinedGroups = groups.filter((group) =>
    group.members.some((_member: any) => _member.user.wallet === profileWallet)
  );

  const filterCreatedGroups = groups.filter((group) => group.owner === profileWallet);

  return (
    <Tabs defaultValue="all">
      <TabsList className="justify-center" variant="button1">
        <TabsTrigger value="all" variant="button2">
          all
        </TabsTrigger>

        <TabsTrigger value="joined" variant="button2">
          joined
        </TabsTrigger>

        <TabsTrigger value="created" variant="button2">
          created
        </TabsTrigger>
      </TabsList>

      <div className="w-full my-10 max-w-[27rem] mx-auto">
        <OnlySearch placeholder="Search for groups" />
      </div>

      <TabsContent value="all" className="mx-0 mt-0 mb-16">
        <div className="grid items-stretch w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...groups].reverse().map((group: any, key: number) => {
            return <GroupListItem key={key} details={group} />;
          })}
        </div>
      </TabsContent>

      <TabsContent value="joined" className="mx-0 mt-0 mb-16">
        <div className="grid items-stretch w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...filterJoinedGroups].reverse().map((group: any, key: number) => {
            return <GroupListItem key={key} details={group} />;
          })}
        </div>
      </TabsContent>

      <TabsContent value="created" className="mx-0 mt-0 mb-16">
        <div className="grid items-stretch w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...filterCreatedGroups].reverse().map((group: any, key: number) => {
            return <GroupListItem key={key} details={group} />;
          })}
        </div>
      </TabsContent>

      <Link
        href="/groups/create"
        className="px-10 py-10 max-w-[1028px] h-[217px] flex mx-auto bg-[url('/images/banner-create-group.png')]"
      >
        <div>
          <div className="mb-1 text-subhead_m text-accent-primary">
            직접 그룹을 만들고
          </div>

          <div className="mb-5 text-subhead_m">
            프로젝트와 개인에게 NFT를 부여하고
            <br />
            영향력 있는 그룹으로 활동해보세요!
          </div>

          <div className="flex items-center gap-1 text-title_m">
            그룹 만들러 가기
            <ArrowRight className="w-4 h-4"></ArrowRight>
          </div>
        </div>
      </Link>
    </Tabs>
  );
}
