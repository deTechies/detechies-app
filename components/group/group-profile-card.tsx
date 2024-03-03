// import Image from "next/image";
import Image from "@/components/ui/image";

import { serverApi } from "@/lib/data/general";
import Link from "next/link";
import { CardContent } from "../ui/card";

import { addURL } from "@/lib/utils";
import { Briefcase, Folder, MapPin } from "lucide-react";
import Avatar from "../metronic/avatar/avatar";

export default async function GroupProfileCard({
  id,
  lang,
}: {
  id: string;
  lang: any;
}) {
  const { data: groupDetail } = await serverApi(`/clubs/${id}`);

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
    <div className="px-32 -m-10 bg-background-layer-1">
          <header className=" w-full gap-2 justify-center text-center bg-center	 bg-[url('/images/header-hex.png')]  ">
      <div className="flex flex-col gap-2 mx-auto py-10 ">
        <div className="mx-auto">
          <Avatar
            src={addURL(groupDetail.image)}
            shape="rounded"
            className="border-2 border-accent-primary"
            size={32}
          />
        </div>

        <div>
          <h1 className="text-subhead_m text-text-primary">
            {groupDetail.name}
          </h1>
        </div>
        <div className="flex gap-4 divide-x  text-text-secondary mx-auto">
            <div className="flex gap-2 justify-center items-center">
              <Folder
               />
              <span className="text-label_m">
                0 Project
              </span>
            </div>

            <div className="flex gap-2 justify-center items-center pl-3">
              <MapPin />
              <span className="text-label_m">
                Location
              </span>
            </div>

            <div className="flex gap-2 justify-center items-center pl-3 text-text-secondary">
              <Briefcase />
              <span className="text-label_m">
                {groupDetail.members.length} members
              </span>
            </div>

        </div>
      </div>
    </header>


      <CardContent className="flex flex-wrap items-end justify-between">
        <div className="flex flex-col flex-wrap mb-9 max-h-[110px] gap-x-2">
          {groupDetail.links &&
            groupDetail.links.length &&
            groupDetail.links.map((url: string, index: number) => {
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

      
      </CardContent>
    </div>
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
