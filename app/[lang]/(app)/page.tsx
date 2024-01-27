import { Locale } from "@/i18n.config";
import Dashboard from "./mypage/page";

export default async function ProfileDashboard({
  params,
}: {
  params: { lang: Locale };
}) {

  return (
    <main className="m-8">
    <Dashboard params={params} />
    
    </main>
  );
}
