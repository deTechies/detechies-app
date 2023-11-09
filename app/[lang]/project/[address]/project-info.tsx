import GithubSignIn from "@/components/connections/github/github-signin";
import UploadWorks from "@/components/modal/upload-works";
import { Card, CardContent } from "@/components/ui/card";
import { truncateMiddle } from "@/lib/utils";
import { getSession } from "next-auth/react";
import ProjectMembers from "./project-members";
import ProjectNfts from "./project-nfts";

export interface InfoProps {
  id: string;
  type: string;
  owner: string;
  creator: string;
  workers: string[];
  members: any[];
  urls: string[];
  location: string;
}
export default async function ProjectInfo({ info }: { info: InfoProps }) {
  const session = await getSession();
  return (
    <Card>
      <CardContent className="flex flex-col gap-8">
        <section className="grid grid-cols-2 gap-4">
          <dd>
            <h6 className="text-subhead_s">Category</h6>
            <span className="text-text-secondary text-title_l capitalize">
              {info.type ? info.type : "Side Project "}
            </span>
          </dd>
          <dd>
            <h6 className="text-subhead_s">Owner</h6>
            <span className="text-text-secondary text-title_l">
              {info.creator
                ? truncateMiddle(info.creator, 16)
                : "Careerzen Member"}
            </span>
          </dd>
        </section>
        <section>
          <ProjectNfts address={info.id} />
        </section>
        <section>
          <ProjectMembers members={info.members} creator={info.creator} />
        </section>
        <section className="grid grid-cols-2">
          <>
            <GithubSignIn />
            <UploadWorks />
          </>
        </section>
      </CardContent>
    </Card>
  );
}
