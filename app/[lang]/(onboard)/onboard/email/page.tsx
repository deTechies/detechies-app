
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { getUserProfile } from "@/lib/data/user";
import CreateProfile from "./create-profile";
import EmailVerification from "./email-verify";
import FinishedProfile from "./finished-profile";

export default async function EmailVerify({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  //reda here the lang and the dictionary
  const dictionary = await getDictionary(lang);
  const text = dictionary.onboard.verify_email;

  
  
  const user = await getUserProfile();
  

  
  
  return (
    <div>
    
      <section className="my-2">
        {
          !user.email && <CreateProfile text={text}/> 
        }
        {
          user && !user.verified && user.email && <EmailVerification text={text}/>
        }
        {
          user && user.verified && <FinishedProfile />
        }
      </section>
    </div>
  );
}

