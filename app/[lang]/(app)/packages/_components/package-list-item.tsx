import { Card, CardContent } from "@/components/metronic/card/card";

interface PackageItem {
  name: string;
  sourcesCount: number;
  contributorsCount: number;
}
interface PackageListItemProps {
  item: PackageItem;
}

export default function PackageListItem({ item }: { item: any }) {
  return (
    <Card className="">
      <CardContent className="p-2 flex flex-row gap-4 justify-between px-8 items-center">
        <div>
          <span>{item.name}</span>
        </div>
        <div className="flex gap-4">
          <CountItem count={item.sourcesCount} title="Sources" />
          <CountItem count={item.contributorsCount} title="Contributors" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CountItem({ count, title }: { count: number; title: string }) {
  return (
    <div className="border border-dashed border-border-div flex flex-col gap-[7px] rounded-sm py-2 px-3">
      <span className="text-md font-medium">{count}</span>
      <span className="text-text-secondary text-sm">{title}</span>
    </div>
  );
}
