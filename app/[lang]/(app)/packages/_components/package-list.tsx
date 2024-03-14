import EmptyState from "@/components/metronic/custom/empty-state";
import { serverApi } from "@/lib/data/general";
import PackageListItem from "./package-list-item";

export default async function PackageList() {
  const { data: packages } = await serverApi("/packages");

  return (
    <div className="flex flex-col gap-md">
      {packages && packages.length > 0 ? (
        packages.map((pack: any, index: number) => {
          return <PackageListItem key={index} item={pack} />;
        })
      ) : (
        <EmptyState
          title="No Packages"
          subtitle="No packages were found in this project"
        />
      )}
    </div>
  );
}
