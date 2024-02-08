"use client";
import { Badge } from "@/components/ui/badge";

export default function ProfessionTagType({
  newTag,
  onClickJobBadge,
  category,
}: {
  newTag: string;
  onClickJobBadge: Function;
  category: "skill" | "project";
}) {

  const tag_list = {
    skill: [
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
    ],
    project: [
      { en: "Development", kr: "개발" },
      { en: "Design", kr: "디자인" },
      { en: "Planning", kr: "기획" },
      { en: "Web Site", kr: "웹사이트" },
      { en: "AOS App", kr: "안드로이드 앱" },
      { en: "IOS App", kr: "iOS 앱" },
      { en: "Web App", kr: "웹 애플리케이션" },
      { en: "WordPress", kr: "워드프레스" },
      { en: "Embedded Systems", kr: "임베디드 시스템" },
      { en: "Publishing", kr: "퍼블리싱" },
      { en: "Logo Design", kr: "로고 디자인" },
      { en: "Graphic Design", kr: "그래픽 디자인" },
      { en: "UI/UX Design", kr: "UI/UX 디자인" },
      { en: "Presentation", kr: "프레젠테이션" },
      { en: "Service Planning", kr: "서비스 기획" },
      { en: "Responsive Web", kr: "반응형 웹" },
      { en: "SaaS", kr: "설치형/SaaS" },
      { en: "Data Analysis", kr: "데이터 분석" },
      { en: "Business Intelligence", kr: "비즈니스 인텔리전스" },
      { en: "Artificial Intelligence", kr: "인공지능" },
      { en: "Machine Learning", kr: "머신러닝" },
      { en: "Big Data", kr: "빅데이터" },
      { en: "Cloud Computing", kr: "클라우드 컴퓨팅" },
      { en: "Cyber Security", kr: "사이버 보안" },
      { en: "Blockchain", kr: "블록체인" },
      { en: "Internet of Things", kr: "사물인터넷" },
      { en: "API Development", kr: "API 개발" },
      { en: "Game Development", kr: "게임 개발" },
      { en: "Virtual Reality", kr: "가상현실" },
      { en: "Augmented Reality", kr: "증강현실" },
      { en: "Software Testing", kr: "소프트웨어 테스팅" },
      { en: "System Architecture", kr: "시스템 아키텍처" },
      { en: "Network Engineering", kr: "네트워크 엔지니어링" },
      { en: "Database Management", kr: "데이터베이스 관리" },
      { en: "CRM", kr: "CRM" },
      { en: "ERP", kr: "ERP" },
      { en: "SEO/SEM", kr: "SEO/SEM" },
      { en: "Content Marketing", kr: "콘텐츠 마케팅" },
      { en: "E-commerce", kr: "이커머스" },
      { en: "DevOps", kr: "데브옵스" },
      { en: "IT Consulting", kr: "IT 컨설팅" },
      { en: "Data Visualization", kr: "데이터 시각화" },
      { en: "Agile Project Management", kr: "애자일 프로젝트 관리" },
      { en: "Software Documentation", kr: "소프트웨어 문서화" },
    ]
  } 

  const filtered_tag_list = tag_list[category].filter((tag_item) => {
    return (
      tag_item.en.toLowerCase().includes(newTag.toLowerCase()) ||
      tag_item.kr.includes(newTag)
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

      {filtered_tag_list.map((_tag_item, _index) => {
        if (_index > 3) {
          return;
        }

        return (
          <Badge
            shape="outline"
            variant="accent"
            onClick={() => onClickJobBadge(_tag_item.en)}
            key={_index}
          >
            {_tag_item.en}
          </Badge>
        );
      })}
    </div>
  );
}
