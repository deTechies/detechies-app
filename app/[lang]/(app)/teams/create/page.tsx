
import { Card } from "@/components/metronic/card/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { CreateTeamForm } from "./_component/create-team-form";

export default async function CreateTeamPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  // const text = dictionary?.group?.create;
  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="w-full max-w-[60rem] mx-auto">
      <Card className="gap-0 py-10 px-14">
        <header className="flex flex-col mb-10">
          <h4 className="mb-3 text-heading_s">
            {dictionary.group.create.title}
          </h4>

          <span className="mb-1 text-body_s text-state-error">
            {dictionary.group.create.required_text}
          </span>

          <span className="text-label_s text-text-secondary ">
            {dictionary.group.create.description}
          </span>
        </header>

        <CreateTeamForm />
      </Card>
    </main>
  );
}
