"use client";

import { Button } from "@/components/ui/button";
import AuthenticateButton from "@/components/user/authenticate-button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";

export default function OnboardPage() {
  const { connect, connectors } = useConnect();
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork()
  const { address, isConnecting } = useAccount();
  const { data: session } = useSession();

  if (address && !session?.web3?.address && !isConnecting && chain?.id == 80001) {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-medium tracking-wide">Authenticate </h1>
        <div>
          Please validate that you are the owner of this address, so we can use
          it to securely store your achievements.
        </div>
        <AuthenticateButton />
      </div>
    );
  }

  if (address && chain?.id != 80001) {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-medium tracking-wide">Change network</h1>
        <div className="flex flex-col space-y-1 gap-4">
          <p>
            Currently we are only compatible with the Polygon Mumbai networks.
            Since we are on the beta version. 
          </p>
          <p>
            Please change your network to continue.
          </p>


          <Button
            variant={"destructive"}
            onClick={() => switchNetwork?.(80001)}
          >
            Change Chain
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-medium tracking-wide">Sign In</h1>
      <div className="flex flex-col space-y-1 gap-4">
        <div
          key={connectors[0].id}
          className="text-lg font-medium border border-border-div rounded-sm px-6 py-4 flex gap-6 hover:border-blue-500 items-center cursor-pointer"
          onClick={() => connect({ connector: connectors[1] })}
        >
          <Image
            src={`/icons/web3auth.png`}
            height={44}
            width={44}
            alt={connectors[1].name}
          />
          Social Login
        </div>

        <OrSeparator />

        <div
          key={connectors[1].id}
          className="text-lg font-medium border border-border-div rounded-sm px-6 py-4 flex gap-6 hover:border-orange-500 items-center cursor-pointer"
          onClick={() => connect({ connector: connectors[0] })}
        >
          <Image
            src={`/icons/browser.png`}
            height={44}
            width={44}
            alt={connectors[1].name}
          />
          MetaMask
        </div>
      </div>
    </div>
  );
}

const OrSeparator = () => {
  return (
    <div className="flex items-center space-x-4">
      <hr className="flex-1 border-border-field" />
      <span className="text-text-placeholder">OR</span>
      <hr className="flex-1 border-border-field" />
    </div>
  );
};
