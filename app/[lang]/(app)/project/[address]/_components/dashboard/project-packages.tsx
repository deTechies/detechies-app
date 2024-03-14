import { DependenciesList } from "@/components/connections/github/dependencies-list";
import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import EmptyState from "@/components/metronic/custom/empty-state";
import { serverApi } from "@/lib/data/general";

export default async function ProjectPackages({
  projectId,
}: {
  projectId: string;
}) {
  //fix here how we going to retreive teh pacakges
  const { data: packages } = await serverApi(`/project-sources/${projectId}/packages`);

  return (
    <Card className="">
      <CardHeader>Packages</CardHeader>
      <CardContent>
        {packages && packages.length > 0 ? (
          <DependenciesList dependencies={packages} />
        ) : (
          <EmptyState
            title="No Packages"
            subtitle="No packages were found in this project"
          />
        )}
      </CardContent>
    </Card>
  );
}
