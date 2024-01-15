import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/interfaces";
import { Locale } from "@/i18n.config";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      className="flex flex-row items-start w-full gap-5 pb-8 truncate rounded-md bg-background-layer-1 pt-7 px-7 hover:shadow-lg "
    >
      <figure className="shrink-0 relative object-scale-down w-[100px] h-[100px] rounded-sm aspect-square bg-accent-secondary">
        <Image
          src={`https://ipfs.io/ipfs/${details.image}`}
          alt={`Project ${details.name}`}
          fill={true}
          className="rounded-sm"
        />
      </figure>

      <section className="flex flex-col w-full gap-4 truncate grow">
        <header className="flex items-start justify-between capitalize">
          <div>
            <h5 className="mb-4 text-title_m text-text-primary">
              {details.name}
            </h5>

            <div className="text-text-secondary text-label_m">
              {lang.interface.project_type[details.type] || details.type}
            </div>
          </div>

          {details.scope === "private" ? (
            <Badge shape="sm" variant="purple">
              {lang.project.list.privacy_type.private}
            </Badge>
          ) : details.scope === "group" ? (
            <Badge shape="sm" variant="info">
              {lang.project.list.privacy_type.group}
            </Badge>
          ) : null}
        </header>

        <div>
          <p
            className="truncate text-text-secondary text-body_s"
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
                shape="outline"
                variant="placeholder"
                className="text-label_s"
              >
                {tag}
              </Badge>
            ))}

          {!details.tags && (
            <Badge
              shape="outline"
              variant="placeholder"
              className="text-label_s"
            >
              No Category
            </Badge>
          )}
        </div>
      </section>
    </Link>
  );
}
