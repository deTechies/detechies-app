"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBar404() {

  const router = useRouter();

  return (
    <div className="p-8 mx-auto border-b border-border-on-base">
      <div className="flex items-center">
        <Image
          className="block object-contain cursor-pointer"
          src="/images/careerzen_no_icon.png"
          alt="Careerzen"
          width={208}
          height={24}
          onClick={() => {
            router.push("/");
          }}
          priority={true}
        />
      </div>
    </div>
  );
}
