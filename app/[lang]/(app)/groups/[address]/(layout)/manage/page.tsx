import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClub } from "@/lib/data/groups";
import ManageMember from "./manage-member";
import ManageMission from "./manage-mission";
import ManageNft from "./manage-nft";
import ManageContracts from "./onchain-group";

export default async function GroupDetailManageLayout({
  params,
  searchParams,
}: {
  params: { address: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getClub(params.address);

  return (
    <div>
      {/* 공통 탭 UI */}
      <Tabs defaultValue="nft">
        <TabsList className="mb-4" variant="button1">
          <TabsTrigger value="nft" variant="button1">
            NFT
          </TabsTrigger>
          <TabsTrigger value="members" variant="button1">
            멤버
          </TabsTrigger>
          <TabsTrigger value="missions" variant="button1">
            미션
          </TabsTrigger>
          <TabsTrigger value="info" variant="button1">
            그룹 정보
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <ManageMember
            details={data}
            searchParams={searchParams}
          ></ManageMember>
        </TabsContent>

        <TabsContent value="nft">
          <ManageNft details={data}
          ></ManageNft>
        </TabsContent>

        <TabsContent value="missions">
          <ManageMission
            details={data}
            address={params.address}
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
