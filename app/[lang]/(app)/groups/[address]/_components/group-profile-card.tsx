// import Image from "next/image";

import { serverApi } from "@/lib/data/general";

import JoinGroup from "@/components/group/join-group";
import InviteGroupMember from "@/components/invite-group-member/invite-group-member";
import Avatar from "@/components/metronic/avatar/avatar";
import { Button } from "@/components/ui/button";
import { addURL } from "@/lib/utils";
import { Briefcase, Folder, MapPin } from "lucide-react";
import Link from "next/link";
import ProfileTabs from "../../../mypage/_components/profile-page-card/profile-tabs";

export default async function GroupProfileCard({
  id,
  lang,
}: {
  id: string;
  lang: any;
}) {
  const { data: groupDetail } = await serverApi(`/clubs/${id}`);
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
      name: lang.group.tabs.manage,
      href: "manage",
      isAdmin: true,
    },
  ] as any;
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
              <Folder />
              <span className="text-label_m">0 Project</span>
            </div>

            <div className="flex gap-2 justify-center items-center pl-3">
              <MapPin />
              <span className="text-label_m">Location</span>
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
      <ProfileTabs links={links} prelink={`/groups/${groupDetail.id}`}>
        {groupDetail.userRole == "admin" && (
          <div className="flex items-start gap-3 grow">
            <Link
              href={`/groups/${groupDetail.id}/create/nft`}
              className="max-w-[212px] grow rounded-full"
            >
              <Button size="sm" variant="primary" className="w-full">
                Create Achievement
              </Button>
            </Link>

            <InviteGroupMember
              groupId={groupDetail.id}
              lang={lang}
              groupMembers={groupDetail.members}
            />
          </div>
        )}

        {groupDetail.userRole == "none" && (
          <div className="flex gap-3 grow">
            <JoinGroup
              groupId={groupDetail.id}
              details={groupDetail}
              lang={lang}
            />
          </div>
        )}
      </ProfileTabs>
    </div>
  );
}
