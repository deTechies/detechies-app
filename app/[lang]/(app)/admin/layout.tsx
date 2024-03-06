import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import AdminMenu from "./_component/admin-menu";


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
      <div className="flex m-8 gap-2">
        {/* LeftSide */}
        <div className="min-w-[100px] flex flex-col gap-8">

            <AdminMenu />
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
