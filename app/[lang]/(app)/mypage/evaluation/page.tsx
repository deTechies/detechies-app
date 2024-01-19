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
    <main className="">
      <Tabs defaultValue="requested" className="flex flex-col w-full">
        <TabsList>
          <TabsTrigger value="requested">
            {text?.evaluation_requested}
          </TabsTrigger>
          <TabsTrigger value="requests">
            {text?.evaluation_received}
          </TabsTrigger>
          <TabsTrigger value="evaluations">
            {text?.evaluation_wrote}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="requested">
          <Evaluations queries={{ status: "requested" }} lang={dictionary} />
        </TabsContent>
        <TabsContent value="requests">
          <Evaluations queries={{ status: "draft"}} lang={dictionary} />
        </TabsContent>
        <TabsContent value="evaluations">
          <EvaluationProvided lang={dictionary} />
        </TabsContent>
  
      </Tabs>
    </main>
  );
}
