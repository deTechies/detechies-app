import InviteProjectMember from "@/components/invite-project-member/invite-project-member";
import PageHeader from "@/components/metronic/header/page-header";
import JoinProject from "@/components/project/join-project";
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
    <div className="flex flex-col gap-md mx-10 lg:mx-20">
      <PageHeader
        title="Members"
        subtitle={`The members that have contributed to this project .`}
      >
        {details.userRole == "none" && (
          <JoinProject lang={lang} address={params.address} />
        )}
        {details.userRole == "admin" && (
          <InviteProjectMember
            lang={lang}
            members={[]}
            projectId={params.address}
            projectMembers={details.members}
          />
        )}
      </PageHeader>
      <ProjectMemberList projectId={params.address} lang={lang} />
    </div>
  );
}
