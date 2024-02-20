import { Card } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";

import { redirect } from "next/navigation";
import FinalFeedbackForm from "./final-feedback-form";

export default async function FinalFeedbackPage({
  params: { lang, app, id },
}: {
  params: { lang: Locale; app: string; id: string; member: string };
}) {
  const dictionary = await getDictionary(lang);
  const { data: details } = await getProjectWork(id);
  
  if(!details) redirect(`/work/${id}`)

  return (
    <Card className="mx-auto">
      <FinalFeedbackForm
        text={dictionary}
        workId={id}
        surveyResponseId={details.id}
        defaultValues={details.swot}
      />
    </Card>
  );
}
