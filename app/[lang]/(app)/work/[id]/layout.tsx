import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";
import InvalidWorkAccess from "./_components/invalid-work-access";
import WorkTitle from "./_components/work-title";

export default async function ProjectMemberEvaluationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; id: string };
}) {
  const dictionary = await getDictionary(params.lang);
  const details = await getProjectWork(params.id);
  
  if(!details.data) {
    return  <InvalidWorkAccess details={details} />;
  }
  

  return (
    <main className="flex flex-col gap-0 mx-8">
      <WorkTitle
        username={details.data.projectWork?.projectMember?.user?.display_name}
        lang={dictionary}
      ></WorkTitle>

      <section>{children}</section>
    </main>
  );
}
