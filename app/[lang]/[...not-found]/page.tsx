import CustomNotFound from "./custom-not-found";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

export default async function NotFound({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  return <CustomNotFound lang={dictionary} />;
}
