"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { updateProject } from "@/lib/data/project";
import { Project } from "@/lib/interfaces";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProjectDetail({
  details,
  userRole,
}: {
  details: Project;
  userRole: string;
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

    if (data.content != details.description || data.name != details.name) {
      //save the data.
      const result = await updateProject(details.id, data.name, data.content);

      console.log(result);
    }
  };

  console.log(details);

  return (
    <Card className="w-full pt-8 px-8 gap-8 pb-5">
      <header className="flex gap-9 items-start ">
        <Image
          src={`${
            details.image
              ? "https://ipfs.io/ipfs/" + details.image
              : "/images/no-item.png"
          }`}
          width={100}
          height={100}
          className="rounded-[6px] bg-accent-secondary max-h-[100px]"
          alt="project_image_holder"
        />
        <div className="flex flex-col gap-4 grow">
          <div className="flex justify-between gap-3">
            {editing ? (
              <Input
                type="text"
                className="w-full py-1 text-2xl font-medium"
                defaultValue={details.name}
                onChange={(e) => {
                  setData((prev: any) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            ) : (
              <h1 className="text-heading_s">{data.name}</h1>
            )}

            {/* {userRole == "admin" && (
              <Button
                size={"sm"}
                variant={"secondary"}
                className={"h-8 px-2.5 py-1.5"}
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                Edit
              </Button>
            )} */}
          </div>

          {/* category */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center text-label_l text-text-secondary ">
              <span className="text-label_l">{details?.category}</span>
              <span>|</span>
              <span>{details.type}</span>
            </div>

            <div className="flex gap-1 items-center text-label_l text-text-secondary">
              <span>{details?.begin_date}</span>
              <span> ~ </span>
              <span>{details.end_date}</span>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            {/* After the category data is converted to an array, I will edit it. */}
            <Badge className="bg-transparent border border-accent-primary text-accent-primary py-2 px-2.5">
              {details.category}
            </Badge>
          </div>
        </div>
      </header>

      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3 className="text-subhead_l ">Project Description</h3>
        </div>

        <div className={`overflow-hidden ${showFull ? "" : "max-h-[100px]"}`}>
          <div
            className="text-body_m"
            dangerouslySetInnerHTML={{ __html: details.description }}
          ></div>
        </div>

        {details.description.length > 200 && (
          <button
            onClick={() => {
              setShowFull(!showFull);
            }}
            className="text-label_m text-text-secondary flex gap-2 items-center w-fit mx-auto"
          >
            {showFull ? "hide" : "show more"}
            {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
          </button>
        )}
      </div>
    </Card>
  );
}
