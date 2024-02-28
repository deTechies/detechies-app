import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { addURL, beginEndDates } from "@/lib/utils";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { Project } from "@/lib/interfaces";
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
  data: Project;
  lang: any;
}

export default function ProjectDetailItem({
  data,
  lang,
}: ProjectDetailItemProps) {

  return (
    <Link href={`/project/${data.id}`}>
      <Card>
        <div className="flex flex-col w-full gap-5">
          <div className="flex justify-between">
          <figure className="relative bg-background-layer-2 w-14 h-14 aspect-square overflow-hidden shrink-0 rounded-[6px] flex justify-center items-center">
            <Image
              src={addURL(data.image)}
              alt="Project Image"
              width={80}
              height={80}
              className="block object-contain"
            />
          </figure>
          <div>
            <Badge variant={"info"} className="mt-2">
              {data.scope}
            </Badge>
          </div>
          </div>

          <div className="flex gap-4 grow">
            <div className="flex flex-col gap-2 grow shrink">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <h5 className="text-title_m">{data.name}</h5>
                <div className="break-all text-label_m whitespace-break-spaces\">
                  <span>{data.description}</span>
                </div>

                {/* <div className="flex items-center gap-3 shrink-0">
              <Badge>{lang?.mypage.project.evaluation} (0)</Badge>
              </div> */}
              </header>
              <div className="flex flex-col flex-wrap gap-5">
                <div className="flex flex-col flex-wrap items-start justify-start gap-4 md:flex-row text-text-secondary">
                  <div className="flex flex-col items-start justify-start gap-2 shrink-0 min-w-[15rem]">
                    <div className="divide-x shrink-0 text-label_m">
                      <span className="pr-2 capitalize">
                        {" "}
                        {(data?.type &&
                          lang?.interface?.project_type[data?.type]) ||
                          "Unknown"}
                      </span>

                      <span className="pl-2 text-label_m shrink-0">
                        {beginEndDates(data.begin_date, data.end_date)}
                      </span>
                    </div>
                  </div>
                </div>

          
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
