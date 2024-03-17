import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import GroupSettings from "./_components/group-settings";
import ManageMember from "./manage-member";
import ManageMission from "./manage-mission";
import ManageNft from "./manage-nft";
import ManageContracts from "./onchain-group";

export default async function GroupDetailManageLayout({
  params,
  searchParams,
}: {
  params: { address: string; lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {data:club} = await serverApi(`/clubs/${params.address}`);
  const {data:missions} = await serverApi(`/mission/campaign/${club.id}`);
  const dictionary = (await getDictionary(params.lang)) as any;

  const tabs = ["nft", "members", "missions", "info"];
  const searchParamsTab = searchParams.tab as string;
  const paramsTab = tabs.includes(searchParamsTab) ? searchParamsTab : "nft";

  return (
    <div>
      {/* 공통 탭 UI */}
      <Tabs defaultValue={paramsTab}>
        <TabsList className="mb-4" variant="button1">
          <TabsTrigger value="nft" variant="button1">
            NFT
          </TabsTrigger>
          <TabsTrigger value="members" variant="button1">
            {dictionary.group.details.manage.tab.member}
          </TabsTrigger>
          <TabsTrigger value="missions" variant="button1">
            {dictionary.group.details.manage.tab.mission}
          </TabsTrigger>
          <TabsTrigger value="settings" variant="button1">
            {dictionary.group.details.manage.tab.info}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <ManageMember
            details={club}
            searchParams={searchParams}
            lang={dictionary}
            />
        </TabsContent>

        <TabsContent value="nft">
          <ManageNft
            details={club}
            lang={dictionary}
            />
        </TabsContent>

        <TabsContent value="missions">
          <ManageMission
            details={club}
            missions={missions}
            lang={dictionary}
         />
        </TabsContent>

        <TabsContent value="settings">
          <GroupSettings />
        </TabsContent>
        
        <TabsContent value="blockchain">
          <ManageContracts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
