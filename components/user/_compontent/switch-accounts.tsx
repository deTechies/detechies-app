'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { signOut, useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';


export default function SwitchAccount() {
    const {address} = useAccount();
    const {data:session} = useSession();
    
  return (
    <Dialog>
        <DialogTrigger>
            Switch
        </DialogTrigger>
        <DialogContent>
            {
                session?.web3.address != address && (
                    <div>
                    <div>
                        <p>Switching to {session?.web3?.address}</p>
                    </div>
                    <Button
                    variant={"destructive"}
                    onClick={() => {
                        signOut();
                    }}
                    size="lg"
                    >
                        Or sign out
                    </Button>
                    </div>
                )
            }
        </DialogContent>
    </Dialog>
  )
}
