import { Badge } from "@/components/ui/badge";
import GroupDetails from "../_components/group-details";
import GroupMember from "../_components/group-member";

import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import { formatDate, truncateMiddle } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export interface GroupDetailProps {
  name: string;
  achievements: any[];
  details: any;
  members: any[];
  chat: any;
  image: string;
  address: string;
  isCreator: boolean;
  isMember: boolean;
}

export default async function GroupProfile({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  const { data: clubInfo } = await serverApi(`/clubs/${params.address}`);

  return (
    <div className="grid grid-cols-3 gap-md">
      <div className="col-span-1 flex flex-col gap-md">
        <Card>
          <CardHeader>Information section</CardHeader>
          <CardContent>
            <div className="flex flex-col text-md gap-4 text-sm font-medium">
              <div className="flex">
                <span className="text-sm font-medium w-[100px] text-text-secondary">
                  Address
                </span>
                <span>{clubInfo.contract}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium w-[100px] text-text-secondary">
                  Members
                </span>
                <span>{clubInfo.members.length}</span>
              </div>
              <div className="flex w-full">
                <span className=" w-[100px] text-text-secondary">Created</span>
                <span >
                  {formatDate(clubInfo.created_at)}
                </span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium w-[100px] text-text-secondary">
                  Owner
                </span>
                <span className="text-blue-500 hover:text-blue-800">
                  <Link
                    href={`/profiles/${clubInfo.owner}`}
                    className="text-sm"
                  >
                    {truncateMiddle(clubInfo.owner, 15)}
                  </Link>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Open positions.</CardHeader>
          <CardContent>
            Coming soon
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Network</CardHeader>
          <CardContent>
            <div className="flex flex-col gap-[22px]">
              {clubInfo.links?.map((link: string, index: number) => (
                <div key={index} className="flex gap-[10px] items-center">
                  <Image
                    src="/images/metronic/icons/facebook.png"
                    width={18}
                    height={18}
                    alt="icon"
                  />
                  <Link
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-sm"
                  >
                    {link}
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Tags</CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="">
                Development
              </Badge>
              <Badge variant="secondary">UI/UX</Badge>
              <Badge variant="secondary">Backend</Badge>
              <Badge variant="secondary">Product Design</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2 flex flex-col gap-md">
        <GroupDetails details={clubInfo} />
        <div className="grid grid-cols-2">
          <Suspense fallback={"card loading"}>
          <GroupMember address={params.address.toString()} lang={dictionary} />
          </Suspense>
        </div>
      </div>

      {/* <GroupAchievements address={params.address.toString()} isCreator={data.isCreator}/> */}
      {/*      <GroupNft
        contract={clubInfo.contract}
        address={params.address.toString()}
        achievements={clubInfo.achievements}
        userAchievements={userAchievements.data}
        lang={dictionary}
      /> */}
    </div>
  );
}