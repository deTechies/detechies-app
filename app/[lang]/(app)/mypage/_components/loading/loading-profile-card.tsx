import { Card } from '@/components/ui/card'

export default function LoadingProfileCard() {
  return (
    <Card>
        <div className="flex gap-4">
            <div className="relative w-[120px] aspect-square rounded-[8px] bg-background-layer-2 animate-pulse"></div>
            <div className="flex flex-col gap-2 w-full">
            <div className="h-4 bg-background-layer-2 animate-pulse"></div>
            <div className="h-4 bg-background-layer-2 animate-pulse"></div>
            <div className="h-4 bg-background-layer-2 animate-pulse"></div>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <div className="h-4 bg-background-layer-2 animate-pulse"></div>
            <div className="h-4 bg-background-layer-2 animate-pulse"></div>
        </div>
    </Card>
  )
}
