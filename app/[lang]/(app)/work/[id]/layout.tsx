export default function ProjectMemberEvaluationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <main className="flex flex-col gap-0 mx-8">
      <header className="space-y-2 text-center my-10">
        <h2 className="text-heading_m">업무 성향/태도 평가하기</h2>
        <h5 className="text-title_m">
          이 프로젝트에서 윤창진님의 역할과 성과를 평가해주세요.
        </h5>
      </header>

      <section>{children}</section>
    </main>
  );
}
