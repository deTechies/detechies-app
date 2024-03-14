import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/interfaces";
// import Image from "next/image";
import { Card } from "@/components/metronic/card/card";
import Image from "@/components/ui/image";
import Link from "next/link";
export default function ProjectItem({
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
    <Link href={`/project/${details.id}`} className="hover:border-state-info ">
      <Card className="flex flex-row items-start w-full p-5 gap-5">
        <div className="flex flex-col gap-3 ">
          <figure className="overflow-hidden shrink-0 relative object-scale-down w-[90px] h-[90px] rounded-sm aspect-square flex justify-center items-center">
            <Image
              src={`https://ipfs.io/ipfs/${details.image}`}
              alt={`Project ${details.name}`}
              width={100}
              height={100}
              className="object-contain"
            />
          </figure>
          {details.scope === "private" ? (
            <Badge shape="sm" variant="purple">
              {lang.interface.privacy_type.private}
            </Badge>
          ) : details.scope === "group" ? (
            <Badge shape="sm" variant="info">
              {lang.interface.privacy_type.group}
            </Badge>
          ) : (
            <Badge className="text-label_s  bg-state-success mx-auto">Public</Badge>
          )}
        </div>

        <section className="flex flex-col w-full gap-2 truncate grow">
          <header className="flex items-start justify-between capitalize">
            <div>
              <h5 className="text-title_m text-text-primary">{details.name}</h5>
            </div>
          </header>

          <div>
            <span
              className="h-[64px] overflow-auto block w-full text-text-secondary text-body_s whitespace-normal"
              dangerouslySetInnerHTML={{
                __html: details.description
                  ? details.description
                  : "No introduction yet.",
              }}
            ></span>
          </div>

          <div className="flex overflow-scroll gap-3 justify-self-end">
            {details.tags &&
              details.tags?.map((tag) => (
                <Badge
                  key={tag}
                  shape="outline"
                  variant="placeholder"
                  className="text-label_s rounded-sm"
                >
                  {tag}
                </Badge>
              ))}

            {!details.tags && (
              <Badge
                shape="outline"
                variant="placeholder"
                className="text-label_s rounded-sm"
              >
                No Category
              </Badge>
            )}
          </div>
        </section>
      </Card>
    </Link>
  );
}
