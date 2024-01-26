import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'

export default function ProfilesLoading() {
  return (
    
    <div className="h-[100vh] w-[100vw]">
      <div className="flex w-full flex-col items-center justify-center h-full">
        <Image
          src="/images/careerzen.png"
          alt="Careerzen"
          width={300}
          height={50}
          className="block h-12 object-contain dark:hidden animate-pulse mx-auto"
        />
        <Image
          src="/images/logo-invert.png"
          alt="Careerzen"
          width={300}
          height={50}
          className="h-12 object-contain hidden dark:block animate-pulse mx-auto"
        />
      </div>
    </div>
// <div className="grid grid-cols-4 gap-4 ">
//         {/* <loop through profile */}
//         {Array(10).fill(0).map((profile:any, index) => (
//             <Skeleton key={index} className="h-[100px] w-[200px] "/>
//         ))
//         }
// </div>
  )
}
