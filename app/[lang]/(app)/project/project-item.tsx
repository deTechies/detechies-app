import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/interfaces";
import { Locale } from "@/i18n.config";
import Image from "next/image";
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
    <Link
      href={`/project/${details.id}`}
      className="flex flex-row items-start gap-5 pb-8 rounded-md bg-background-layer-1 pt-7 px-7 hover:shadow-lg "
    >
      <figure className="relative object-scale-down w-32 rounded-sm aspect-square bg-accent-secondary">
        <Image
          src={`https://ipfs.io/ipfs/${details.image}`}
          alt={`Project ${details.name}`}
          fill={true}
          className="rounded-sm"
        />
      </figure>

      <section className="flex flex-col w-full gap-4 grow">
        <header className="flex items-center justify-between capitalize">
          <h5 className="text-title_m text-text-primary">{details.name}</h5>

          {details.scope === "private" ? (
            <Badge className="py-2 px-2.5" variant="tertiary">
              {lang.privacy_type.private}
            </Badge>
          ) : details.scope === "group" ? (
            <Badge className="py-2 px-2.5" variant="info">
              {lang.privacy_type.group}
            </Badge>
          ) : null}
        </header>

        <section className="space-x-2 divide-x text-text-secondary text-label_m">
          <span>{lang.project_type[details.type]}</span>
        </section>

        <div>
          <p
            className="text-text-secondary text-body_s line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: details.description
                ? details.description
                : "No introduction yet.",
            }}
          ></p>
        </div>

        <div className="flex gap-3 justify-self-end">
          {details.tags &&
            details.tags?.map((tag) => (
              <Badge
                key={tag}
                className="bg-transparent border-border-input border text-text-placeholder py-2 px-2.5"
              >
                {tag}
              </Badge>
            ))}
        </div>
      </section>
    </Link>
  );
}
