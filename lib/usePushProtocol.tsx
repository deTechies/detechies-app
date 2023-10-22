import { toast } from '@/components/ui/use-toast';
import { PushAPI } from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import { createContext, useEffect, useState } from 'react';
import { useEthersSigner } from './utils';

// 1. Create a PushContext
export const PushContext = createContext<PushAPI | null>(null);

// 2. Create a UserProvider component
export default function PushProvider({ children } : {children: any}) {
  const [user, setUser] = useState<PushAPI | null>(null);
  const signer = useEthersSigner({chainId: 8001});

  useEffect(() => {
    console.log('Signer:', signer);
    const initializeUser = async (signer:any) => {
      const initializedUser = await PushAPI.initialize(signer, { env: ENV.STAGING });

      toast({
        title: 'Push Protocol Initialized',
        description: 'Push Protocol has been initialized',
      });
      setUser(initializedUser);
    };
    if(signer){
        initializeUser(signer);
    }
}, [signer]);

  return (
    <PushContext.Provider value={user}>
      {children}
    </PushContext.Provider>
  );
}
