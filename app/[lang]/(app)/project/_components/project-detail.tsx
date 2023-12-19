"use client";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/interfaces";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProjectDetail({ details }: { details: Project }) {
  const [data, setData] = useState<any>({
    content: details.description,
    name: details.name,
  });
  const [showFull, setShowFull] = useState(false);

  return (
    <Card className="w-full p-8">
      <header className="flex gap-8 items-start ">
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
        <div className="flex flex-col gap-2">
          <h1 className="text-heading_s mb-2">{data.name}</h1>

          <div className="flex gap-4 items-center text-label_l text-text-secondary ">
            <span className="text-label_l">{details?.category}</span>
            <span>|</span>
            <span>{details.scope}</span>
          </div>
          <div className="flex gap-1 items-center text-label_l text-text-secondary">
            <span>{details?.begin_date}</span>
            <span> ~ </span>
            <span>{details.end_date}</span>
          </div>
        </div>
      </header>
      <div className="w-full flex flex-col gap-2 mt-8">
        <div className="flex justify-between mb-5 items-center">
          <h3 className="text-subhead_l ">Project Description</h3>
        </div>

        <div className={`overflow-hidden ${showFull ? "" : "max-h-[100px]"}`}>
          <div
            className="text-body_m"
            dangerouslySetInnerHTML={{ __html: details.description }}
          ></div>
        </div>
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
    </Card>
  );
}
