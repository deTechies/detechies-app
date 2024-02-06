"use client";
import { Badge } from "@/components/ui/badge";
export const job_list = [
  { en: "Front-end Dev", kr: "프론트엔드 개발" },
  { en: "Back-end Dev", kr: "백엔드 개발" },
  { en: "Data Science", kr: "데이터 사이언스" },
  { en: "BI Engineering", kr: "BI 구축" },
  { en: "Data Engineering", kr: "DB 구축" },
  { en: "DBA", kr: "DBA" },
  { en: "Embeded Dev", kr: "임베디드 개발" },
  { en: "DevOps", kr: "데브옵스" },
  { en: "Android Dev", kr: "안드로이드 개발" },
  { en: "IOS Dev", kr: "IOS 개발" },
  { en: "Security Dev", kr: "보안" },
  { en: "Blockchain Dev", kr: "블록체인 개발" },
  { en: "AI Dev", kr: "AI 개발" },
  { en: "Game Dev", kr: "게임 개발" },
  { en: "System Analytics", kr: "시스템 분석" },
  { en: "QA", kr: "QA" },
  { en: "UXUI Design", kr: "UXUI 디자인" },
  { en: "Graphic Design", kr: "그래픽 디자인" },
  { en: "Contents Design", kr: "콘텐츠 디자인" },
  { en: "Product Desingn", kr: "프로덕트 디자인" },
  { en: "Game Art Design", kr: "게임 아트 디자인" },
  { en: "Brand Design", kr: "브랜드 디자인" },
  { en: "UX Writing", kr: "UX 라이팅" },
  { en: "UX Research", kr: "UX 리서치" },
  { en: "Market Research", kr: "마켓 리서치" },
  { en: "Service Strategy", kr: "서비스 전략" },
  { en: "UX design", kr: "UX 디자인" },
  { en: "Business Development", kr: "사업개발" },
  { en: "Policy Design", kr: "정책 설계" },
  { en: "PRD", kr: "요구사항 정의" },
  { en: "IA", kr: "IA 설계" },
  { en: "Project Managing", kr: "프로젝트 관리" },
  { en: "Scrum Master", kr: "스크럼 마스터" },
  { en: "Data Anaytics", kr: "데이터 분석" },
  { en: "Conmmunication Managing", kr: "커뮤니케이션 관리" },
  { en: "Community Managing", kr: "커뮤니티 관리" },
  { en: "Performance Marketing", kr: "퍼포먼스 마케팅" },
  { en: "SNS Marketing", kr: "SNS 마케팅" },
  { en: "Influencer", kr: "인플루언서" },
  { en: "Youtuber", kr: "유튜버" },
];
export default function ProfessionTagType({
  newTag,
  onClickJobBadge,
}: {
  newTag: string;
  onClickJobBadge: Function;
}) {
  const filtered_job_list = job_list.filter((job_item) => {
    return (
      job_item.en.toLowerCase().includes(newTag.toLowerCase()) ||
      job_item.kr.includes(newTag)
    );
  });

  return (
    <div className="flex flex-wrap gap-2 px-5 py-4 border rounded-sm cursor-pointer border-border-div">
      <Badge
        shape="outline"
        variant="accent"
        onClick={() => onClickJobBadge(newTag)}
      >
        {newTag}
      </Badge>

      {filtered_job_list.map((_job_item, _index) => {
        if (_index > 3) {
          return;
        }

        return (
          <Badge
            shape="outline"
            variant="accent"
            onClick={() => onClickJobBadge(_job_item.en)}
            key={_index}
          >
            {_job_item.en}
          </Badge>
        );
      })}
    </div>
  );
}
