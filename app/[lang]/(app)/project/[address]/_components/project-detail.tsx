"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project } from "@/lib/interfaces";
import { ChevronDown, ChevronUp, PenSquare, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { beginEndDates } from "@/lib/utils";


export default function ProjectDetail({
  details,
  lang,
}: {
  details: Project;
  lang: any;
}) {
  const [data, setData] = useState<any>({
    content: details.description,
    name: details.name,
  });

  const [showFull, setShowFull] = useState(false);

  return (
    <Card className="w-full gap-8 px-8 pt-8 pb-5">
      <header className="flex items-start gap-9">
        <Avatar className="rounded-[6px] w-[100px] h-[100px] mb-2 aspect-square bg-state-info-secondary">
          <AvatarImage
            src={`${
              details.image
                ? "https://ipfs.io/ipfs/" + details.image
                : "/images/no-item.png"
            }`}
            alt="project_image_holder"
          />

          <AvatarFallback className="relative">
            <Image
              src="/images/careerzen.png"
              alt="no-item"
              fill={true}
              className="object-contain bg-no-repeat"
            />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-4 grow">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-heading_s">{data.name}</h1>

            {details.userRole == "admin" && (
              <Link
                href={`/project/${details.id}/edit`}
                className="ml-auto shrink-0"
              >
                <Button variant="secondary" size="sm">
                  <span className="mr-2">
                    {lang.project.details.summary.edit}
                  </span>
                  <PenSquare size={16} className="inline-block " />
                </Button>
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 text-label_l text-text-secondary">
              {lang.interface.project_type[details.type]}
            </div>

            <div className="flex items-center gap-1 text-label_l text-text-secondary">
              {beginEndDates(details.begin_date, details?.end_date)}
            </div>
          </div>

          {details.tags && details.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {details.tags &&
                details.tags?.map((tag) => (
                  <Badge key={tag} shape="outline" variant="accent">
                    {tag}
                  </Badge>
                ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col w-full gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-subhead_l ">
            {lang.project.details.summary.desc}
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
            {showFull
              ? lang.project.details.hide
              : lang.project.details.show_more}
            {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
          </button>
        )}
      </div>
    </Card>
  );
}
