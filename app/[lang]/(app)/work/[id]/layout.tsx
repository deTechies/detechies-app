import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";

export default async function ProjectMemberEvaluationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; id: string };
}) {
  const dictionary = await getDictionary(params.lang);
  const { data: details } = await getProjectWork(params.id);

  return (
    <main className="flex flex-col gap-0 mx-8">
      <header className="my-10 text-center">
        <h2 className="mb-4 text-heading_m">{dictionary.project.evaluate.evaluate_performance}</h2>
        <h5 className="text-title_m text-text-secondary">
          {dictionary.project.work.desc}
          {details.projectWork.projectMember?.user?.display_name}
          {dictionary.project.work.desc2}
        </h5>
      </header>

      <section>{children}</section>
    </main>
  );
}
