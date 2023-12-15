import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import EvaluationRequests from "./evaluation_requests";
import EvaluationProvided from "./evaluations_provided";
import EvaluationsRequested from "./evaluations_requested";

export default async function Evaluation({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  const text = dictionary.mypage?.evaluations?.menu;
  return (
    <Tabs defaultValue="requested" className="w-full">
      <TabsList>
        <TabsTrigger value="requested">
          {text?.evaluation_requested}
        </TabsTrigger>
        <TabsTrigger value="requests">{text?.evaluation_requests}</TabsTrigger>
        <TabsTrigger value="evaluations">{text?.evaluation_wrote}</TabsTrigger>
      </TabsList>
      <TabsContent value="requested">
        <EvaluationsRequested />
      </TabsContent>
      <TabsContent value="requests">
        <EvaluationRequests />
      </TabsContent>
      <TabsContent value="evaluations">
        <EvaluationProvided />
      </TabsContent>
    </Tabs>
  );
}
