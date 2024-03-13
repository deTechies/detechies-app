import PageHeader from "@/components/metronic/header/page-header";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import ProjectMemberList from "./components/project-member-list";

export default async function ProjectMembers({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  //getting the user role of the project in order to distinquish, where or not he can add or remove members.
  const lang = await getDictionary(params.lang);
  const { data: details } = await serverApi(`/projects/${params.address}`);
  return (
    <div className="flex flex-col gap-md">
      <PageHeader
        title="Project Members"
        subtitle={`These project members have contributed to the project .`}
      ></PageHeader>
      <ProjectMemberList projectId={params.address} lang={lang} />
    </div>
  );
}
