import MemberCard from "@/components/card/member-card";
import NftListItemLoading from "@/components/card/nft-list-item-loading";
import PendingProfileCard from "@/components/card/pending-profile-card";

import AddMemberModal from "@/components/extra/add-member";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAddress } from 'viem';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetchData from "@/lib/useFetchData";

interface Profile {
  id: string;
  name: string;
  role: string;
  email: string;
  username: string;
  avatar: string;
  organisation: string;
  image: string;
  industry: string;
}

export interface Member{
  address: string;
  tokenboundAccount: string;
}
export default function GroupMember({
  address,
  owners,
}: {
  address: any;
  owners: Member[];
}) {
  const { data, loading, error } = useFetchData<Profile[] | null>(
    `/company/members/${address}`
  );
  
 getAddress
  const {
    data: pendingData,
    loading: pendingLoading,
    error: pendingError,
  } = useFetchData<Profile[]>(
    `/polybase/company/request?address=${address}&status=open`
  );

  return (
    <Card className="overflow-auto max-w-[90vw]">
      <CardHeader className="flex items-center justify-between">
        <h3>Members ({data?.length})</h3>
        <AddMemberModal />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Tabs defaultValue="active" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          {loading && (
          <>
            <NftListItemLoading />
            <NftListItemLoading />
            <NftListItemLoading />
            <NftListItemLoading />
          </>
        )}
          <TabsContent value="active">
            {owners &&
              owners.map((item: Member, index: any) => (
                item.tokenboundAccount &&
                <MemberCard address={getAddress(item.tokenboundAccount)} key={index} />
              ))}
          </TabsContent>
          <TabsContent value="pending" className="flex gap-4">
            {pendingData &&
              pendingData.map((item: any, index: number) => (
                <PendingProfileCard
                  profile={item}
                  key={index}
                  contract={address}
                />
              ))}
          </TabsContent>
        </Tabs>
      
      </CardContent>
    </Card>
  );
}
