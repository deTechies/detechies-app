
import Image from "next/image";

import { getClub } from "@/lib/data/groups";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import JoinGroup from "./join-group";
import InviteGroupMember from "../invite-group-member/invite-group-member";

export default async function GroupProfileCard({ id }: { id: string }) {
  const groupDetail = await getClub(id);

  const snsLogos = {
    youtube: "/icons/youtube.png",
    facebook: "/icons/facebook.png",
    instagram: "/icons/instagram.png",
    twitter: "/icons/twitter.png",
    x: "/icons/x_dark.png",
  };

  const getSnsLogo = (url: string) => {
    if (url.includes("youtube.com")) {
      return snsLogos.youtube;
    } else if (url.includes("facebook.com")) {
      return snsLogos.facebook;
    } else if (url.includes("instagram.com")) {
      return snsLogos.instagram;
    } else if (url.includes("twitter.com")) {
      return snsLogos.twitter;
    } else if (url.includes("x.com")) {
      return snsLogos.x;
    } else {
      return snsLogos.youtube;
    }
  };

  const urls = [
    "https://facebook.com/asdfasdf",
    "https://youtube.com/address",
    // "https://twitter.com/address",
    "https://instagram.com/address",
    "https://x.com/address",
  ];

  return (
    <Card className="w-full top-10 bg-[url(/images/bg-group-header.png)] bg-center rounded-b-none pt-[72px]">
      <CardHeader className="flex items-center justify-start">
        <div className="rounded-full w-[93px] h-[93px] flex justify-center items-center mr-6 shrink-0 overflow-hidden">
          <Image
            src={
              groupDetail.image
                ? `https://ipfs.io/ipfs/${groupDetail.image}`
                : "/icons/group_default.png"
            }
            alt={`Layer company image`}
            className="object-scale-down aspect-square"
            width={93}
            height={93}
          />
        </div>

        <div className="flex gap-0.5 items-center">
          <h3 className="truncate text-heading_m text-accent-on-primary">
            {groupDetail?.name ? groupDetail?.name : "Name not found"}
          </h3>

          <Image
            src="/icons/certified.png"
            alt="certified"
            width={20}
            height={20}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-wrap items-end justify-between">
        <div className="flex flex-col flex-wrap mb-9 max-h-[110px] gap-x-2">
          {urls.map((url, index) => {
            if (index > 5) {
              return;
            }

            return (
              <Link
                href={url}
                className="flex items-center gap-3 rounded-md px-1.5 py-1.5"
                target="_blank"
                key={index}
              >
                <Image
                  src={getSnsLogo(url)}
                  alt={`sns logo image`}
                  className="object-scale-down aspect-square"
                  width={24}
                  height={24}
                ></Image>
                {/* {url && truncateMiddle(url, 12)} */}

                <span className="text-label_s text-accent-on-primary">
                  {url}
                </span>
              </Link>
            );
          })}
        </div>

        {
          groupDetail.userRole == "admin" && (
          <div className="flex justify-end gap-3 grow">
            <Link href={`/groups/${id}/create/nft`} className="max-w-[230px] grow rounded-full">
              <Button size="lg" variant="primary" className="w-full">
                NFT 생성하기
              </Button>
            </Link>

            <InviteGroupMember groupId={id}></InviteGroupMember>
          </div>
          )
        }
        
        {
          groupDetail.userRole == "none" && (
          <div className="flex justify-end gap-3 grow">
            <JoinGroup groupId={groupDetail.id} details={groupDetail}/>
          </div>
          )
        }
      </CardContent>
    </Card>
  );
}

export function ProfileStat({ name, value }: { name: string; value: number }) {
  return (
    <div className="flex flex-col justify-center p-4 px-6 item-center">
      <h3 className="text-lg font-medium text-black-normal">{value}</h3>
      <span className="capitalize text-text-secondary ">{name}</span>
    </div>
  );
}

{
  /* <div className="w-full my-4">
  <div className="grid grid-cols-2 border rounded-sm">
    <ProfileStat name="achievements" value={groupDetail.achievements?.length} />
    <ProfileStat name="members" value={groupDetail?.members?.length} />
  </div>

  <div className="grid items-center gap-2 my-4">
    {groupDetail.userRole == "member" ? (
      <Link
        href={`/groups/${groupDetail.address}/chat`}
        className="w-full py-2 text-center rounded-sm bg-button-secondary text-accent-primary"
      >
        Group Chat
      </Link>
    ) : (
      <JoinGroup address={groupDetail.address} />
    )}
  </div>
  {groupDetail.userRole == "admin" && (
    <div className="grid items-center gap-2 my-4">
      <Link
        href={`/groups/${id}`}
        className="w-full py-2 text-center rounded-sm bg-accent-secondary text-accent-primary"
      >
        Home
      </Link>
      <Link
        href={`/groups/${id}/achievements`}
        className="w-full py-2 text-center rounded-sm bg-accent-secondary text-accent-primary"
      >
        Manage Achievements
      </Link>
      <Link
        href={`/groups/${id}/members`}
        className="w-full py-2 text-center rounded-sm bg-accent-secondary text-accent-primary"
      >
        Manage Members
      </Link>
    </div>
  )}
</div>; */
}
