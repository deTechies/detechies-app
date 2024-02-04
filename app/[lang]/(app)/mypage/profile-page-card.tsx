import { getDictionary } from "@/get-dictionary";
import { getUserProfile } from "@/lib/data/user";
import ViewProfileCard from "./_components/profile-page-card/view-profile-card";

export default async function ProfilePageCard({ lang }: { lang: any}) {
  const dictionary = await getDictionary(lang);
  const { data: profile } = await getUserProfile();



    
  return (
    <ViewProfileCard profile={profile} dictionary={dictionary} />
  );
}
