import { ProjectWork } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";

export default function ProjectWorkDetail({ data }: { data: ProjectWork }) {
  return (
    <main className="flex gap-6 text-text-secondary my-2">
      <div className="flex flex-col gap-2">
        <div className="divide-x">
          <span className="text-label_m capitalize pr-2">{data.name}</span>
          <span className="pl-2 text-label_m">{data.percentage} %</span>
        </div>
        <span className="text-label_m">
          {formatDate(data.begin_date)} ~ {" "}
          {data.end_date ? formatDate(data.end_date) : "Present"}
        </span>
      </div>
      <div className="grow">
        <span className="text-label_m">{data.description}</span>
      </div>
    </main>
  );
}
