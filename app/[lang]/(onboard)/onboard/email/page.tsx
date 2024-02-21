import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { getUserProfile } from "@/lib/data/user";
import CreateProfile from "./_components/create-profile";
import EmailVerification from "./_components/email-verify";
import FinishedProfile from "./_components/finished-profile";

export default async function EmailVerify({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  //reda here the lang and the dictionary
  const dictionary = await getDictionary(lang);
  const { data: user } = await getUserProfile();

  return (
    <div>
      <section className="my-2">
        {!user.email && <CreateProfile lang={dictionary} />}
        {user?.email && !user.verified && (
          <EmailVerification lang={dictionary} user={user} />
        )}
        {user?.verified && <FinishedProfile lang={dictionary} />}
      </section>
    </div>
  );
}
