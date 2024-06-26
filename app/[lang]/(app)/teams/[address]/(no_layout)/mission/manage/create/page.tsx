import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { serverApi } from "@/lib/data/general";
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

export default async function CreateMissionPage({
  params,
}: {
  params: {
    address: any;
    lang: Locale;
  };
}) {
  const achievements = await serverApi(`/achievement/club/${params.address}`);
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <main className="w-full max-w-[60rem] flex">
      <Wizard
        clubId={params.address}
        achievements={achievements.data}
        lang={dictionary}
      />
    </main>
  );
}
