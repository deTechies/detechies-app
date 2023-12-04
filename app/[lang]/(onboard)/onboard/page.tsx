import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import Image from "next/image";
import LoginButtons from "./login-buttons";

export default async function OnboardPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  
  const dictionary = await getDictionary(lang);
  
  return (
    <div className="flex flex-col gap-8 items-center">
      <Image
        src={`/images/careerzen.png`}
        height={40}
        width={400}
        alt={`careerzen Logo`}
      />
      <h1 className="text-xl font-medium tracking-wider text-center">
        {
          dictionary.onboard.welcome.title
        }
      </h1>
      <h5 className="text-text-secondary font-light text-center">
        {
          dictionary.onboard.welcome.body
        }
      </h5>
      <div className="flex flex-col space-y-1 gap-4 w-full">
        <LoginButtons 
          text={dictionary.onboard.welcome}
        />
      </div>
    </div>
  );
}
