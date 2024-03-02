import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import WorkTitle from "./_components/work-title";

export default async function ProjectMemberEvaluationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; id: string };
}) {
  const dictionary = await getDictionary(params.lang);

  

  return (
    <main className="flex flex-col gap-0 mx-auto">
      <WorkTitle
        username="team mate"
        lang={dictionary}
      />

      <section>{children}</section>
    </main>
  );
}
