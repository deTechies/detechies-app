"use client";
import { Ranking } from "@/components/group/ranking";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { submitFeedback } from "@/lib/data/feedback";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  {
    id: "1",
    name: "원칙 vs 융통성",
    ranks: 5,
    minText: "원칙",
    maxText: "융통성",
    category: "일반적인 성향",
  },
  {
    id: "2",
    name: "내향적 vs 외향적",
    ranks: 5,
    minText: "내향적",
    maxText: "외향적",
    category: "일반적인 성향",
  },
  {
    id: "3",
    name: " 감성적 vs 이성적",
    ranks: 5,
    minText: "감성적",
    maxText: "이성적",
    category: "일반적인 성향",
  },
  {
    id: "4",
    name: " 이타주의 vs 개인주의",
    ranks: 5,
    minText: "이타주의",
    maxText: "원칙을 중시",
    category: "일반적인 성향",
  },
  {
    id: "5",
    name: "눈치를 보는 편 vs 눈치를 안 보는 편",
    ranks: 5,
    minText: "눈치를 보는 편",
    maxText: "눈치를 안 보는 편",
    category: "일반적인 성향",
  },
  {
    id: "8",
    name: "고집이 없는 편 vs 고집이 많은 편",
    ranks: 5,
    minText: "고집이 없는 편",
    maxText: "고집이 많은 편",
    category: "업무성향",
  },
  {
    id: "9",
    name: "창의적 vs 경험기반 일처리",
    ranks: 5,
    minText: "창의적",
    maxText: "경험기반 일처리",
    category: "업무성향",
  },
  {
    id: "10",
    name: "본인의 전문분야에 충실 vs 다방면의 업무지식 풍부",
    ranks: 5,
    minText: "본인의 전문분야에",
    maxText: "다방면의 업무지식 풍부",
    category: "업무성향",
  },
  {
    id: "11",
    name: "팔로워 vs 리더",
    ranks: 5,
    minText: "팔로워",
    maxText: "리더",
    category: "업무성향",
  },
  {
    id: "12",
    name: "계획형 vs 행동형",
    ranks: 5,
    minText: "계획형",
    maxText: "행동형",
    category: "업무성향",
  },
  {
    id: "13",
    name: "시스템 엄수 vs 시스템 개선",
    ranks: 5,
    minText: "시스템 엄수",
    maxText: "시스템 개선",
    category: "업무성향",
  },

  {
    id: "14",
    name: " 시간에 둔감 vs 시간 중시",
    ranks: 5,
    minText: " 완성도가 중요",
    maxText: "속도가 중요",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
  {
    id: "15",
    name: " 의견이 적은 편 vs 의견이 많은 편",
    ranks: 5,
    minText: "소규모 프로젝트",
    maxText: "대규모 프로젝트",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
  {
    id: "16",
    name: "고집이 없는 편 vs 고집이 많은 편",
    ranks: 5,
    minText: ". 체계가 잡힌 환경 ",
    maxText: "체계가 없는 환경",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
  {
    id: "17",
    name: "창의적 vs 경험기반 일처리",
    ranks: 5,
    minText: "솔플레이",
    maxText: "팀플레이",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
  {
    id: "18",
    name: "본인의 전문분야에 충실 vs 다방면의 업무지식 풍부",
    ranks: 5,
    minText: "상주 근무",
    maxText: "리모트 근무",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },

  /* { id: '19', name: "친밀한 관리자 vs 권위있는 관리자", ranks: 5, minText: "친밀한 관리자", maxText: "권위있는 관리자", category: "리더십 스타일 (관리자 평가만)" },
  { id: '20', name: "지시형 vs 의견수렴형", ranks: 5, minText: "지시형", maxText: "의견수렴형", category: "리더십 스타일 (관리자 평가만)" },
  { id: '21', name: "역량을 고려한 업무배분 vs 경험을 고려한 업무배분", ranks: 5, minText: "역량을 고려한 업무배분", maxText: "경험을 고려한 업무배분", category: "리더십 스타일 (관리자 평가만)" },
   */
  // Add more criteria as needed
];

// Define a type for the grouped criteria
type CriteriaByCategory = {
  [category: string]: Criterion[];
};

export default function EvaluateTeamForm({
  workId,
  surveyId,
  defaultValues,
  result = false,
}: {
  workId: string;
  surveyId: string;
  defaultValues?: any;
  result?: boolean;
}) {
  // Group criteria by category
  const criteriaByCategory: CriteriaByCategory = criteria.reduce(
    (acc, criterion) => {
      acc[criterion.category] = acc[criterion.category] || [];
      acc[criterion.category].push(criterion);
      return acc;
    },
    {} as CriteriaByCategory
  );
  const router = useRouter();

  // Initialize state for each criterion's rank
  const [selectedRanks, setSelectedRanks] = useState<{
    [key: string]: { rank: number; criterion: Criterion };
  }>(
    criteria.reduce(
      (acc, criterion) => ({
        ...acc,
        [criterion.id]: { rank: 0, criterion },
      }),
      {}
    )
  );

  useEffect(() => {
    if (defaultValues) {
      setSelectedRanks(defaultValues);
    }
  }, [defaultValues]);

  const handleSelectRank = (criterionId: string, rank: number) => {
    setSelectedRanks({
      ...selectedRanks,
      [criterionId]: { ...selectedRanks[criterionId], rank: rank },
    });
  };

  const submitResult = async () => {
    const result = await submitFeedback(selectedRanks, surveyId);

    toast({
      description: "You successfully added the rankings to the form.",
    });

    router.push(`/work/${workId}/swot`);
  };

  return (
    <main className={`max-w-4xl ${result && 'max-w-full'} mx-auto my-10`}>
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
                  activeRank={selectedRanks[criterion.id].rank}
                  onSelectRank={(rank) => handleSelectRank(criterion.id, rank)}
                  disabled={result}
                />
              ))}
            </section>
          </Card>
        ))}
        {!result && (
          <Card className="flex flex-row justify-between">
            <Button variant="secondary" size="lg" onClick={() => router.back()}>
              Go Back
            </Button>
            <Button variant="primary" size="lg" onClick={submitResult}>
              Submit
            </Button>
          </Card>
        )}
      </section>
    </main>
  );
}
