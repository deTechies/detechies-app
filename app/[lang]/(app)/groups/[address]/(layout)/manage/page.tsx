import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClub } from "@/lib/data/groups";
import ManageMember from "./manage-member";
import ManageMission from "./manage-mission";
import ManageNft from "./manage-nft";
import ManageContracts from "./onchain-group";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getClubMissions } from "@/lib/data/mission";

export default async function GroupDetailManageLayout({
  params,
  searchParams,
}: {
  params: { address: string; lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getClub(params.address);
  const missions = await getClubMissions(data.id);
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <div>
      {/* 공통 탭 UI */}
      <Tabs defaultValue="nft">
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
          <TabsTrigger value="info" variant="button1">
            {dictionary.group.details.manage.tab.info}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <ManageMember
            details={data}
            searchParams={searchParams}
            lang={dictionary}
          ></ManageMember>
        </TabsContent>

        <TabsContent value="nft">
          <ManageNft
            details={data}
            lang={dictionary}
          ></ManageNft>
        </TabsContent>

        <TabsContent value="missions">
          <ManageMission
            details={data}
            missions={missions}
            lang={dictionary}
          ></ManageMission>
        </TabsContent>

        <TabsContent value="info">info</TabsContent>
        
        <TabsContent value="blockchain">
          <ManageContracts />
        </TabsContent>
      </Tabs>
      {/* 현재 탭에 해당하는 컴포넌트 */}
    </div>
  );
}
