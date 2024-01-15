import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import Evaluations from "./evaluations";
import EvaluationProvided from "./evaluations_provided";

export default async function Evaluation({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  //add queries to the server api call here.
  const queries = {
    status: "draft",
  };
  const filters = new URLSearchParams(queries).toString();

  console.log(filters);
  const {data} = await serverApi(`/survey-response/filtered?${filters}`);

  //filtering the data out here.
  const requestedResponses = data.filter(
    (item: any) => item.status === "requested"
  );
  const providedResponses = data.filter((item: any) => item.status === "draft");
  const receivedResponses = data.filter(
    (item: any) => item.status === "requested"
  );

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
