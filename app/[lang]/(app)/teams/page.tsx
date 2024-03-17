import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import PageHeader from "@/components/metronic/header/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import ProfilesLoading from "../profiles/_components/profiles-loading";
import TeamList from "./_components/team-list";
import TeamListFilter from "./_components/team-list-filter";

export default async function GroupsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col gap-10 m-2 md:m-10 ">
      <PageHeader title="Teams" subtitle="Find teams of developers here.">
        <Link href={`/teams/create`} passHref>
          <Button className="btn btn-primary">Create Team</Button>
        </Link>
        </PageHeader>
      <TeamListFilter lang={dictionary} />
      <Suspense fallback={<ProfilesLoading />}>

          <TeamList lang={dictionary} />
        </Suspense>
    </main>
  );
}
