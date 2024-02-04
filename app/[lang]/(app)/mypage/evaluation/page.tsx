import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { Suspense } from "react";
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
          <TabsTrigger value="received">
            {text?.evaluation_received}
          </TabsTrigger>
          <TabsTrigger value="evaluations">
            {text?.evaluation_wrote}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="requested">
          <Suspense fallback={<Skeleton />}>
            <Evaluations queries={{ status: "requested" }} lang={dictionary} />
          </Suspense>
        </TabsContent>
        <TabsContent value="received">
          <Suspense fallback={<Skeleton />}>
            <Evaluations queries={{ status: "finished" }} lang={dictionary} />
          </Suspense>
        </TabsContent>
        <TabsContent value="evaluations">
          <Suspense fallback={<Skeleton />}>
            <EvaluationProvided lang={dictionary} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
}
