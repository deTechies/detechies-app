import PercentageSliderField from "@/components/form/percentage-helper";
import { Ranking } from "@/components/group/ranking";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormInlineItem, FormInlineLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Question } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PreviewQuestionProps {
  question: Question;
}

const previewQuestionSchema = z.object({
  question: z.array(z.number().min(0).max(100)),
});

type verifyWorkValues = z.infer<typeof previewQuestionSchema>;
export default function PreviewQuestion({ question }: PreviewQuestionProps) {
  const form = useForm<verifyWorkValues>({
    resolver: zodResolver(previewQuestionSchema),
  });

  const onSubmit = (data: verifyWorkValues) => {
    window.alert(JSON.stringify(data));
  };
  return (
    <Dialog>
      <DialogTrigger>Preview</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            {question.type == "slider" && (
              <PercentageSliderField
                form={form}
                name="question"
                label={question.content}
                steps={100 / question.scale}
                messages={question.messages}
              />
            )}

            <div>
              {question.type == "circles" && (
                <Ranking
                  key={question.id}
                  ranks={3}
                  minText={question.minText}
                  maxText={question.maxText}
                  activeRank={1}
                  onSelectRank={(message) => window.alert(message)}
                />
              )}
            </div>
            
            {
              question.type == "input" && 
              <FormInlineItem>
                <FormInlineLabel>{question.content}</FormInlineLabel>
                <Input />
              </FormInlineItem>
            }

            <DialogClose>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
