import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { serverApi } from "@/lib/data/general";
import MintTokenbound from "./_component/mint-tokenbound";


export default async function Tokenbound() {
  const {data:user} = await serverApi("/users/my-profile");
  
  return (
    <Card>
      <div className="w-[200px] h-[200px] relative">
        <IPFSImageLayer hashes={user.avatar ? user.avatar : defaultAvatar} />
      </div>
      <MintTokenbound />
      <h1>{user?.display_name}</h1>
    </Card>
  );
}
