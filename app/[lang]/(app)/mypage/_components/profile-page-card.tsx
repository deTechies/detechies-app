
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { getUserProfile } from "@/lib/data/user";
import Link from "next/link";
import ProfileTabs from "./profile-page-card/profile-tabs";
import ViewProfileCard from "./profile-page-card/view-profile-card";

export default async function ProfilePageCard({ lang }: { lang: any}) {
  const dictionary = await getDictionary(lang);
  const { data: profile } = await getUserProfile();


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
  ] as any;

    
  return (
    <div className="flex flex-col">
      <ViewProfileCard  profile={profile} dictionary={dictionary} />
      <ProfileTabs
        prelink="/mypage"
        links={links}
      >
         <Link href="/mypage/edit"  passHref>
            <Button size="sm">
                Edit Profile
            </Button>
        </Link>
      </ProfileTabs>
    </div>
  );
}
