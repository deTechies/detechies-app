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
      <div className="flex bg-gray-200">
        {/* LeftSide */}
        <div className="basis-1/4">
            <Profile />
            <Menu />
        </div>
        {/* main */}
        <div className="basis-3/4 m-8">
          {children}
          {/* <EditProfile /> */}
        </div>
      </div>

    </div>
  );
};
