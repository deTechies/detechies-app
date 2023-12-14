import Image from "next/image";
import Link from "next/link";
import { ProjectItemProps } from "./page";
import { Badge } from "@/components/ui/badge";

export default function ProjectItem({
  details,
}: {
  details: ProjectItemProps;
}) {
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Link
      href={`/project/${details.id}`}
      className="flex flex-row gap-5 bg-background-layer-1 rounded-md pt-7 px-7 pb-8 items-start hover:shadow-lg "
    >
      <figure className="relative w-32  aspect-square rounded-sm bg-accent-secondary object-scale-down">
        <Image
          src={`https://ipfs.io/ipfs/${details.image}`}
          alt={`Project ${details.name}`}
          fill={true}
          className="rounded-sm"
        />
      </figure>

      <section className="grow flex gap-4 flex-col w-full">
        <header className="flex justify-between items-center capitalize">
          <h5 className="text-title_m text-text-primary">{details.name}</h5>

          {/* <Badge className="bg-state-info-secondary text-state-info py-2 px-2.5">
            Group
          </Badge> */}
        </header>

        <section className="space-x-2 divide-x text-text-secondary text-body_s">
          <span>{details.type}</span>
        </section>

        <div>
          <p
            className="text-text-secondary  text-body_s line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: details.description
                ? details.description
                : "No introduction yet.",
            }}
          ></p>
        </div>

        <div className="flex gap-3">
          {/* category should come in the form of an array. */}
          <Badge className="bg-transparent border-border-input border text-text-placeholder py-2 px-2.5">
            {details.category}
          </Badge>
        </div>
      </section>
    </Link>
  );
}
