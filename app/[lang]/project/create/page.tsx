"use client";

import GithubSignIn from "@/components/connections/github/github-signin";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Editor } from "novel";

import { useState } from "react";

export default function CreateProjectFlow() {
  const [description, setDescription] = useState<any>("");
  //we want to check if the user is logged in with github
  
  
  return (
    <div className="flex flex-row gap-8 items-center justify-center">
      <div className="w-full">
        
      <GithubSignIn />
</div>
<div className="flex flex-col gap-8 items-center justify-center">
<Input
          name="title"
          placeholder="Project name"
          />
      <Card className="w-[60vw] h-[40vh] overflow-auto ">
        
        <Editor 
        className="border-none m-0 w-full"
        defaultValue={description?.content || undefined}
        onUpdate={(editor) => {
          setDescription((prev:any) => ({
            ...prev,
            content: editor?.storage.markdown.getMarkdown(),
          }));
        }}
        />
      </Card>
      <Button>
        Testing
      </Button>
      <p>
        {JSON.stringify(description.content, null, 2)}
      </p>
</div>
    
    </div>
  );
}
