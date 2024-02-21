"use client";

import Image from "next/image";

interface IConnectionCardProps {
  key: number | string;
  logoSrc: string;
  logoAlt: string;
  label: string;
  sublabel: string | null | undefined;
}

const ConnectionCard = ({
  key,
  logoSrc,
  logoAlt,
  label,
  sublabel,
}: IConnectionCardProps) => {
  return (
    <div
      key={key}
      className="flex gap-4 p-4 pb-5 border rounded-sm border-border-div grow"
    >
      <div className="flex justify-center relative aspect-square w-[48px] h-[48px] rounded-full ">
        <Image
          src={logoSrc}
          fill={true}
          sizes={"48"}
          alt={logoAlt}
          className="aspect-square"
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p className="text-title_s">{label}</p>
        <p className="break-all text-label_s text-text-secondary">{sublabel}</p>
      </div>
    </div>
  );
};

export default ConnectionCard;
