import { Skeleton } from "@/components/ui/skeleton";
import { Locale } from "@/i18n.config";
import { Suspense } from "react";
import EditProfile from "./edit-profile";
import ProfileAccounts from "./profile-accounts";

export default async function EditProfilePage({
  params,
}: {
  params: { lang: Locale };
}) {
  return (
    <>
    <Suspense fallback={<Skeleton className="h-24 animate-pulse" />}>
      <EditProfile lang={params.lang} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-24 animate-pulse" />}>
        <ProfileAccounts lang={params.lang} />
      </Suspense>
    </>
  );
}
