import React from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { useDictionary } from '@/lib/dictionaryProvider'
import { Achievement } from '@/lib/interfaces'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface INftCardProps {
    id: string;
    achievement: Achievement
}

export const NftCard = ({id, achievement}:INftCardProps) => {
    const dictionary = useDictionary();

    return (
        <Card key={id} className="flex flex-row items-start">
            <div className="w-[100px] h-[100px] relative aspect-square rounded-sm bg-red-300">
                <Image
                    src={`https://ipfs.io/ipfs/${achievement?.image ? achievement.image : achievement.avatar}`}
                    alt="project image"
                    fill={true}
                    className="rounded-sm"
                />
            </div>
            <div className="flex flex-col gap-4 grow bg-blue-300">
                <header className="flex items-center gap-2">
                    <h5 className="text-subhead_s">{achievement?.name}</h5>
                </header>
                <div className="flex items-start gap-4 shrink flex-wrap">
                    <div className="flex flex-col gap-2 basis-2/6 justify-start bg-red-100 text-left">
                        <span className="text-text-secondary text-label_m bg-blue-100">
                            {dictionary.mypage.awards.issuer}:{" "}
                            <span className="capitalize">{achievement?.club?.name}</span>
                        </span>
                        <span className="text-text-secondary text-label_m bg-green-100 ">
                            {dictionary.mypage.awards.issue_date}: {" "} {formatDate(achievement.created_at.toString())}
                        </span>
                    </div>
                    <div className="flex flex-col text-left bg-green-300">
                        <span className="text-text-secondary text-label_m">{achievement?.description}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-green-300">
                <Badge variant="info" shape="category">
                    {achievement?.type}
                </Badge>
            </div>
        </Card>
    )
}
