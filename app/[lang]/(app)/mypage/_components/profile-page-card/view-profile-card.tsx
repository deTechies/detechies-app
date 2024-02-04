"use client"
import { Card } from '@/components/ui/card'
import IPFSImageLayer from '@/components/ui/layer'
import { defaultAvatar } from '@/lib/constants'
import { usePathname } from 'next/navigation'
import AvatarUpdate from './avatar-update'
import ProfileCardDetails from './profile-card-details'
import ProfileCardFollow from './profile-card-follow'
import ProfileCardWallet from './profile-card-wallet'

export default function ViewProfileCard({
    dictionary, 
    profile
}:any) {
    const pathName = usePathname();
    
    
    if(pathName.includes("avatar")){
        return <AvatarUpdate profile={profile} />
    }
  return (
    <Card className="flex flex-col gap-5 w-full pt-[24px] pb-[28px] px-5 max-w-[376px]">
    <div className="flex gap-4">
      <div className="relative w-[120px] aspect-square rounded-[8px] bg-background-layer-2">
        <IPFSImageLayer
          hashes={profile.avatar ? profile.avatar : defaultAvatar}
        />
      </div>
      <ProfileCardDetails profile={profile} dictionary={dictionary} />
    </div>

    <div className="flex flex-col gap-3">
      <ProfileCardFollow dictionary={dictionary} />
      <ProfileCardWallet wallet={profile.wallet} dictionary={dictionary} />
    </div>
  </Card>
  )
}
