import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs2";
import ManageMember from "./manage-member";
import { getClub } from "@/lib/data/groups";

export default async function GroupDetailManageLayout({
  params,
}: {
  params: { address: string };
}) {
  const data = await getClub(params.address);

  return (
    <div>
      {/* 공통 탭 UI */}
      <Tabs defaultValue="members">
        <TabsList className="mb-4">
          <TabsTrigger value="members">멤버</TabsTrigger>
          <TabsTrigger value="missions">미션</TabsTrigger>
          <TabsTrigger value="nft">NFT</TabsTrigger>
          <TabsTrigger value="info">그룹 정보</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <ManageMember
            address={params.address}
          ></ManageMember>
        </TabsContent>
        
        <TabsContent value="missions">missions</TabsContent>
        <TabsContent value="nft">nft</TabsContent>
        <TabsContent value="info">info</TabsContent>
      </Tabs>
      {/* 현재 탭에 해당하는 컴포넌트 */}
    </div>
  );
}
