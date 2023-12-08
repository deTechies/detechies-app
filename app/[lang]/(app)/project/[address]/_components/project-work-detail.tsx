import { ProjectWork } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";

export default function ProjectWorkDetail({ data }: {data: ProjectWork}) {
  return (
    <main className="grid grid-cols-3 gap-4 text-text-secondary text-body_s ">
      <div>
        <div>
          <span>{data.name}</span>
          <span>{data.percentage}</span>
        </div>
        <span>
          { formatDate(data.begin_date)} ~ {data.end_date ? formatDate(data.end_date) : 'Present' }
        </span>
      </div>
      <div className="col-span-2">
        <span>{data.description}</span>
      </div>
    </main>
  );
}
