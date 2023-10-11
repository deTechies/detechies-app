

import NftListItemLoading from '@/components/card/nft-list-item-loading';
import ProfileCard from '@/components/card/profile-card';

import AddMemberModal from '@/components/extra/add-member';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import useFetchData from '@/lib/useFetchData';



interface Profile {
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
export default function GroupMember({address, owners} : {address: any, owners: string[]}) {
    
    const {data, loading, error} = useFetchData<Profile[] | null>(`/company/members/${address}`)
    
    console.log(data)
  return (
    <Card className='overflow-auto max-w-[90vw]' >
        <CardHeader className="flex items-center justify-between">
            <h3>Members ({data?.length})</h3>
                <AddMemberModal />
            
        </CardHeader>
        <CardContent className="flex gap-4">
        {
            loading && 
            <>
            <NftListItemLoading />
            <NftListItemLoading />
            <NftListItemLoading />
            <NftListItemLoading />
            </>
        }
        {
            error && 
            <div>{error}</div>
        }
        {
            data && data.length == 0 &&
            <span>No members for this group</span>
        }
        {
            data &&
            data.map((item: any, index:any) => (
                <ProfileCard profile={item} key={index}/>
            ))
        }    
        </CardContent>
        
    </Card>
  )
}
