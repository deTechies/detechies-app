// import Image from "next/image";

import { serverApi } from "@/lib/data/general";

import JoinGroup from "@/components/group/join-group";
import { addURL } from "@/lib/utils";

import { Folder, Geolocation, User } from "detechies-icons";
import Image from "next/image";
import ProfileTabs from "../../../mypage/_components/profile-page-card/profile-tabs";

export default async function GroupProfileCard({
  id,
  lang,
}: {
  id: string;
  lang: any;
}) {
  const { data: teamDetails } = await serverApi(`/clubs/${id}`);
  const links = [
    {
      name: lang.group.tabs.about,
      href: "",
      isAdmin: false,
    },
    {
      name: lang.group.tabs.nft,
      href: "nft",
      isAdmin: false,
    },
    {
      name: lang.group.tabs.members,
      href: "members",
      isAdmin: false,
    },
    {
      name: lang.group.tabs.mission,
      href: "missions",
      isAdmin: false,
    },
    {
      name: 'Funds',
      href: "funds",
    },
    {
      name: lang.group.tabs.manage,
      href: "manage",
      isAdmin: true,
    },
  ] as any;
  return (
    <div className="">
      <header className=" gap-10 justify-center text-center bg-center	 bg-[url('/images/header-hex.png')]  ">
        <div className="flex flex-col gap-3.5 mx-auto  py-10">
          <div className="mx-auto h-[100px] w-[100px] rounded-full relative border-2 border-accent-primary  bg-background-layer-2">
            <Image
              src={addURL(teamDetails.image)}
              sizes={"32"}
              alt="teams_picture"
              className="p-4 rounded-full"
              fill
            />
          </div>

          <div>
            <h1 className="text-1.5xl tracking-wider">
              {teamDetails.name}
            </h1>
          </div>
          <div className="flex gap-[18px] text-gray-600 mx-auto">
            <div className="flex gap-[5px] justify-center items-center">
              <Folder fontSize={16} />
              <span className="text-md">0 Project</span>
            </div>

            <div className="flex gap-[5px] first-letter:justify-center items-center">
              <Geolocation fontSize={16} />
              <span className="text-md">Location</span>
            </div>

            <div className="flex gap-[5px] justify-center items-center text-gray-600">
              <User fontSize={16} />
              <span className="text-md">
                {teamDetails.members.length} members
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="sticky top-0">
        <ProfileTabs links={links} prelink={`/teams/${teamDetails.id}`}>


          {teamDetails.userRole == "none" && (
            <div className="flex gap-3 grow">
              <JoinGroup
                groupId={teamDetails.id}
                details={teamDetails}
                lang={lang}
              />
            </div>
          )}
        </ProfileTabs>
      </div>
    </div>
  );
}
