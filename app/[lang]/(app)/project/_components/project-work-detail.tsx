import { Badge } from "@/components/ui/badge";
import { ProjectWork } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";

export default function ProjectWorkDetail({ data }: { data: ProjectWork }) {
  if (!data) return null;
  return (
    <>
      <div className="justify-start items-start gap-4 inline-flex text-text-secondary flex-wrap">
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="divide-x">
            <span className="text-label_m capitalize pr-2">{data.name}</span>
            <span className="pl-2 text-label_m">{data.percentage} %</span>
          </div>
          <span className="text-label_m">
            {formatDate(data.begin_date)} ~{" "}
            {data.end_date ? formatDate(data.end_date) : "Present"}
          </span>
        </div>

        <div className="self-stretch grow shrink basis-0 line-clamp-2">
          <span className="text-label_m">{data.description}{data.description}{data.description}{data.description}{data.description}{data.description}</span>
        </div>
      </div>

      <div className="justify-start items-start gap-2 inline-flex flex-wrap">
        <Badge className="px-2.5 py-1.5" variant="ghost">Dev Ops</Badge>
        <Badge className="px-2.5 py-1.5" variant="ghost">Backend</Badge>
        <Badge className="px-2.5 py-1.5" variant="ghost">Fullstack</Badge>
        <Badge className="px-2.5 py-1.5" variant="ghost">Dev Ops</Badge>
        <Badge className="px-2.5 py-1.5" variant="ghost">Backend</Badge>
        <Badge className="px-2.5 py-1.5" variant="ghost">Fullstack</Badge>
      </div>
    </>
  );
}

export function BlurredProjectWorkDetail() {
  return (
    <main className="flex gap-6 text-text-secondary my-2">
      <div className="flex flex-col gap-2">
        <div className="divide-x">
          <span className="text-label_m capitalize pr-2 blur">Development</span>
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
