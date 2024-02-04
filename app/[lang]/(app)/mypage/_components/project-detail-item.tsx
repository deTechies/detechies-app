import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProjectDetailItemData {
  link: string;
  image: string;
  description: string;
  role: string;
  type: string;
  contribution: string;
  tags: string[];
  title: string;
  begin_date: string;
  end_date: string;
  work_name: string;
}

interface ProjectDetailItemProps {
  data: ProjectDetailItemData;
  lang: any;
}

export default function ProjectDetailItem({
  data,
  lang,
}: ProjectDetailItemProps) {
  return (
    <Link href={`${data.link}`} >
      <Card >
      <div className="flex w-full gap-5">
        <figure className="relative bg-background-layer-2 w-20 h-20 aspect-square rounded-[6px] flex justify-center items-center">
          <Image
            src={`https://ipfs.io/ipfs/`+data.image}
            alt="Project Image"
            objectFit="cover"
            className="rounded-sm"
            width={80}
            height={80}
          />
        </figure>

        <div className="flex gap-4 grow">
          <div className="flex flex-col gap-4 grow shrink">
            <header className="flex flex-wrap items-center justify-between gap-3">
              <h5 className="text-title_m">
                {data.title}
              </h5>

              <div className="flex items-center gap-3 shrink-0">
              <Badge>{lang?.evaluation} (0)</Badge>
              </div>
            </header>
              <div className="flex flex-col flex-wrap gap-5">
                <div className="flex flex-col items-start justify-start gap-4 md:flex-row text-text-secondary">
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="divide-x shrink-0">
                      <span className="pr-2 capitalize text-label_m">
                        {" "}
                        {data?.role &&
                          lang?.interface?.profession_type[data?.role]}
                      </span>
                      <span className="pl-2 text-label_m shrink-0">
                        {data.contribution}%
                      </span>
                    </div>
                    <span className="text-label_m shrink-0">
                      {formatDate(data.begin_date)} ~{" "}
                      {data.end_date ? formatDate(data.end_date) : "Present"}
                    </span>
                  </div>

                  <div className="grow line-clamp-3">
                    <span className="text-label_m">{data.description}</span>
                  </div>
                </div>

                <div className="inline-flex flex-wrap items-start justify-start gap-2">
                  {data.tags?.length > 0 &&
                    data.tags.map((tag: string, index: number) => (
                      <Badge variant="secondary" shape="outline_sm" key={index}>
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
