

import { PushAPI } from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import { useEffect, useState } from 'react';
PushAPI
// Custom Hook: useStoredAPIResponse
function usePushProtocol(signer:any) {
  const [chatter, setChatter] = useState<PushAPI>();

  useEffect(() => {
    if (signer) {
      const storedResponse = localStorage.getItem('chatterData');
      if (storedResponse) {
        setChatter(JSON.parse(storedResponse));
      } else {

        PushAPI.initialize(signer, {
            env: ENV.STAGING,
          }).then((resp) => {
            setChatter(resp);
            localStorage.setItem('push', JSON.stringify(resp));
          }).catch(err => {
            console.error("Initialization error:", err);
          });
      }
    }
  }, [signer]);

  return chatter as PushAPI;
}

export default usePushProtocol;
