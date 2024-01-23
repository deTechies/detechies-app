"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/interfaces";
import { beginEndDates } from "@/lib/utils";
import { ChevronDown, ChevronUp, PenSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

  const detailDescriptionRef = useRef<any>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // 높이 설정
    const updateHeight = () => {
      if (detailDescriptionRef.current) {
        setHeight(detailDescriptionRef.current.offsetHeight);
      }
    };

    // 컴포넌트 마운트 시 높이 측정
    updateHeight();

    // 윈도우 리사이즈 이벤트에 대응
    window.addEventListener("resize", updateHeight);

    // 클린업 함수
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

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
            width={100}
            height={100}
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
                    <div className="truncate">{tag}</div>
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

        <div className="relative">
          <div
            className={`text-body_m ${showFull ? "" : "line-clamp-3"}`}
            dangerouslySetInnerHTML={{ __html: details.description }}
          ></div>
          
          <div
            ref={detailDescriptionRef}
            className="absolute top-0 left-0 right-0 invisible opacity-0 pointer-events-none select-none text-body_m"
            dangerouslySetInnerHTML={{ __html: details.description }}
          ></div>
        </div>

        {height > 72 && (
          <button
            onClick={() => {
              setShowFull(!showFull);
            }}
            className="flex items-center gap-1 mx-auto text-label_m text-text-secondary w-fit"
          >
            {showFull
              ? lang.project.details.summary.hide
              : lang.project.details.summary.show_more}
            {showFull ? <ChevronUp size="20" /> : <ChevronDown size="20" />}
          </button>
        )}
      </div>
    </Card>
  );
}
