"use client";

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

export default function CreateMissionPage({ params }: { params: any }) {
  return (
    <main className="m-8  w-full max-w-2xl flex">
      <Wizard clubId={params.address} />
    </main>
  );
}


