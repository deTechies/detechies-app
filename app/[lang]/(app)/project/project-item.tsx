import Image from "next/image";
import Link from "next/link";
import { ProjectItemProps } from "./page";


export default function ProjectItem({
  details,
}: {
  details: ProjectItemProps;
}) {
  
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <Link
      href={`/project/${details.id}`}
      className="flex flex-row gap-6 bg-background-layer-1 rounded-md px-4 py-3 items-center hover:shadow-lg "
    >
      <figure className="relative w-32  aspect-square rounded-sm bg-accent-secondary object-scale-down">
        <Image
          src={`https://ipfs.io/ipfs/${details.image}`}
          alt={`Project ${details.name}`}
          fill={true}
          className="rounded-sm"

        />
      </figure>
      <section className="grow flex gap-1 flex-col w-full">
        <header className="flex justify-between items-center capitalize">
          <h5 className="text-title_m text-text-primary">
            {details.name}
          </h5>   
        </header>
        <section className="space-x-2 divide-x text-text-secondary text-body_s">
            <span>{details.type}</span>
            <span className="pl-2">{details.category}</span>
        </section>
        <div>
          <p className="text-text-secondary overflow-hidden text-body_s"  dangerouslySetInnerHTML={{
                __html: details.description ? truncateText(details.description, 50) : "No introduction yet.",
              }}>
                </p>
        </div>
      </section>
    </Link>
  );
}
