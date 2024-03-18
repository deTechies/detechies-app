import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import UploadWorks from "@/components/modal/upload-works";
import { serverApi } from "@/lib/data/general";
import { Project } from "@/lib/interfaces";

import ImportGithubData from "@/components/connections/github/import-github-data";
import { Github } from "detechies-icons";
import { VerifiedIcon } from "lucide-react";
import Link from "next/link";
import Links from "../links";

export default async function ProjectLinks({
  details,
  lang,
}: {
  details: Project;
  lang: any;
}) {
  //getting also all the sources
  const { data: projectSources } = await serverApi(
    `/project-sources/${details.id}`
  );

  return (
    <Card className="">
      <CardHeader className="flex items-center justify-between">
        <h3>Links</h3>
        {(details.userRole === "member" ||
          details.userRole === "admin" ||
          details.userRole === "client") && (
          <UploadWorks projectId={details.id} lang={lang} />
        )}
      </CardHeader>

      <CardContent>
        {details.links.length > 0 && (
          <Links works={details.links} />
        )}
        {projectSources &&
          projectSources.length > 0 &&
          projectSources.map((source: any, index: number) => (
            <div key={index} className="flex flex-wrap gap-4 items-center py-2">
              <div className="rounded-full h-8 w-8 bg-background-layer-2 flex items-center justify-center">
                <Github  fontSize={24} />
              </div>
              <Link
                href={`https://github.com/${source.platform_id}`}
                className="text-sm"
                target="_blank"
              >
                {source.platform_id}
              </Link>

              {source.contributors && source.contributors?.length > 0 ? (
                <VerifiedIcon className="text-state-success" size="24" />
              ) : (
                <ImportGithubData sourceId={source.id} repoName={source.platform_id} />
              )}
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
