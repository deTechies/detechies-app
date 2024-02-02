import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
<<<<<<< Updated upstream
import { getUserProfile } from "@/lib/data/user";
import UserSummary from "./_component/user-summary";
import UserReports from "./_component/user-reports";
<<<<<<< Updated upstream
import { serverApi } from "@/lib/data/general";
=======
=======
import { serverApi } from "@/lib/data/general";
import { getUserProfile } from "@/lib/data/user";
import UserProjects from "./_component/user-projects";
import UserReports from "./_component/user-reports";
import UserSummary from "./_component/user-summary";
>>>>>>> Stashed changes
>>>>>>> Stashed changes

export default async function ProfileReport({
  params,
  searchParams,
}: {
  params: { lang: Locale; user: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

<<<<<<< Updated upstream
  const { data: profile } = (await getUserProfile(params.user)) as any;
  const result = await serverApi(
    "/survey-report/createSurveyReport/f78093c0-140a-4a0a-a4d2-30e72c7dc0e4"
  );
=======
<<<<<<< Updated upstream
  return (
    <div className="flex flex-col gap-4 m-10 max-w-[80rem]">
      <h4 className="mb-10 text-center text-heading_s">전문가 평판 보고서</h4>
>>>>>>> Stashed changes

  const { data: userReport } = await serverApi(
    "/survey-report/getUserReport/0xe8654C95b77e4E8fb1E4A88098bF193259B31DD9"
    // 0xfFf09621F09CAa2C939386b688e62e5BE19D2D56
  );

  return (
    <div className="flex flex-col gap-4 my-10 mx-auto max-w-[80rem]">
      <h4 className="mb-10 text-center text-heading_s">
        {dictionary.profile.summary.title}
      </h4>

      <UserSummary lang={dictionary} profile={profile} survey={result.data} />

=======
  const { data: profile } = (await getUserProfile(params.user)) as any;
  const result = await serverApi(
    "/survey-report/createSurveyReport/f78093c0-140a-4a0a-a4d2-30e72c7dc0e4"
  );
  
  //now we want to search the searchParams and get the projectId
  const project = searchParams.project ? searchParams.project : null;

  const {data: projects} = await serverApi(
    `/project-work/${params.user}/finished`
  );

  const { data: userReport } = await serverApi(
    `/survey-report/getUserReport/0xfFf09621F09CAa2C939386b688e62e5BE19D2D56`
    //
  );

  return (
    <div className="flex flex-col gap-4 my-10 mx-auto max-w-[80rem] m-10">
      <h4 className="mb-10 text-center text-heading_s">
        {dictionary.profile.summary.title}
      </h4>
   

      <UserSummary lang={dictionary} profile={profile} survey={result.data} />
      {
        projects.length > 0 && (
          <UserProjects
          projects={projects}
          lang={dictionary}
          selectedProject={project}
        />
        )  
      }
>>>>>>> Stashed changes
      <UserReports
        selectedProject={project}
        lang={dictionary}
<<<<<<< Updated upstream
        totalResult={result.data}
        userReport={userReport}
=======
<<<<<<< Updated upstream
        profile={profile}
        
=======
        projects={projects.data}
        totalResults={result.data}
        userReport={userReport}
>>>>>>> Stashed changes
>>>>>>> Stashed changes
      />
    </div>
  );
}
