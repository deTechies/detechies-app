"use client";

import { signOut, useSession } from "next-auth/react";

import { defaultAvatar } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useAccount,
  useDisconnect
} from "wagmi";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import IPFSImageLayer from "../ui/layer";
import AccountSettings from "./account-settings";

interface ILoginProps {
  lang: any;
}

export default function Login({ lang }: ILoginProps) {
  const {
    address,
    status

  } = useAccount();
  const { disconnect } = useDisconnect();
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  if (status == 'connecting' || status == 'reconnecting') {
    return (
      <Avatar
        className="animate-pulse bg-accent-primary"
        onClick={() => {
          signOut();
          disconnect();
        }}
      >
        <AvatarFallback />
      </Avatar>
    );
  }

  if (status === 'connected' && session?.web3?.address != address) {
    //sign message

    return (
      <div className="flex items-center gap-2 rounded-md">
        <Button size="sm" variant={"primary"} onClick={() => {disconnect(); signOut(); }}>
          signOut
        </Button>
        {showModal && (
          <AccountSettings showModal={showModal} text_my_account={lang} />
        )}
      </div>
    );
  }

  if (address && address == session?.web3?.address) {
    return (
      <div className="flex items-center gap-2 rounded-md">
        <Avatar
          className="bg-background-layer-2 hover:outline hover:outline-accent-primary"
          onClick={() => setShowModal(!showModal)}
        >
          <IPFSImageLayer
            hashes={
              session?.web3?.user?.avatar
                ? session.web3.user.avatar
                : defaultAvatar
            }
          />
        </Avatar>

        {showModal && (
          <AccountSettings showModal={showModal} text_my_account={lang} />
        )}

      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        size="md"
        variant="success"
        onClick={() => {
          router.push("/onboard");
          // setLoginModal(!loginModal);
        }}
      >
        {lang.sign_up}
      </Button>
      {/* {loginModal && (
        <ConnectModal
          showModal={showModal}
          setShowModal={() => {
            setLoginModal(!loginModal);
          }}
        />
      )} */}
    </div>
  );
}

// const ConnectModal = ({
//   showModal,
//   setShowModal,
// }: {
//   showModal: boolean;
//   setShowModal: any;
// }) => {
//   const [mounted, setMounted] = React.useState(false);
//   const { address, isConnected } = useAccount();
//   const { signMessageAsync } = useSignMessage();
//   const [hasSigned, setHasSigned] = React.useState(false);
//   const { connect, connectors } = useConnect();

//   React.useEffect(() => setMounted(true), []);
//   if (!mounted) return <></>;

//   const handleSign = async () => {
//     try {
//       const message = new SiweMessage({
//         domain: window.location.host,
//         uri: window.location.origin,
//         version: "1",
//         address: address,
//         statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
//         nonce: await getCsrfToken(),
//         chainId: polygonMumbai.id,
//       });

//       const signedMessage = await signMessageAsync({
//         message: message.prepareMessage(),
//       });

//       setHasSigned(true);

//       const response = await signIn("web3", {
//         message: JSON.stringify(message),
//         signedMessage,
//         redirect: true,
//       });
//       if (response?.error) {
//         console.log("Error occured:", response.error);
//       }
//     } catch (error) {
//       console.log("Error Occured", error);
//     }
//   };
//   //after connecting you should be able to create a profile.
//   return (
//     <ModalLayout title="Sign Up" showModal={showModal}>
//       <span>
//         By connecting a wallet, you agree to Careerzen’s Terms of Service
//       </span>
//       <div className="flex flex-col gap-2 my-4">
//         {!isConnected && (
//           <>
//             <div className="flex flex-col gap-4 space-y-1">
//               <div
//                 key={connectors[0].id}
//                 className="flex items-center gap-6 px-6 py-4 text-lg font-medium border rounded-sm cursor-pointer border-border-div hover:border-blue-500"
//                 onClick={() => connect({ connector: connectors[1] })}
//               >
//                 <Image
//                   src={`/icons/web3auth.png`}
//                   height={44}
//                   width={44}
//                   alt={connectors[1].name}
//                 />
//                 Social Login
//               </div>

//               <div
//                 key={connectors[1].id}
//                 className="flex items-center gap-6 px-6 py-4 text-lg font-medium border rounded-sm cursor-pointer border-border-div hover:border-orange-500"
//                 onClick={() => connect({ connector: connectors[0] })}
//               >
//                 <Image
//                   src={`/icons/browser.png`}
//                   height={44}
//                   width={44}
//                   alt={connectors[1].name}
//                 />
//                 MetaMask
//               </div>
//             </div>
//           </>
//         )}
//         {isConnected && !hasSigned && (
//           <>
//             <p className="text-xl font-semibold text-gray-400">
//               Welcome {address?.slice(0, 8)}...
//             </p>
//             <Button className="" onClick={handleSign}>
//               Sign Message to Login
//             </Button>
//           </>
//         )}
//         {isConnected && hasSigned && (
//           <p>You are being authenticated. Please wait...</p>
//         )}
//       </div>
//     </ModalLayout>
//   );
// };
