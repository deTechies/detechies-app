import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useDictionary } from '@/lib/dictionaryProvider'
import { Achievement } from '@/lib/interfaces'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

interface INftCardProps {
    id: string;
    achievement: Achievement
}

export const NftCard = ({id, achievement}:INftCardProps) => {
    const dictionary = useDictionary();

    return (
        <Card key={id} className="flex flex-col md:flex-row">
            <div className="w-[100px] h-[100px] relative aspect-square rounded-sm">
                <Image
                    src={`https://ipfs.io/ipfs/${achievement?.image ? achievement.image : achievement.avatar}`}
                    alt="project image"
                    fill={true}
                    className="rounded-sm"
                />
            </div>
            <div className="flex flex-col gap-4 grow overflow-hidden">
                <header className="flex items-center gap-2">
                    <h5 className="text-subhead_s">{achievement?.name}</h5>
                </header>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2  justify-start text-left ">
                        <span className="text-text-secondary text-label_m">
                            {dictionary.mypage.awards.issuer}:{" "}
                            <span className="capitalize">{achievement?.club?.name}</span>
                        </span>
                        <span className="text-text-secondary text-label_m truncate">
                            {dictionary.mypage.awards.issue_date}: {" "} {formatDate(achievement.created_at.toString())}
                        </span>
                    </div>
                    <div className="flex flex-col text-left ">
                        <span className="text-text-secondary text-label_m">{achievement?.description}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <Badge variant="info" shape="category">
                    {achievement?.type}
                </Badge>
            </div>
        </Card>
    )
}
