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
    redirect("/project");
  }
  

  return (
    <main className="flex flex-col gap-12 items-center w-full max-w-[400px]">
      <div className="flex flex-col gap-8">
        <div className="relative w-[300px] h-[50px] mx-auto">
          <Image
            className="block h-12 object-contain dark:hidden"
            src="/images/careerzen.png"
            alt="Careerzen"
            fill={true}
            priority={true}
          />
          <Image
            className="h-12 object-contain hidden dark:block"
            src="/images/logo-invert.png"
            alt="Careerzen"
            fill={true}
            priority={true}
          />
        </div>
        <h1 className="text-subhead_s text-center">
          {dictionary.onboard.welcome.title}
        </h1>
      </div>

      <div className="flex flex-col space-y-1 gap-4 w-full">
        <h5 className="text-body_s text-text-secondary text-center">
          {dictionary.onboard.welcome.body}
        </h5>
        <Suspense fallback={<p>Loading buttons...</p>}>
          <LoginButtons text={dictionary.onboard.welcome} />
        </Suspense>
      </div>
    </main>
  );
}
