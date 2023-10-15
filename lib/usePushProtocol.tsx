
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
    const initializeUser = async (signer:any) => {
      const initializedUser = await PushAPI.initialize(signer, { env: ENV.STAGING });
      setUser(initializedUser);
    };

    // Assume signer is obtained somehow, replace with your logic
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
