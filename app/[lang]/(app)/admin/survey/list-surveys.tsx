"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Survey } from "@/lib/interfaces";
import { useState } from "react";
import { PreviewSurvey } from "./preview-survey";

export default function ListSurveys({ survey }: { survey: Survey[] }) {
  const [selected, setSelected] = useState<any>(null);
  
  console.log(survey)

  if (selected)
    return <PreviewSurvey selected={selected} setSelected={setSelected} />;
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
            <CardContent>
              <span>
                {item.description}
              </span>
              <Badge>
                {item.category}
              </Badge>
              
              <div className="flex gap-4">
                <span>{item.questions.length}</span>
                <span>{item.created_at}</span>
                
              </div>
            </CardContent>
          </Card>
        ))}
    </main>
  );
}

