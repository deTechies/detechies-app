import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Survey } from "@/lib/interfaces";
import { useForm } from "react-hook-form";

export function PreviewSurvey({
  selected,
  setSelected,
}: {
  selected: Survey;
  setSelected: any;
}) {
  const form = useForm<any>({});

  const onSubmit = (data: FormData) => {
    toast({
      title: "form results",
      description: <pre>{JSON.stringify(data, null, 2)}</pre>,
    });
  };
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <h3>
          {selected.name} ({selected.questions.length})
        </h3>
        <Button size="sm" onClick={() => setSelected(null)}>
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {
            selected.questions.map((question, index) => (
              <div key={index} className="flex flex-col gap-2">
                <span className="text-subhead_s">{question.content}</span>
                <span className="text-text-secondary">{question.category} ({question.id})</span>
                <ul className="my-2">
                  { question.messages &&
                    question.messages.map((option, index) => 
                    option &&
                    (
                      
                      <li key={index}>
                        <span />
                        {option}
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
}
