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
      className="grid grid-cols-4 row gap-6 bg-background-layer-1 rounded-md px-6 py-5 items-center hover:shadow-lg "
    >
      <figure className="col-span-1 relative  min-w-20 border border-border-div  aspect-square rounded-sm bg-accent-secondary object-scale-down">
        <Image
          src={`https://ipfs.io/ipfs/${details.image}`}
          alt={`Project ${details.name}`}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 75vw"

        />
      </figure>
      <section className="col-span-3 flex gap-1 flex-col w-full">
        <header className="flex justify-between items-center capitalize">
          <h5 className="text-xl text-text-primary font-medium">
            {details.name}
          </h5>   
        </header>
        <section className="space-x-2 divide-x font-light text-text-secondary text-body_s">
            <span>{details.type}</span>
            <span className="pl-2">category</span>
        </section>
        <div>
          <p className="text-text-secondary h-12 overflow-hidden text-body_s"  dangerouslySetInnerHTML={{
                __html: details.description ? truncateText(details.description, 200) : "No introduction yet.",
              }}>
                </p>
        </div>
      </section>
    </Link>
  );
}
