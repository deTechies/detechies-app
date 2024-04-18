



import ImportGithubData from "@/components/connections/github/import-github-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { serverApi } from "@/lib/data/general";
import { Github, Verify } from "detechies-icons";
import Link from "next/link";
import Links from "../links";


export default async function ProjectLinks({
  details,
}: {
  details: any;
}) {
  //getting also all the sources
  const { data: projectSources } = await serverApi(
    `/project-sources/${details.id}`
  );

  return (
    <Card className="">
      <CardHeader className="flex items-center justify-between">
        <h3>Links</h3>
      </CardHeader>

      <CardContent>
        {details.links.length > 0 && (
          <Links works={details.links} />
        )}
        {projectSources &&
          projectSources.length > 0 &&
          projectSources.map((source: any, index: number) => (
            <div key={index} className="flex flex-wrap text-gray-700 hover:text-gray-900 gap-4 items-center py-2">
              <Github fontSize="16" />
              <Link
                href={`https://github.com/${source.platform_id}`}
                className="text-sm"
                target="_blank"
              >
                {source.platform_id}
              </Link>

              {source.contributors && source.contributors?.length > 0 ? (
                <Verify color="#1B84FF" fontSize="16" />
              ) : (
                <ImportGithubData sourceId={source.id} repoName={source.platform_id} />
              )}
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
