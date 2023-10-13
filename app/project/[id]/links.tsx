import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  links: string[];
};

const Links: React.FC<Props> = ({ links }) => {
  return (
    <div className="flex space-x-4">
      {links.map((link, index) => {
        const site = getSiteFromLink(link);
        return (
          <Link key={index} href={link} target="_blank" rel="noopener noreferrer">
            <Image src={`/icons/${site}.png`} alt={site} className="w-6 h-6 opacity-75 hover:opacity-100" width={16} height={16} />
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
