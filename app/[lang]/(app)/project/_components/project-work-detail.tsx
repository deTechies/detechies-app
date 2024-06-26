import { Badge } from "@/components/ui/badge";
import { ProjectWork } from "@/lib/interfaces";
import { beginEndDates, formatDate } from "@/lib/utils";

export default function ProjectWorkDetail({
  data,
  showTags = true,
  lang,
}: {
  data: ProjectWork;
  showTags?: boolean;
  lang?: any;
}) {
  if (!data) return null;

  return (
    <>
      <div className="inline-flex flex-wrap items-start justify-start gap-4 md:flex-nowrap text-text-secondary">
        <div className="inline-flex flex-col items-start justify-start gap-2 min-w-[15rem]">
          <div className="divide-x shrink-0 text-label_m">
            <span className="pr-2 capitalize">
              {" "}
              {(data?.role && lang?.interface?.profession_type[data?.role]) ||
                "Unknown"}
            </span>

            <span className="pl-2 shrink-0">
              {lang.project.details.members.contribution} {data.percentage || 0}
              %
            </span>
          </div>

          <span className="text-label_m">
            {beginEndDates(data.begin_date, data.end_date)}
          </span>
        </div>
      </div>

      <div className="break-all whitespace-break-spaces text-label_m">
        <span>{data.description}</span>
      </div>

      <div className="inline-flex flex-wrap items-start justify-start gap-2">
        {showTags &&
          data.tags?.length > 0 &&
          data.tags.map((tag: string, index: number) => (
            <Badge
              variant="secondary"
              shape="outline"
              className="text-text-placeholder"
              key={index}
            >
              {tag}
            </Badge>
          ))}
      </div>
    </>
  );
}

export function BlurredProjectWorkDetail() {
  return (
    <main className="flex gap-6 my-2 text-text-secondary">
      <div className="flex flex-col gap-2">
        <div className="divide-x">
          <span className="pr-2 capitalize text-label_m blur">Development</span>
          <span className="pl-2 text-label_m blur">50 %</span>
        </div>
        <span className="text-label_m blur">
          {formatDate(Date.now().toString())} ~{" "}
          {formatDate(Date.now().toString())}
        </span>

        <div>
          <Badge variant="secondary" className="blur">
            Dev Ops
          </Badge>
          <Badge variant="secondary" className="blur">
            Backend
          </Badge>
          <Badge variant="secondary" className="blur">
            Fullstack
          </Badge>
        </div>
      </div>
      <div className="grow">
        <span className="text-label_m blur">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </span>
      </div>
    </main>
  );
}
