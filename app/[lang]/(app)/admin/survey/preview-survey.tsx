import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { postServer } from "@/lib/data/postRequest";
import TranslationForm from "./form/translation-form";

interface TranslationData {
  content: string;
  category: string;
  messages: string[];
}

interface TranslationsState {
  [key: string]: TranslationData;
}

export function PreviewSurvey({ selected, setSelected }:any) {
  const [translations, setTranslations] = useState<TranslationsState>({});

  const handleTranslationSubmit = async(
    questionId: string,
    language: string,
    data: TranslationData
  ) => {
    console.log(data)
    console.log("Submitted data:", { questionId, language, data });
    
    const formData = JSON.stringify({
      content: data.content,
      category: data.category,
      messages: data.messages,
      language: language
    })
    const result = await postServer(`/question/${questionId}/translations/${language}`, formData)
    setTranslations(prev => ({
      ...prev,
      [`${questionId}-${language}`]: data,
    }));
  };

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <h3>{selected.name} ({selected.questions.length})</h3>
        <Button size="sm" onClick={() => setSelected(null)}>Back</Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {selected.questions.map((question:any, index:number) => (
            <div key={index}>
              <div className="my-4 grid grid-cols-3">
                <h1>{question.content}</h1>
                <h2>{question.id}</h2>
                <h2>{question.category}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["en", "ko"].map(language => {
                  const translationKey = `${question.id}-${language}`;
                  const existingTranslation = translations[translationKey];
                  const defaultValues = existingTranslation ? existingTranslation : {
                    content: "",
                    category: "",
                    messages: Array(5).fill("")
                  };

                  return (
                    <div className="flex flex-col gap-3" key={language}>
                      <span>{language.toUpperCase()}</span>
                      <TranslationForm
                        onSubmit={(data:any) => handleTranslationSubmit(question.id, language, data)}
                        defaultValues={defaultValues}
                        questionId={question.id}
                        language={language}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PreviewSurvey;
