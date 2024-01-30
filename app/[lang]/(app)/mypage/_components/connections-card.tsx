"useClient";

import React from 'react'
import Image from 'next/image'
import { useDictionary } from '@/lib/dictionaryProvider';

interface IConnectionCardProps {
    key: number | string;
    logoSrc: string;
    logoAlt: string;
    label: string;
    sublabel: string | null | undefined;
}

const ConnectionCard = ({key, logoSrc, logoAlt, label, sublabel}: IConnectionCardProps) => {
    const dictionary = useDictionary();

    return (
        <div
        key={key}
        className={`flex w-[209px] border border-border-div rounded-sm p-4 pb-5 gap-4`}
        >
        <div className="flex justify-center relative aspect-square w-[48px] h-[48px] rounded-full ">
        <Image src={logoSrc} fill={true} sizes={"48"} alt={logoAlt} className="aspect-square"/>
        </div>
        <div className="flex flex-col justify-center gap-2">
        <p className="text-title_s">{label}</p>
        <p className="text-label_s text-text-secondary break-all">{sublabel}</p>
        </div>
    </div>
    )
}

export default ConnectionCard