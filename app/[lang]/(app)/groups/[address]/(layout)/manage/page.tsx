import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs2";
import ManageMember from "./manage-member";
import ManageNft from "./manage-nft";
import ManageMission from "./manage-mission";
import { getClub } from "@/lib/data/groups";

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
        <TabsList className="mb-4">
          <TabsTrigger value="nft">NFT</TabsTrigger>
          <TabsTrigger value="members">멤버</TabsTrigger>
          <TabsTrigger value="missions">미션</TabsTrigger>
          <TabsTrigger value="info">그룹 정보</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <ManageMember
            details={data}
            searchParams={searchParams}
          ></ManageMember>
        </TabsContent>
        
        <TabsContent value="nft">
          <ManageNft
            details={data}
          ></ManageNft>
        </TabsContent>

        <TabsContent value="missions">
          <ManageMission
            details={data}
            address={params.address}
          ></ManageMission>
        </TabsContent>
        <TabsContent value="info">info</TabsContent>
      </Tabs>
      {/* 현재 탭에 해당하는 컴포넌트 */}
    </div>
  );
}
