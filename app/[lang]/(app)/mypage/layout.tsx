import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import Menu from "./menu";
import Profile from "./profile";
export default async function MyPageLayout({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) {
  const dictionary = (await getDictionary(params.lang)) as any;
  const { data: profile } = await getUserProfile();

  return (
    <div>
      <div className="flex sm:flex-row flex-col m-8 gap-20">
        <div className="w-full md:min-w-[300px] md:max-w-[367px] flex flex-col gap-8">
          <Profile text={dictionary.mypage.profile} profile={profile} />
          <Menu links={dictionary.mypage.menu} />
        </div>
        <div className="grow shrink">
          {children}
        </div>
      </div>
    </div>
  );
}
