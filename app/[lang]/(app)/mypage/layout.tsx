import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import Menu from "./menu";
import Profile from "./profile";
import { getUserProfile } from "@/lib/data/user";
import { User } from "@/lib/interfaces";
export default async function MyPageLayout ({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) {
  
  const dictionary = (await getDictionary(params.lang)) as any;
  const profile: User = await getUserProfile();
  
  return (
    <div>
      <div className="flex sm:flex-row flex-col m-8 gap-20">
        {/* LeftSide */}
        <div className="min-w-[330px] flex flex-col gap-8">
            <Profile text={dictionary.mypage.profile} profile={profile}/>
            <Menu links={dictionary.mypage.menu}/>
        </div>
        {/* main */}
        <div className="grow">

          {children}
          {/* <EditProfile /> */}
        </div>
      </div>

    </div>
  );
};
