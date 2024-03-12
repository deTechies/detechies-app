import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { serverApi } from "@/lib/data/general";

export default async function ContributorsCard({
  projectId,
}: {
  projectId: string;
}) {
  //getting all the sources and the contributors
  const {data: projectSources} = await serverApi(
    `/project-sources/${projectId}/contributors`
  );

  console.log(projectSources);

  return (
    <Card>
      <CardHeader>Contributors ({projectSources?.length})</CardHeader>
      <CardContent>
        {projectSources?.length > 0 &&
          projectSources.map((contributor: any, index: number) => {
            return (
              <div key={index} className="flex flex-row items-center border-b border-border-div first:border-t justify-between py-4 px-8">
                <p>{contributor.username}</p>
                <span className="text-text-secondary">{contributor.totalCommits}</span>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
