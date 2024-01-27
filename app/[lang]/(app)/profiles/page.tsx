import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import ListProfiles from "./list-profiles";
import ProfileFilter from "./profile-filter";

export default async function ProfilePage({
  params,
  searchParams
}: {
  params: { lang: Locale };
  searchParams: { [key: string]: string | undefined }
}) {
  // lets get all the users profiles here..
  const role = searchParams.role;
  const newUrl = new URLSearchParams();
  if (role) {
    newUrl.set("role", role);
  }
  if(searchParams.search){
    newUrl.set("display_name", searchParams.search);
  }
  
  const {data: users} = await serverApi(`/users`, newUrl.toString());
  
  const dictionary = (await getDictionary(params.lang)) as any;
  return (
    <main className="flex flex-col w-full gap-6 p-4 ">
      <ProfileFilter lang={dictionary}></ProfileFilter>
      <div className="w-screen" >
        <ListProfiles users={users} lang={dictionary}/>
      </div>
    </main>
    
  );
}
