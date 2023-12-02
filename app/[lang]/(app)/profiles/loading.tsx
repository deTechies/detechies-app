import { Skeleton } from '@/components/ui/skeleton'

export default function ProfilesLoading() {
  return (

<div>
        {/* <loop through profile */}
        {Array(10).fill(0).map((profile:any, index) => (
            <Skeleton key={index} className="h-[200px] w-[200px] "/>
        ))
        }
</div>
  )
}
