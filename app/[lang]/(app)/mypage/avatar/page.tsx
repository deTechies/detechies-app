import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserProfile } from "@/lib/data/user";
import NftOwned from "../../profile/select/nft-owned";

export default async function Avatars() {
  const profile = await getUserProfile();

  return (
    <Tabs defaultValue="all">
      <TabsList className="grid w-full grid-cols-4 gap-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="career">Career</TabsTrigger>
        <TabsTrigger value="minting">on Minting</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        {profile ? <NftOwned address={profile} /> : "No account found!"}
      </TabsContent>
      <TabsContent value="career">
        {profile?.TBA ? (
          <NftOwned address={profile.TBA} avatar={profile?.nft} />
        ) : (
          "No tokenbound account found!"
        )}
      </TabsContent>
      <TabsContent value="minting">
        {profile ? (
          <NftOwned address={profile} status="minting" />
        ) : (
          "No minting account found!"
        )}
      </TabsContent>
    </Tabs>
  );
}
