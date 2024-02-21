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
    name: "원칙적 vs 융통성",
    ranks: 5,
    minText: "원칙적",
    maxText: "융통성",
    category: "일반 성향",
  },
  {
    id: "2",
    name: "내향적 vs 외향적",
    ranks: 5,
    minText: "내향적",
    maxText: "외향적",
    category: "일반 성향",
  },
  {
    id: "3",
    name: "감성적 vs 이성적",
    ranks: 5,
    minText: "감성적",
    maxText: "이성적",
    category: "일반 성향",
  },
  {
    id: "4",
    name: "눈치를 보는 편 vs 눈치를 안 보는 편",
    ranks: 5,
    minText: "눈치를 보는 편",
    maxText: "눈치를 안 보는 편",
    category: "일반 성향",
  },
  {
    id: "5",
    name: "시간에 둔감 vs 시간 중시",
    ranks: 5,
    minText: "시간에 둔감",
    maxText: "시간 중시",
    category: "일반 성향",
  },
  {
    id: "6",
    name: "창의적 vs 경험기반 일처리",
    ranks: 5,
    minText: "창의적",
    maxText: "경험기반 일처리",
    category: "업무 성향",
  },
  {
    id: "7",
    name: "스페셜리스트 vs 제너럴리스트",
    ranks: 5,
    minText: "스페셜리스트",
    maxText: "제너럴리스트",
    category: "업무 성향",
  },
  {
    id: "8",
    name: "팔로워 vs 리더",
    ranks: 5,
    minText: "팔로워",
    maxText: "리더",
    category: "업무 성향",
  },
  {
    id: "9",
    name: "계획형 vs 행동형",
    ranks: 5,
    minText: "계획형",
    maxText: "행동형",
    category: "업무 성향",
  },
  {
    id: "10",
    name: "시스템 엄수 vs 시스템 개선",
    ranks: 5,
    minText: "시스템 엄수",
    maxText: "시스템 개선",
    category: "업무 성향",
  },
  {
    id: "11",
    name: "간접적으로 말하는 편 vs 직설적인 편",
    ranks: 5,
    minText: "간접적으로 말하는 편",
    maxText: "직설적인 편",
    category: "커뮤니케이션",
  },
  {
    id: "12",
    name: "과묵함 vs 대화를 즐김",
    ranks: 5,
    minText: "과묵함",
    maxText: "대화를 즐김",
    category: "커뮤니케이션",
  },
  {
    id: "13",
    name: "의견이 적은 편 vs 의견이 많은 편",
    ranks: 5,
    minText: "의견이 적은 편",
    maxText: "의견이 많은 편",
    category: "커뮤니케이션",
  },
  {
    id: "14",
    name: "고집이 없는 편 vs 고집이 많은 편",
    ranks: 5,
    minText: "고집이 없는 편",
    maxText: "고집이 많은 편",
    category: "커뮤니케이션",
  },
  {
    id: "15",
    name: "주기적인 상황 공유 vs 필요할 때 상황 공유",
    ranks: 5,
    minText: "주기적인 상황 공유",
    maxText: "필요할 때 상황 공유",
    category: "커뮤니케이션",
  },
  {
    id: "16",
    name: "완성도가 중요 vs 속도가 중요",
    ranks: 5,
    minText: "완성도가 중요",
    maxText: "속도가 중요",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
  {
    id: "17",
    name: "소규모 프로젝트 vs 대규모 프로젝트",
    ranks: 5,
    minText: "소규모 프로젝트",
    maxText: "대규모 프로젝트",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
  {
    id: "18",
    name: "체계가 잡힌 환경 vs 체계가 없는 환경",
    ranks: 5,
    minText: "체계가 잡힌 환경",
    maxText: "체계가 없는 환경",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
  {
    id: "19",
    name: "솔플레이 vs 팀플레이",
    ranks: 5,
    minText: "솔플레이",
    maxText: "팀플레이",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
  {
    id: "20",
    name: "상주 근무 vs 리모트 근무",
    ranks: 5,
    minText: "상주 근무",
    maxText: "리모트 근무",
    category: "어떤 상황에서 최고의 성과를 내나요?",
  },
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
  lang,
}: {
  workId: string;
  surveyId: string;
  defaultValues?: any;
  result?: boolean;
  lang: any;
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
  const [loading, setLoading] = useState(false);

  // Initialize state for each criterion's rank
  const [selectedRanks, setSelectedRanks] = useState<{
    [key: string]: { rank: number; criterion: Criterion };
  }>(
    criteria.reduce(
      (acc, criterion) => ({
        ...acc,
        [criterion.id]: { rank: 3, criterion },
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
    setLoading(true);
    const result = await submitFeedback(selectedRanks, surveyId);

    toast({
      description: "You successfully added the rankings to the form.",
    });

    router.push(`/work/${workId}/swot`);
    // setLoading(false);
  };

  return (
    <main className={`max-w-full mx-auto mb-10 px-auto`}>
      <section className="flex flex-col gap-5">
        {Object.entries(criteriaByCategory).map(
          ([category, criteria], index) => (
            <Card key={category} className="px-4 pb-10 md:px-9 pt-7">
              <div className="mb-10 text-center text-subhead_s">{category}</div>
              <section className="flex flex-col gap-[60px] md:px-10 lg:px-20">
                {criteria.map((criterion) => (
                  <Ranking
                    key={criterion.id}
                    ranks={criterion.ranks}
                    minText={criterion.minText}
                    maxText={criterion.maxText}
                    activeRank={selectedRanks[criterion.id].rank}
                    onSelectRank={(rank) =>
                      handleSelectRank(criterion.id, rank)
                    }
                    disabled={result}
                  />
                ))}
              </section>

              {!result &&
                Object.entries(criteriaByCategory).length - 1 == index && (
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => router.back()}
                      disabled={loading}
                    >
                      {lang.project.evaluate.go_back}
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={submitResult}
                      loading={loading}
                      disabled={loading}
                    >
                      {lang.project.evaluate.next}
                    </Button>
                  </div>
                )}
            </Card>
          )
        )}
      </section>
    </main>
  );
}
