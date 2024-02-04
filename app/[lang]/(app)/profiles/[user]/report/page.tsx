import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import { Suspense } from "react";
import UserProjects from "./_component/user-projects";
import UserReports from "./_component/user-reports";
import UserSummary from "./_component/user-summary";

export default async function ProfileReport({
  params,
  searchParams,
}: {
  params: { lang: Locale; user: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

 
  const project = searchParams.project as string;

  //TOOD: fix this so we don't get all the users profiles immediately but only parts of it. 
  const { data: profile } = (await serverApi(`/users/profile-details/${params.user}`)) as any;
  

  return (
    <div className="flex flex-col gap-4 my-10 mx-auto max-w-[80rem] m-10">
      <h4 className="mb-10 text-center text-heading_s">
        {dictionary.profile.summary.title}
      </h4>
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserSummary lang={dictionary} profile={profile} />
      </Suspense>

        <Suspense fallback={<div>Loading proejcts ...</div>}>
          <UserProjects
            user={params.user}
            lang={dictionary}
            selectedProject={project}
          />
        </Suspense>
      <Suspense fallback={<div>Loading reports.....</div>}>
        <UserReports
          selectedProject={project}
          lang={dictionary}
          selectedLang={params.lang}
          address={params.user}
        />
      </Suspense>
    </div>
  );
}
