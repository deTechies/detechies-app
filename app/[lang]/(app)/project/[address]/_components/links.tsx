import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { File } from "lucide-react";
import Link from "next/link";

const Links = ({ works }: { works: any[] }) => {
  if (!works) return <></>;
  return (
    <div className="flex flex-col">
      {works &&
        works.map((work, index) => {
          if (work.type === "file") {
            return (
              <Link
                key={index}
                href={`https://ipfs.io/ipfs/` + work.link}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <div className="flex items-center gap-4 py-4 border-b-2 border-border-div hover:text-text-secondary overflow-auto">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-background-layer-2 p-2">
                    <File className="text-text-primary" />
                  </div>

                  <div className="truncate text-title_s overflow-auto">{work.name}</div>
                </div>
              </Link>
            );
          }
          const site = getSiteFromLink(work.link);
          return (
            <Link
              key={index}
              className="flex items-center gap-4 py-3 border-b-2 border-border-div hover:text-text-secondary overflow-auto"
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-background-layer-2 p-2">
                {site === "unknown" ? (
                  <File className="text-text-primary" />
                ) : (
                  <Avatar>
                    <AvatarImage
                      src={`/icons/${site}.png`}
                      className=" scale-down h-5 w-5 m-auto"
                    />
                  </Avatar>
                )}
              </div>
              <div className="flex flex-col gap-1">
              <span className="truncate text-title_s">{work.name}</span>
              <span className="truncate text-label_s">{work.link}</span>
                
              </div>
            </Link>
          );
        })}
    </div>
  );
};

const getSiteFromLink = (link: string): string => {
  if (link.includes("github.com")) return "github";
  if (link.includes("dribbble.com")) return "dribbble";
  if (link.includes("figma.com")) return "figma";
  if (link.includes("google.com")) return "google";
  if (link.includes("ipfs.io")) return "ipfs";
  return "unknown";
};

export default Links;
