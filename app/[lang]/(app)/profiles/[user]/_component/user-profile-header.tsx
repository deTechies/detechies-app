import UserChat from "@/components/extra/chat/user-chat";
import { serverApi } from "@/lib/data/general";
import { Address } from "viem";
import ProfileTabs from "../../../mypage/_components/profile-page-card/profile-tabs";
import ViewProfileCard from "../../../mypage/_components/profile-page-card/view-profile-card";

export default async function UserProfileHeader({
  userWallet,
}: {
  userWallet: string;
}) {
  const { data: user } = await serverApi(`/users/${userWallet}`);
  const links = [
    {
      name: "dashboard",
      href: "",
      isAdmin: false,
    },
    {
      name: "projects",
      href: "projects",
      isAdmin: false,
    },
    {
        name: "evaluation",
        href: "evaluation",
        isAdmin: false,
      },
      {
        name: "avatar",
        href: "avatar",
        isAdmin: false,
      },
    {
      name: "analysis",
      href: "analysis",
      isAdmin: true,
    },
  ] as any;
  

  return (
    <div className="flex flex-col">
    <ViewProfileCard profile={user} dictionary={""} />
    <ProfileTabs links={links}>
      <UserChat to={userWallet as Address} />
    </ProfileTabs>
    </div>
  );
}
