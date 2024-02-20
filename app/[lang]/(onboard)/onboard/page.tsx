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
        <div className="relative w-[300px] h-[50px] mx-auto">
          <Image
            className="block object-contain h-12 dark:hidden"
            src="/images/careerzen.png"
            alt="Careerzen"
            fill={true}
            priority={true}
          />
          <Image
            className="hidden object-contain h-12 dark:block"
            src="/images/logo-invert.png"
            alt="Careerzen"
            fill={true}
            priority={true}
          />
        </div>
        <h1 className="text-center text-subhead_s">
          {dictionary.onboard.welcome.title}
        </h1>
      </div>

      <div className="flex flex-col w-full gap-4 space-y-1">
        <h5 className="text-center text-body_s text-text-secondary">
          {dictionary.onboard.welcome.body}
        </h5>
        <Suspense fallback={<p>Loading buttons...</p>}>
          <LoginButtons text={dictionary.onboard.welcome} />
        </Suspense>
      </div>
    </main>
  );
}
