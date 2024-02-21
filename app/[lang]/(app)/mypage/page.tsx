import { Suspense } from "react";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
// import { serverApi } from "@/lib/data/general";
import { getUserProfile } from "@/lib/data/user";
import { Skeleton } from "@/components/ui/skeleton";

import ProfileAwards from "./_components/profile-awards";
import ProfileCertificates from "./_components/profile-certificates";
import ProfileDetails from "./_components/profile-details";
import ProfileProjects from "./_components/profile-projects";
import Link from "next/link";

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
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSdaGktRBD5MYSK1yMJ5vmdMziS1Hry6bGMJz-xArh0kHh0khA/viewform?usp=sf_link"
        target="_blank"
        className="w-full rounded-md bg-no-repeat bg-cover bg-[url('/images/banner-make-portfolio.png')] aspect-[1096/142]"
      />

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
