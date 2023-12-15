import CreatePushGroup from '@/components/extra/chat/create-push-group';
import PushGroupChat from '@/components/extra/chat/push-group-chat';
import { getClub } from '@/lib/data/groups';
import { Address } from 'wagmi';

export default async function GroupChat({params}: {params: {address: string}}) {
    const groupDetails = await getClub(params.address);
    
    
  return (
    <main>
    {
        groupDetails.chatId ? (
            <PushGroupChat contract={params.address as Address} chatId={groupDetails.chatId} />
        ) : (
            <CreatePushGroup image={groupDetails.details?.image} members={groupDetails.members} />
        )
    }
    </main>
  )
}
