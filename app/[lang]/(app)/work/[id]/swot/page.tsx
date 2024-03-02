import { Card } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { serverApi } from "@/lib/data/general";
import { redirect } from "next/navigation";
import FinalFeedbackForm from "./final-feedback-form";

export default async function FinalFeedbackPage({
  params: { lang, app, id },
}: {
  params: { lang: Locale; app: string; id: string; member: string };
}) {
  const dictionary = await getDictionary(lang);
  const { data: details } = await serverApi(`/survey-response/surveyByWork/${id}`);
  
  if(!details) redirect(`/work/${id}`)

  return (
    <Card className="mx-auto max-w-[1027px]">
      <FinalFeedbackForm
        text={dictionary}
        workId={id}
        surveyResponseId={details.id}
        defaultValues={details.swot}
      />
    </Card>
  );
}
