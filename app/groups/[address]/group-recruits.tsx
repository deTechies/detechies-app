

import PendingProfileCard from '@/components/card/pending-profile-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useFetchData from '@/lib/useFetchData';


interface User {
    id: string;
    name: string;
    role: string;
    email: string;
    username: string;
    avatar: string;
    organisation: string;
    image: string;
    industry: string;
}

export default function GroupRecruits({address}: {address: string}) {
    const { data, loading, error } = useFetchData<User[]>(`/polybase/company/request?address=${address}&status=open`);

    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <Card>Error {error}</Card>
    }
    if(data && data.length == 0){
        return <Card>No results</Card>
    }
  return (
    <Card className="overflow-auto max-w-[90vw]">
        <CardHeader className='flex justify-between'>
            <h1>Waitinglist to join ({data && data.length})</h1>
        </CardHeader>
        <CardContent className="flex gap-4 overflow-x-scroll">
        {data && data.map((item: any, index: number) => (
            <PendingProfileCard profile={item} key={index} contract={address } />
        ))}
        </CardContent>
    </Card>
  )
}
