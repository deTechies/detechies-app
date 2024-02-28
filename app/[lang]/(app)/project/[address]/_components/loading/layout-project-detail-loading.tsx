import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function LayoutProjectDetailLoading() {
  return (
    <Card className="px-4 py-2 flex">
        <Skeleton className="w-32 h-32 rounded-[4px]" />
        <div>
            <Skeleton className="w-32 h-4 mb-2" />
            <Skeleton className="w-16 h-4 mb-2" />
            <Skeleton className="w-24 h-4 mb-2" />
            <Skeleton className="w-20 h-4 mb-2" />
        </div>
    </Card>
  )
}
