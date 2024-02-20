import { Button } from '@/components/ui/button'
import Link from 'next/link'



interface ProfileCardWalletProps {
    wallet: string
    dictionary: any
}

export default function ProfileCardWallet({
    wallet,
    dictionary
}: ProfileCardWalletProps) {
  return (
    <div className="grid border rounded-sm border-border-div">
    <div className="flex justify-between px-5 py-7 items-center gap-4">
      <div className="flex items-center text-nowrap text-title_m">
        {dictionary.mypage?.profile?.address}
      </div>
      <Link
        href={`https://mumbai.polygonscan.com/address/${wallet}`}
        target="_blank"
        passHref
      >
        <Button variant={"secondary"} size="ts">
          {wallet.slice(0, 5) + "..." + wallet.slice(-4)}
        </Button>
      </Link>
    </div>
  </div>
  )
}
