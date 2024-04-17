import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/interfaces";
// import Image from "next/image";
import { Card } from "@/components/metronic/card/card";
import Image from "@/components/ui/image";
import Link from "next/link";
export default function ProjectListItem({
  details,
  lang,
}: {
  details: Project;
  lang: any;
}) {
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Link href={`/project/${details.id}`}>
    <Card className="flex flex-col items-start w-full p-[30px] gap-10 hover:scale-[0.98] transition-transform duration-200">
      <div className="flex flex-row justify-between items-center gap-3 w-full ">
        <figure className="overflow-hidden shrink-0 relative object-scale-down w-[50px] h-[50px] rounded-sm aspect-square flex justify-center items-center bg-background-layer-2">
          <Image
            src={`https://ipfs.io/ipfs/${details.image}`}
            alt={`Project ${details.name}`}
            width={50}
            height={50}
          />
        </figure>
        <div>{details.scope && <Badge variant={"success"}>{details.scope}</Badge>}</div>
      </div>

      <div className="flex flex-col gap-2.5">
        <h5 className="text-sm">{details.name}</h5>
        <span
          className="h-[64px] overflow-auto block w-fit  text-gray-600 text-2sm  text-wrap"
        >
          {details.description}
        </span>
      </div>

      <div className="flex overflow-scroll w-full gap-3">
        {details.tags &&
          details.tags?.map((tag: any) => (
            <Badge
              key={tag}
              variant={"success"}
            >
              {tag}
            </Badge>
          ))}

        {!details.tags && (
          <Badge
            variant="info"
          >
            No Category
          </Badge>
        )}
      </div>
    </Card>
  </Link>
  );
}
