


import { serverApi } from "@/lib/data/general";
import { auth } from "@/lib/helpers/authOptions";

import { CalendarAdd, CalendarRemove, FingerprintScanning } from "detechies-icons";
import Image from "next/image";
import ProfileTabs from "../../../mypage/_components/profile-page-card/profile-tabs";


export default async function LayoutProjectDetail({
  projectId,
}: {
  projectId: string;
}) {
  const { data: project } = await serverApi(`/projects/${projectId}`);
  const session = await auth();

  const groupList = project.members.map((member: any) => {
    return {
      name: member.user.name,
      src: `https://ipfs.io/ipfs/${member.user.avatar_link}`,
      id: member.user.wallet,
    };
  });

  const links = [
    {
      name: "dashboard",
      href: "",
      isAdmin: false,
    },
    {
      name: "members",
      href: `members`,
      isAdmin: false,
    },
    {
      name: "feed",
      href: `feed`,
      isAdmin: false,
    },
  ] as any;
  
  if(project.owner === session?.web3.address) {
    links.push({
      name: "settings",
      href: `edit`,
      isAdmin: true,
    });
  }

  return (
    <div className="">
    <header className=" gap-10 justify-center text-center 	bg-[url('/hexagon-header.png')] bg-auto bg-no-repeat bg-center  ">
      <div className="flex flex-col gap-3.5 mx-auto  py-10">
        <div className="mx-auto h-[100px] w-[100px] bg-light-clarity rounded-full relative border-2 border-primary">
          <Image
            src={`https://ipfs.io/ipfs/${project.image}`}
            sizes={"32"}
            alt="projecT_image"
            className="p-4 rounded-full"
            fill
          />
        </div>

        <div>
          <h1 className="text-subhead_m text-text-primary">
            {project.name}
          </h1>
        </div>
        <div className="flex text-2sm gap-[18px] text-gray-600 mx-auto">
          <div className="flex gap-[5px] justify-center items-center">
            <FingerprintScanning fontSize="16" />
            <span className="">{project.type}</span>
          </div>

          <div className="flex gap-[5px] first-letter:justify-center items-center">
            <CalendarAdd fontSize="16"  />
            <span className="">{project.begin_date}</span>
          </div>

          <div className="flex gap-[5px] justify-center items-center text-gray-600">
            <CalendarRemove fontSize="16" />
            <span className="">
            {project.end_date} 
            </span>
          </div>
        </div>
      </div>
    </header>
    <div className="sticky top-0">
      <ProfileTabs links={links} prelink={`/project/${projectId}`}>

      </ProfileTabs>
    </div>
  </div>

  );
}
