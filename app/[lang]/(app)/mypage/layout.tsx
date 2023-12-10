import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import Menu from "./menu";
import Profile from "./profile";

export default async function MyPageLayout ({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) {
  
  const dictionary = (await getDictionary(params.lang)) as any;
  
  
  return (
    <div>
      <div className="flex m-8 gap-8">
        {/* LeftSide */}
        <div className="min-w-[368px] flex flex-col gap-8">
            <Profile />
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
