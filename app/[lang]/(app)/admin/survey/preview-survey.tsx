import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { postServer } from "@/lib/data/postRequest";
import TranslationForm from "./form/translation-form";

interface TranslationData {
  content: string;
  category: string;
  language: string;
  messages: string[];
}

interface TranslationsState {
  [key: string]: TranslationData;
}

export function PreviewSurvey({ selected, setSelected }: any) {
  const [translations, setTranslations] = useState<TranslationData[]>([]);

  const handleTranslationSubmit = async (
    questionId: string,
    language: string,
    data: TranslationData
  ) => {


    const formData = JSON.stringify({
      content: data.content,
      category: data.category,
      messages: data.messages[0],
      language: language,
    });
    const result = await postServer(
      `/question/${questionId}/translations/${language}`,
      formData
    );
    setTranslations((prev) => ({
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

          {selected.questions.map((question: any, index: number) => (
            <div key={index}>
              <div className="my-4 grid grid-cols-3">
                <h1>{question.content}</h1>
                <h2>{question.id}</h2>
                <h2>{question.category}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["en", "ko"].map((language) => {
                  const translationKey = `${question.id}-${language}`;
                  const existingTranslation = question.translations?.find(
                    (translation: any) => translation.language === language
                  );
                
                 
                  const defaultValues = existingTranslation
                    ? existingTranslation
                    : {
                        content: "",
                        category: "",
                        messages: Array(5).fill(""),
                      };
             /*          
                      if(language == "ko"){
                        defaultValues.messages = question.messages;
                        defaultValues.category = question.category;
                        defaultValues.content = question.content;
                        
                      } */

                  if (existingTranslation && existingTranslation.messages) {
                    console.log(existingTranslation.messages)
                    //defaultValues.messages = existingTranslation.messages[0].split(",");
                    //defaultValues.messages = existingTranslation.messages[0];
                    //console.log(defaultValues.messages)
                  }


                  return (
                    <div className="flex flex-col gap-3" key={language}>
                      <span>{language.toUpperCase()}</span>
                      <TranslationForm
                        onSubmit={(data: any) =>
                          handleTranslationSubmit(question.id, language, data)
                        }
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
