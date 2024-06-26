import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getQuestions } from "@/lib/data/feedback";
import CreateQuestion from "./create-question";
import { questionColumns } from "./question-columns";
import { QuestionTable } from "./question-table";

export default async function Questions() {
  //get the

  const {data:questions} = await getQuestions();

  return (
    <Card className="">
      <CardHeader>
        <h3>Questions</h3>
        <CreateQuestion />
      </CardHeader>
      <CardContent >
      <QuestionTable
        columns={questionColumns}
        data={questions}
        hideColumn={true}
      />
      </CardContent>
    </Card>
  );
}
