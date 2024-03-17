import { Suspense } from "react";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import PageHeader from "@/components/metronic/header/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfilesLoading from "../profiles/_components/profiles-loading";
import ProjectFilter from "./_components/project-filter";
import ProjectList from "./_components/project-list";

export default async function ProjectListPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { lang: Locale };
}) {
  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <main className="flex flex-col gap-10 m-2 md:m-10 ">
      <PageHeader title="Projects" subtitle="Search for your projects here">
        <Link href={`/project/create`} passHref>
          <Button className="btn btn-primary">Add Project</Button>
        </Link>
        </PageHeader>
      <ProjectFilter lang={dictionary} />
      <Suspense fallback={<ProfilesLoading />}>
        <ProjectList dictionary={dictionary} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
