import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getUserProfile } from "@/lib/data/user";
import Menu from "./menu";
import ProfilePageCard from "./profile-page-card";
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
      <div className="flex flex-col gap-20 m-8 md:flex-row">
        {/* LeftSide */}
        <div className="md:w-[376px] shrink-0 flex flex-col gap-8">
          <ProfilePageCard text={dictionary.mypage.profile} profile={profile} />
          <Menu links={dictionary.mypage.menu} />
        </div>
        <div className="grow shrink">
          {children}
        </div>
      </div>
    </div>
  );
}
