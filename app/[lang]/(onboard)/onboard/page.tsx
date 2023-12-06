import { Locale } from "@/i18n.config";
import Image from "next/image";
import { Suspense } from "react";
import LoginButtons from "./login-buttons";

export default async function OnboardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  //const dictionary = await getDictionary(lang);

  return (
    <main className="flex flex-col gap-8 items-center w-full">

      <Image
        src={`/images/careerzen.png`}
        width={200}
        height={200}
        className="object-scale-down fill-current block dark:hidden"
        alt={`careerzen Logo`}
      />

     
      <h1 className="text-xl font-medium tracking-wider text-center">
        {/* {
          dictionary.onboard.welcome.title
        } */}
        Welcome
      </h1>
      {/*   <h5 className="text-text-secondary font-light text-center">
        {
          dictionary.onboard.welcome.body
        }
      </h5> */}
      <div className="flex flex-col space-y-1 gap-4 w-full">
      <Suspense fallback={<p>Loading buttons...</p>}>
        <LoginButtons />
        </Suspense>
      </div>
    </main>
  );
}
