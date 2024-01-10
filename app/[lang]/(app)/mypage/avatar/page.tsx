import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDictionary } from "@/get-dictionary";
import { getUserAchievements } from "@/lib/data/achievements";
import { AchievementReward } from "@/lib/interfaces";
import ListAvatars from "./list-avatars";

export default async function Avatars() {
  //need to get the users received achievements
  const achievements = await getUserAchievements() as AchievementReward[];
  const lang = await getDictionary("kr");


  return (
    <Tabs defaultValue="all">
      <TabsList className="flex items-start justify-start w-full gap-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="career">Career</TabsTrigger>
        <TabsTrigger value="avatar">Avatar</TabsTrigger>
        <TabsTrigger value="minting">on Minting</TabsTrigger>
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
