import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import EmptyState from "@/components/metronic/custom/empty-state";
import { serverApi } from "@/lib/data/general";

export default async function MyUsedPackages({ user }: { user: any }) {
  const { data: packages } = await serverApi(`/packages/${user}`);

  packages.sort((a: any, b: any) => b.count - a.count);

  
  return (
    <Card className="max-h-[400px]">
      <CardHeader>Solutions used ({packages.length}) </CardHeader>
      <CardContent className=" overflow-auto p-0">
        {packages.length > 0 ? (
          <div className="flex flex-col flex-wrap">
            {packages.map((pkg: any, index: number) => (
              <div
                className="flex py-4 px-8 border-b border-border-div w-full hover:text-accent-primary cursor-pointer hover:bg-background-layer-2 last:rounded-b-[10px] last:border-b-0"
                key={index}
              >
                <span className="sm">{pkg.name}</span>
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
