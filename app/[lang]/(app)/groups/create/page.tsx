import { Card } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { GroupForm } from "./group-form";

export default async function CreateGroup({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);

  const text = dictionary?.group?.create;
  return (
    // Temporarily insert fixed values ​​(to work with grid later)
    <Card className="w-full max-w-[1113px] gap-0 mx-auto my-8">
      <header className="flex flex-col mb-10">
        <h4 className="mb-3 text-heading_s">{text.title}</h4>

        <span className="mb-1 text-body_s text-state-error">
          *는 필수입력 사항입니다.
        </span>
        
        <span className="text-label_s text-text-secondary ">
          학교, 회사, 기관은 대표 이메일 인증 후, 그룹을 생성할 수 있어요.
        </span>
      </header>

      <GroupForm />
    </Card>
  );
}
