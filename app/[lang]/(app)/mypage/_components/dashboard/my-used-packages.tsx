import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import EmptyState from "@/components/metronic/custom/empty-state";
import { serverApi } from "@/lib/data/general";

export default async function MyUsedPackages({ user }: { user: any }) {
  const { data: packages } = await serverApi(`/users/${user}/packages`);

  packages.sort((a: any, b: any) => b.count - a.count);

  return (
    <Card className="max-h-[400px]">
      <CardHeader>Packages used</CardHeader>
      <CardContent className=" overflow-auto p-0">
        {packages.length > 0 ? (
          <div className="flex flex-col flex-wrap">
            {packages.map((pkg: any, index: number) => (
              <div
                className="flex flex-row gap-1 py-4 px-8 border-b border-border-div w-full justify-between"
                key={index}
              >
                <span className="sm">{pkg.name}</span>
                <span className="text-blue-500 text-sm text-end">
                  {pkg.version}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="m-4">
            <EmptyState title="No Packages" subtitle="No packages were found" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
