"use client";
import MemberCard from "@/components/card/member-card";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAddress } from "viem";

import useFetchData from "@/lib/useFetchData";
import { Link } from "lucide-react";
import { usePathname } from "next/navigation";

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

export interface Member {
  address: string;
  tokenboundAccount: string;
}
export default function GroupMember({
  address,
  owners,
  isCreator,
  
}: {
  address: any;
  owners: Member[];
  isCreator?: boolean;
}) {
  const { data, loading, error } = useFetchData<Profile[] | null>(
    `/company/members/${address}`
  );
  
  const pathName= usePathname();

  getAddress;
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
        {
          isCreator && <Link href={pathName + '/members'}>Manage</Link>
        }
      </CardHeader>

      <CardContent className="w-full grid md:grid-cols-6 gap-4">
        {owners &&
          owners.map(
            (item: Member, index: any) =>
              item.tokenboundAccount && (
                <MemberCard address={getAddress(item.address)} key={index} />
              )
          )}
      </CardContent>
    </Card>
  );
}
