import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Links = ({ links }: { links: string[] }) => {
  if (!links) return <></>;
  return (
    <div className="flex flex-col">
      {links &&
        links.map((link, index) => {
          const site = getSiteFromLink(link);
          return (
            <Link
              key={index}
              className="flex items-center gap-4 py-4 border-b-2 border-border-div hover:text-accent-primary"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background-layer-2">
                <Avatar>
                  <AvatarImage src={`/icons/${site}.png`} className="p-1 scale-down h-7 w-7"/>
                  <AvatarFallback>
                    <ExternalLink size="16" />
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="truncate text-title_s">
                {link}
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
