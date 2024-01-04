"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/interfaces";
import { ChevronDown, ChevronUp, PenSquare, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function ProjectDetail({
  details,
  userRole,
  lang,
}: {
  details: Project;
  userRole: string;
  lang: any;
}) {
  const [data, setData] = useState<any>({
    content: details.description,
    name: details.name,
  });
  const [showFull, setShowFull] = useState(false);

  console.log("TEST!");
  console.log(details);

  return (
    <Card className="w-full gap-8 px-8 pt-8 pb-5">
      <header className="flex items-start gap-9 ">
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
        <div className="flex flex-col gap-4">
          <h1 className="text-heading_s">{data.name}</h1>
          {/* category */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 text-label_l text-text-secondary ">
            </div>

            <div className="flex items-center gap-1 text-label_l text-text-secondary">
              <span>{details?.begin_date}</span>
              <span> ~ </span>
              <span>{details.end_date}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {details.tags &&
            details.tags?.map((tag) => (
              <Badge
                key={tag}
                className="bg-transparent border border-accent-primary text-accent-primary py-2 px-2.5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {
          details.userRole == 'admin' && (
            <Link href={`/project/${details.id}/edit`} className="ml-auto">
              <Button
                variant="secondary"
                className="cursor-pointer text-sm font-normal py-2 px-4"
              >
                Edit
                <PenSquare size={16} className="inline-block ml-2" />
              </Button>
            </Link>
          )
        }
      </header>

      <div className="flex flex-col w-full gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-subhead_l ">
            {lang.details.project_description}
          </h3>
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
            className="flex items-center gap-2 mx-auto text-label_m text-text-secondary w-fit"
          >
            {showFull ? lang.details.hide : lang.details.show_more}
            {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
          </button>
        )}
      </div>
    </Card>
  );
}
