"use client";

import { API_URL } from "@/lib/constants";
import { useEthersSigner } from "@/lib/utils";
//@ts-ignore
import { ethers } from "ethers";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Badge } from "../ui/badge";
import { toast } from "../ui/use-toast";

interface VerifyResponse {
  post_content: {
    default: string;
  };
  sign_payload: string;
  uuid: string;
  created_at: string;
  access_token:string;
  public_key:string;
}

const ConnectGithub = () => {
  const { address } = useAccount();
  const searchParams = useSearchParams()!;
  const code = searchParams.get("code");
  const signer = useEthersSigner();
  const [verify, setVerify] = useState<VerifyResponse>();
    const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGithub = async () => {
    //getting public key
    setLoading(true);

    const publicKey = await getRecoverPublicKey("something");

    //@ts-ignore
    
    const result = await fetch(
      API_URL + `/nextid/github?code=${code}&publicKey=${publicKey}`
    )
      .then((res) =>{
        return res.json();
      })
      .catch((err: Error) => console.log(err));

      console.log(result)
      setVerify(result);
    setLoading(false);
  };

  const verifyGithub = async () => {
    setLoading(true);
    if (!verify) {
      return;
    }
    if(!signer) return;
    //@ts-ignore
    const signature = await signer.signMessage(verify.sign_payload);

    const base64 = Buffer.from(signature.substring(2), 'hex').toString('base64');

    verify.post_content.default = verify.post_content.default.replace(
      "%SIG_BASE64%",
      base64
    );
    const response = await fetch(API_URL + "/nextid/github/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...verify, address: address }),
    }).then(() => {
        toast({
            title: "Github Verified",
            description: "Your Github account has been successfully verified.",
          });
          
          router.refresh()
    }).catch((err: Error) => console.log(err));



    toast({
      title: "Verifying Github",
      description: <pre></pre>,
    });
  };
  
  async function getRecoverPublicKey(message:string) {

    if(!signer) return;
    //@ts-ignore
    const signature = await signer.signMessage(message);
    const messageHash = ethers.utils.hashMessage(message);
    const recoveredPublicKey = ethers.utils.recoverPublicKey(messageHash, signature);

    return recoveredPublicKey
    
      
}



  if (verify && code && address) {
    return <Badge onClick={verifyGithub}>Verify</Badge>;
  }
  if (code && address && !verify) {
    return <Badge onClick={fetchGithub}>Collect Proof</Badge>;
  }

  return (
    <Link href="https://github.com/login/oauth/authorize?client_id=a9b9ed7176cb97a46f24&scope=gist">
      <Badge>Connect Github</Badge>
    </Link>
  );
};

export default ConnectGithub;
