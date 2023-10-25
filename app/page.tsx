"use client";
import DisplayNFT from "@/components/nft/display-nft";
import { Card } from "@/components/ui/card";
import useFetchData from "@/lib/useFetchData";

export default function Home() {
  //make sure that we return the full list if ther eis an acount

  const { data, loading, error } = useFetchData<any>(`/achievement/all`);

  return (
    <main className="flex flex-col items-center justify-between m-20 gap-4">
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2 w-full">
        <Card>
          My Projects
        </Card>
        <Card>
          My Groups
        </Card>
        <Card>
          My Achievements
        </Card>
        <Card>
          My Career
        </Card>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map((achievement: any, key: number) => {
          return <DisplayNFT key={key} {...achievement} />;
        })}
      </div>
    </main>
  );
}
