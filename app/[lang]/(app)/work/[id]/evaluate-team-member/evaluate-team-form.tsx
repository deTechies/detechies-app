"use client"
import { Ranking } from "@/components/group/ranking";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define a type for the criteria
type Criterion = {
  name: string;
  ranks: number;
  minText: string;
  maxText: string;
  category: string;
  id: string;
};

// Define your criteria with specific details
const criteria: Criterion[] = [
  { id: '1', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을 중시", category: "업무 성향" },
  { id: '2', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을 중시", category: "업무 성향" },
  { id: '3', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을 중시", category: "업무 성향" },
  { id: '4', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을 중시", category: "협업 성향" },
  { id: '5', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을 중시", category: "협업 성향" },
  { id: '6', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을", category: "협업 성향" },
  { id: '7', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을", category: "커뮤니케이션 스타일" },
  { id: '8', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을", category: "커뮤니케이션 스타일" },
  { id: '9', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을", category: "커뮤니케이션 스타일" },
  { id: '10', name: "Criterion 1", ranks: 5, minText: "원칙을 중시", maxText: "원칙을", category: "윤창진님과의 팀빌딩 희망여부" },

  // Add more criteria as needed
];

// Define a type for the grouped criteria
type CriteriaByCategory = {
  [category: string]: Criterion[];
};

export default function EvaluateTeamForm({
    projectId,
    userId
    }: { projectId: string, userId: string
}) {
  // Group criteria by category
  const criteriaByCategory: CriteriaByCategory = criteria.reduce((acc, criterion) => {
    acc[criterion.category] = acc[criterion.category] || [];
    acc[criterion.category].push(criterion);
    return acc;
  }, {} as CriteriaByCategory);
  const router = useRouter();

  // Initialize state for each criterion's rank
  const [selectedRanks, setSelectedRanks] = useState<{ [key: string]: number }>(
    criteria.reduce((acc, criterion) => ({ ...acc, [criterion.id]: 0 }), {})
  );

  const handleSelectRank = (criterionId: string, rank: number) => {
    setSelectedRanks({ ...selectedRanks, [criterionId]: rank });
    console.log(`Selected Rank for ${criterionId}: ${rank}`);
  };
  
  const submitResult = () => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(selectedRanks, null, 2)}</code>
        </pre>
      ),
    })
    
     router.push(`/project/${projectId}/${userId}/final-feedback`)
  }

  return (
    <main className="max-w-2xl mx-auto my-10">
   
      <section className="flex flex-col gap-5">
        {Object.entries(criteriaByCategory).map(([category, criteria]) => (
          <Card key={category} className="px-9 pt-7 pb-10">
            <div className="text-center text-subhead_s mb-10">{category}</div>
            <section className="flex flex-col gap-10">
            {criteria.map((criterion) => (
              <Ranking
                key={criterion.id}
                ranks={criterion.ranks}
                minText={criterion.minText}
                maxText={criterion.maxText}
                activeRank={selectedRanks[criterion.id]}
                onSelectRank={(rank) => handleSelectRank(criterion.id, rank)}
              />
            ))}
            </section>
          </Card>
        ))}
        
        <Card className="flex flex-row justify-between">
          <Button variant="secondary" size="lg" onClick={
            () => router.back()
          
          }>Go Back</Button>
          <Button variant="primary" size="lg" onClick={submitResult}>
            Submit
          </Button>
        </Card>
      </section>
    </main>
  );
}