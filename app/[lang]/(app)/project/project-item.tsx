import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ProjectItemProps } from "./page";

const DEFAULT_DESCRIPTION = "Random description";

export default function ProjectItem({
  details,
}: {
  details: ProjectItemProps;
}) {
  return (
    <Link
      href={`/project/${details.id}`}
      className="grid grid-cols-4 row gap-6 bg-background-layer-1 rounded-md p-4 items-center hover:shadow-lg border border-border-div"
    >
      <figure className="col-span-1 relative min-w-24 w-full border border-border-div  aspect-square rounded-sm bg-accent-secondary object-scale-down">
        <Image
          src={`https://ipfs.io/ipfs/${details.image}`}
          alt={`Project ${details.name}`}
          fill={true}
        />
      </figure>
      <section className="col-span-3 flex flex-col gap-3 my-2 w-full">
        <header className="flex justify-between items-center capitalize">
          <h5 className="text-xl text-text-primary font-medium">
            {details.name}
          </h5>   
        </header>
        <div>
            <Badge>{details.type}</Badge>
        </div>
        <div>
          <p className="text-text-secondary">{details.description}</p>
        </div>
      </section>
    </Link>
  );
}
