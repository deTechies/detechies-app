import { Card } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";
import FinalFeedbackForm from "./final-feedback-form";

export default async function FinalFeedbackPage({
    params: { lang, app, id },
}: {
    params: { lang: Locale; app: string; id: string; member: string;}}) {
        
        const dictionary = await getDictionary(lang);
        const details = await getProjectWork(id)
        
        
        
  return (
    <Card className="max-w-2xl mx-auto">
        <FinalFeedbackForm text={dictionary.project.member.evaluate} workId={id} surveyResponseId={details.id}/>
    </Card>
  )
}