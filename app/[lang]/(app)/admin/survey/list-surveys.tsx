"use client";

import PercentageSliderField from "@/components/form/percentage-helper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Survey } from "@/lib/interfaces";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ListSurveys({ survey }: { survey: Survey[] }) {
  const [selected, setSelected] = useState<any>(null);

  if (selected)
    return <SurveyExample selected={selected} setSelected={setSelected} />;
  return (
    <main className="flex flex-col gap-4">
      {survey.length > 0 &&
        survey.map((item: any) => (
          <Card key={item.id}>
            <CardHeader>
              <h3>{item.name}</h3>
              <Button size="sm" onClick={() => setSelected(item)}>
                Preview
              </Button>
            </CardHeader>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </Card>
        ))}
    </main>
  );
}

export function SurveyExample({
  selected,
  setSelected,
}: {
  selected: Survey;
  setSelected: any;
}) {
  const form = useForm<any>({});
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
          <Form {...form}>
            {selected.questions.map((question: any) => {
              return (
                <PercentageSliderField
                    key={question.id}
                  form={form}
                  name={question.id}
                  label={question.content}
                  steps={100 / question.scale}
                  messages={question.messages}
                />
              );
            })}
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
