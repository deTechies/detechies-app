
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  links: string[];
};

const Links: React.FC<Props> = ({ links }) => {
  return (
    <div className="flex space-x-4">
      {links && links.map((link, index) => {
        const site = getSiteFromLink(link);
        return (
          <Link key={index} href={link} target="_blank" rel="noopener noreferrer" className="rounded-full bg-background-layer-2 h-8 w-8 items-center">
            <Avatar>
              <AvatarImage src={`/icons/${site}.png`} />
              <AvatarFallback>
                <ExternalLink size="16"/>
              </AvatarFallback>
              </Avatar>

          </Link>
        );
      })}
    </div>
  );
};

const getSiteFromLink = (link: string): string => {
  if (link.includes('github.com')) return 'github';
  if (link.includes('dribbble.com')) return 'dribbble';
  if (link.includes('figma.com')) return 'figma';
  if (link.includes('google.com')) return 'google';
  if (link.includes('ipfs.io')) return 'ipfs';
  return 'unknown';
};

export default Links;
