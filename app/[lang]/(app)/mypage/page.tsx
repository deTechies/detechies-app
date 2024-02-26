import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { Suspense } from "react";
// import { serverApi } from "@/lib/data/general";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfile } from "@/lib/data/user";

import ProfileAwards from "./_components/profile-awards";
import ProfileCertificates from "./_components/profile-certificates";
import ProfileDetails from "./_components/profile-details";
import ProfileProjects from "./_components/profile-projects";

export default async function Dashboard({
  params,
}: {
  params: { lang: Locale };
}) {
  //TODO: make sure that this is refetched when the users edit profile.
  const { data: profile } = await getUserProfile();
  const dictionary = (await getDictionary(params.lang)) as any;

  // const {data: myProfile} = await serverApi(`/users/me`);

  return (
    
    <main className="flex flex-col gap-6">

      <Suspense fallback={<Skeleton className="h-20 animate-pulse" />}>
        <ProfileDetails profile={profile} text={dictionary} />
      </Suspense>

      <ProfileProjects
        projects={profile.projects}
        text={dictionary.mypage.project}
        lang={dictionary}
      />

      {profile?.achievement_rewards && (
        <div className="flex flex-col gap-6">
          <ProfileCertificates
            achievement_rewards={profile.achievement_rewards}
            text={dictionary.mypage.education}
          />
          <ProfileAwards
            achievement_rewards={profile.achievement_rewards}
            text={dictionary.mypage.awards}
          />
        </div>
      )}
    </main>
  );
}
