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


  return (
    <Card>
      <CardHeader>Contributors ({projectSources?.length})</CardHeader>
      <CardContent className="p-0">
        {projectSources?.length > 0 &&
          projectSources.map((contributor: any, index: number) => {
            return (
              <div key={index} className="flex flex-row items-center border-b border-border-div last:rounded-b-[10px] last:border-b-0 justify-between py-4 px-8 hover:bg-background-layer-2">
                <p>{contributor?.username}</p>
                <span className="text-text-secondary">{contributor?.commits}</span>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
