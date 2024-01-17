import JsonDisplay from "@/components/extra/translation/json-display";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import Link from "next/link";

export default async function LanguageCheck({
    params: { lang },
    }: {
    params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="App">
      <div>
        <Link href="/en/admin/language">English</Link>
        <Link href="/kr/admin/language">Korean</Link>
      </div>
      <JsonDisplay jsonData={dictionary} />
    </div>
  );
}
