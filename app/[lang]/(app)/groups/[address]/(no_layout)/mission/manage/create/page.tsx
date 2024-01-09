import { getGroupAchievements } from "@/lib/data/achievements";
import { Wizard } from "./_components/mission-wizard";

interface Mission {
  name: string;
  description: string;
  score: number;
  essential: boolean;
}

interface FormData {
  name: string;
  begin_date: string;
  description: string;
  end_date: string;
  missions: Mission[];
}

export default async function CreateMissionPage({ params }: { params: any }) {
  const achievements = await getGroupAchievements(params.address);

  return (
    <main className="m-8  w-full max-w-2xl flex">
      <Wizard clubId={params.address} achievements={achievements}/>
    </main>
  );
}
