import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { serverApi } from "@/lib/data/general";

export default async function MyUsedPackages({ user }: { user: any }) {
  const { data: packages } = await serverApi(`/users/${user}/packages`);

  packages.sort((a: any, b: any) => b.count - a.count);
  return (
    <Card>
      <CardHeader>Packages used</CardHeader>
      <CardContent className="max-h-[300px] overflow-auto">
        {packages.length > 0 ? (
          <div className="flex flex-row gap-4 flex-wrap">
            {packages.map((pkg: any, index: number) => (
              <div
                key={index}
                className="flex flex-row items-center justify-evenly w-fit rounded-[6px] py-2 gap-2 bg-background-layer-2 px-4 p"
              >
                <div className="flex flex-col gap-1">
                  <span className="sm">{pkg.name}</span>
                  <span className="text-blue-500 text-sm">
                    {pkg.version}
                  </span>
                </div>
              
              </div>
            ))}
          </div>
        ) : (
          <p>No packages</p>
        )}
      </CardContent>
    </Card>
  );
}
