import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { auth } from "@/lib/helpers/authOptions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoginButtons from "./login-buttons";

export default async function OnboardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  const session = await auth();

  if (session?.web3?.user?.verified) {
    redirect("/mypage");
  }

  return (
    <main className="flex flex-col gap-12 items-center w-full max-w-[400px] mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4 items-center mx-auto">
          <div className="relative h-24 w-24">
            <Image
              className="block object-contain h-24 animate-pulse "
              src="/images/detechies.png"
              alt="deTechies"
              fill={true}
              priority={true}
            />
          </div>
        </div>
        <div>
          
        <h1 className="text-left flex flex-col gap-1 text-subhead_s">
          Hello stranger, welcome to detechies!
        </h1>
        <p>
          Please select your preferred method to sign in or sign up to continue.
        </p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 space-y-1">
        <Suspense fallback={<p>Loading buttons...</p>}>
          <LoginButtons text={dictionary.onboard.welcome} />
        </Suspense>
      </div>
    </main>
  );
}
