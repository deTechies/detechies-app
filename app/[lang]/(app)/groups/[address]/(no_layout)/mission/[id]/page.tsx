import MissionDetail from "./_components/mission-detail";
import SearchMember from "./_components/search-member";

interface Mission {
  id: number;
  title: string;
  points: number;
  isRequired: boolean;
}

export default function MissionDetailPage() {
  const initialMissions: Mission[] = [
    { id: 1, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
    { id: 2, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
    { id: 3, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
    { id: 4, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
    { id: 5, title: "주니어 세션 1회 진행", points: 20, isRequired: true },
  ];

  return (
    <main className="grid md:grid-cols-3 gap-6 w-full my-10 mx-8">
      <div className="">
        <SearchMember />
      </div>
      <div className="col-span-2">
        <MissionDetail missions={initialMissions} />
      </div>
    </main>
  );
}
