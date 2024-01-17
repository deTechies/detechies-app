import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import Evaluations from "./evaluations";
import EvaluationProvided from "./evaluations_provided";

export default async function Evaluation({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  const text = dictionary.mypage?.evaluations?.menu;
  return (
    <main className="w-full">
      <Tabs defaultValue="requested" className="w-full">
        <TabsList>
          <TabsTrigger value="requested">
            {text?.evaluation_requested}
          </TabsTrigger>
          <TabsTrigger value="requests">
            {text?.evaluation_requests}
          </TabsTrigger>
          <TabsTrigger value="evaluations">
            {text?.evaluation_wrote}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="requested">
          <Evaluations queries={{ status: "requested" }} />
        </TabsContent>
        <TabsContent value="requests">
          <Evaluations queries={{ status: "draft"}} />
        </TabsContent>
        <TabsContent value="evaluations">
          <EvaluationProvided />
        </TabsContent>
      </Tabs>
    </main>
  );
}
