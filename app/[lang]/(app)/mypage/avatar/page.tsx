import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { getUserAchievements } from "@/lib/data/achievements";
import ListAvatars from "./list-avatars";

export default async function Avatars() {
  //need to get the users received achievements
  const {data:achievements} = await getUserAchievements();
  const lang = await getDictionary("ko");


  return (
    <Tabs defaultValue="all">
      <TabsList className="flex items-start justify-start w-full gap-4">
        <TabsTrigger value="all">{lang.mypage.edit_avatar.tab_all}</TabsTrigger>
        <TabsTrigger value="career">{lang.mypage.edit_avatar.tab_career}</TabsTrigger>
        <TabsTrigger value="avatar">{lang.mypage.edit_avatar.tab_avatar}</TabsTrigger>
        <TabsTrigger value="minting">{lang.mypage.edit_avatar.not_approved}</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <ListAvatars status="granted" rewards={achievements} lang={lang}/>
      </TabsContent>
      <TabsContent value="career">
        <ListAvatars status="granted" sbt={true} rewards={achievements} lang={lang}/>
      </TabsContent>
      <TabsContent value="avatar">
        <ListAvatars status="granted" avatar={true} rewards={achievements} lang={lang}/>
      </TabsContent>
      <TabsContent value="minting">
        <ListAvatars status="requested" rewards={achievements} lang={lang}/>
      </TabsContent>
    </Tabs>
  );
}
