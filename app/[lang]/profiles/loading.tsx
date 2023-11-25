import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProfilesLoading() {
  return (
    <Card className="">
    <CardContent className="grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 justify-evenly gap-3">
        {/* <loop through profile */}
        {Array(10).fill(0).map((profile:any, index) => (
            <Skeleton key={index} className="h-[200px] w-[200px] "/>
        ))
        }
    </CardContent>
</Card>
  )
}
