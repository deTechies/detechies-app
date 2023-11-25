"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export default function OnboardPage() {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      window.location.href = "/onboard/profile";
    }
  }, [address]);
  
  

  return (
    <div className="flex flex-col gap-8">
      <Image
        src={`/images/careerzen.png`}
        height={40}
        width={400}
        alt={`WAGMI Logo`}
      />
      <h1 className="text-xl font-medium tracking-wider text-center">
        전문가들의 커리어 인증은 다르다.
      </h1>
      <h5 className="text-text-secondary font-light text-center">
        이미 계정이 있다면 기존 계정을 사용해 Careerzen에 로그인 합니다.
      </h5>
      <div className="flex flex-col space-y-1 gap-4">
        <div
          key={connectors[0].id}
          className="text-lg bg-accent-secondary text-accent-primary rounded-sm px-6 py-5 flex gap-6 hover:outline hover:outline-accent-primary items-center cursor-pointer"
          onClick={() => connect({ connector: connectors[1] })}
        >
          <Image
            src={`/icons/google.png`}
            height={24}
            width={24}
            alt={connectors[1].name}
            quality={2}
          />
          <span className="w-full text-center">소셜 계정으로 계속하기</span>
        </div>

        <div
          key={connectors[1].id}
          className="text-lg bg-background-layer-2 font-medium border border-border-div rounded-sm px-6 py-4 flex gap-6 hover:border-orange-500 items-center cursor-pointer"
          onClick={() => connect({ connector: connectors[0] })}
        >
          <Image
            src={`/icons/browser.png`}
            height={24}
            width={24}
            alt={connectors[1].name}
          />
          <span className="w-full text-center text-text-primary">
            메타마스크 지갑
          </span>
        </div>
      </div>
    </div>
  );
}
