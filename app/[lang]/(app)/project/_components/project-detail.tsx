"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/interfaces";
import { ChevronDown, ChevronUp } from "lucide-react";
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
        <div className="flex flex-col gap-4">
          <h1 className="text-heading_s">{data.name}</h1>

          {/* category */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center text-label_l text-text-secondary ">
              <span className="text-label_l">{details?.category}</span>
              <span>|</span>
              <span>{lang.list.project_type[details.type]}</span>
            </div>

            <div className="flex gap-1 items-center text-label_l text-text-secondary">
              <span>{details?.begin_date}</span>
              <span> ~ </span>
              <span>{details.end_date}</span>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
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
            <Link href={`/project/${details.id}/edit`} className=" items-end flex-end right-0">
              <Badge>
                  Edit
              </Badge>
            </Link>
          )
        }
      </header>

      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between items-center">
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
            className="text-label_m text-text-secondary flex gap-2 items-center w-fit mx-auto"
          >
            {showFull ? lang.details.hide : lang.details.show_more}
            {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
          </button>
        )}
      </div>
    </Card>
  );
}
