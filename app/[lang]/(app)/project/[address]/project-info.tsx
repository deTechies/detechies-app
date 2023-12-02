import GithubSignIn from "@/components/connections/github/github-signin";
import UploadWorks from "@/components/modal/upload-works";
import JoinProject from "@/components/project/join-project";
import { Card, CardContent } from "@/components/ui/card";
import Links from "./links";
import { ProjectDetailProps } from "./page";


export default async function ProjectInfo({ info }: { info: ProjectDetailProps }) {

  return (
    <Card>
      <CardContent className="flex flex-col gap-8">
        <div>
          {info.urls && <Links links={info.urls} /> }
        </div>
       
       
          {
            info.isMember ? (
              <section className="flex flex-col gap-4">

              <GithubSignIn />
              <UploadWorks />

          </section>
            ) : <JoinProject address={info.id} />
          }
         
      </CardContent>
    </Card>
  );
}
