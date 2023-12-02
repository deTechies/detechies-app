import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Links = ({ links }: { links: string[] }) => {
  if (!links) return <></>;
  return (
    <div className="flex flex-col space-y-4">
      {links &&
        links.map((link, index) => {
          const site = getSiteFromLink(link);
          return (
            <Link
              key={index}
              className="flex gap-4 items-center border-b-2 border-border-div pb-4 hover:text-accent-primary"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rounded-full bg-background-layer-2 h-8 w-8 items-center">
                <Avatar>
                  <AvatarImage src={`/icons/${site}.png`} className="scale-down h-7 w-7 p-1"/>
                  <AvatarFallback>
                    <ExternalLink size="16" />
                  </AvatarFallback>
                </Avatar>
              </div>
              {link}
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
