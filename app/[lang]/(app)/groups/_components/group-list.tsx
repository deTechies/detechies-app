"use client";
import Search from "@/components/extra/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Club } from "@/lib/interfaces";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GroupListItem from "./group-list-item";

//TODO: Add type dependency
export default function GroupList({
  groups,
  lang,
}: {
  groups: Club[];
  lang: any;
}) {
  //const { search: searchValue } = searchParams as { [key: string]: string };

  const {data: user}= useSession();
  //const resultsText = products.length > 1 ? 'results' : 'result';

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const filteredData = groups.filter((group: any) => {
    return group.name
      .toLowerCase()
      .includes(search ? search.toLowerCase() : "");
  });

  const filterJoinedGroups = filteredData.filter((group) => group.isUserMember);
  const filterCreatedGroups = filteredData.filter(
    (group) => group.owner === user?.web3?.address
  );

  return (
    <Tabs defaultValue="all">
      <TabsList className="justify-center" variant="button1">
        <TabsTrigger value="all" variant="button2">
          {lang.group.list.all}
        </TabsTrigger>

        <TabsTrigger value="joined" variant="button2">
          {lang.group.list.joined}
        </TabsTrigger>

        <TabsTrigger value="created" variant="button2">
          {lang.group.list.created}
        </TabsTrigger>
      </TabsList>

      <div className="w-full my-10 max-w-[27rem] mx-auto">
        <Search placeholder={lang.group.list.search_placeholder} />
      </div>

      <TabsContent value="all" className="mx-0 mt-0 mb-16">
        <div className="grid items-stretch w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...filteredData].reverse().map((group: any, key: number) => {
            return <GroupListItem key={group.id} details={group} lang={lang} />;
          })}
        </div>
      </TabsContent>

      <TabsContent value="joined" className="mx-0 mt-0 mb-16">
      <div className="grid items-stretch w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...filterCreatedGroups].reverse().map((group: any, key: number) => {
            return <GroupListItem key={group.id} details={group} lang={lang} />;
          })}
        </div>
      </TabsContent>

      <TabsContent value="created" className="mx-0 mt-0 mb-16">
      <div className="grid items-stretch w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...filterJoinedGroups].reverse().map((group: any, key: number) => {
            return <GroupListItem key={group.id} details={group} lang={lang} />;
          })}
        </div>
      
      </TabsContent>

      <Link
        href="groups/create"
        className="px-10 py-10 max-w-[1028px] h-[217px] flex mx-auto bg-[url('/images/banner-create-group.png')]"
      >
        <div className="max-w-[430px]">
          <div className="mb-1 text-subhead_m text-accent-primary">
            {lang.group.list.banner}
          </div>

          <div className="mb-5 text-subhead_m">{lang.group.list.banner2}</div>

          <div className="flex items-center gap-1 text-title_m">
            {lang.group.list.banner3}
            <ArrowRight className="w-4 h-4"></ArrowRight>
          </div>
        </div>
      </Link>
    </Tabs>
  );
}
