"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateProject } from "@/lib/data/project";
import Image from "next/image";
import { Editor } from "novel";
import { useState } from "react";
import { ProjectDetailProps } from "./page";

export default function ProjectDetail({
  details,
}: {
  details: ProjectDetailProps;
}) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState<any>({
    content: details.description,
    name: details.name,
  });
  const [showFull, setShowFull] = useState(false);

  const startSaving = async () => {
    setEditing(false);
    console.log(data);
    
    if(data.content != details.description || data.name != details.name){
      //save the data.
      const result = await updateProject(
        details.id,
        data.name,
        data.content
      );
      
      console.log(result);
    }
    
  };

  console.log(details);

  return (
    <Card className="w-full ">
      <header className="flex gap-8 items-center ">
        <Image
          src={`${
            details.image
              ? "https://ipfs.io/ipfs/" + details.image
              : "/images/no-item.png"
          }`}
          width={100}
          height={100}
          className="rounded-[6px] bg-accent-secondary"
          alt="project_image_holder"
        />
        <div className="flex flex-col gap-1">
          {editing ? (
            <Input
              type="text"
              className="w-full text-3xl font-medium"
              defaultValue={details.name}
              onChange={(e) => {
                setData((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          ) : (
            <h1 className="text-3xl font-medium">{data.name}</h1>
          )}

          <div className="flex gap-4 items-center ">
            <Badge>{details.type}</Badge>
            <span>{details.created_at}</span>
          </div>
        </div>
      </header>
      <div className="mt-4 w-full flex flex-col gap-4">
        {details.isCreator && (
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Stop" : "Edit"}
            </Button>
            <Button size={"sm"} onClick={startSaving}>
              Save
            </Button>
          </div>
        )}

        {editing ? (
          <Editor
            defaultValue={
              details.description ? details.description : "No introduction yet."
            }
            storageKey={details.name + "_introduction"}
            onUpdate={(editor) => {
              setData((prev: any) => ({
                ...prev,
                content: editor?.getHTML(),
              }));
            }}
          />
        ) : (
          <div className={`overflow-hidden ${showFull ? '' : 'max-h-[100px]'}`}>
            <div
              dangerouslySetInnerHTML={{
                __html: data.content ? data.content : "No introduction yet.",
              }}
            ></div>
          </div>
        )}
      </div>
      
      <Button variant={"ghost"}
        onClick={() => {
          setShowFull(!showFull)
        }}
      >{showFull? 'hide': 'show more'}</Button>
    </Card>
  );
}
