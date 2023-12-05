import GithubSignIn from "@/components/connections/github/github-signin";
import UploadWorks from "@/components/modal/upload-works";
import JoinProject from "@/components/project/join-project";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Project } from "@/lib/interfaces";
import Links from "./links";

export default async function ProjectInfo({
  info,
}: {
  info: Project;
}) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
      <h3>Links</h3>
      {
        info.isCreator && (
          <UploadWorks />
        )
      }
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        
        <div>{info.urls && <Links links={info.urls} />}</div>

        {info.isMember ? (
          <section className="flex flex-col gap-4">
            <GithubSignIn />
          </section>
        ) : (
          <JoinProject address={info.id} />
        )}
      </CardContent>
    </Card>
  );
}
