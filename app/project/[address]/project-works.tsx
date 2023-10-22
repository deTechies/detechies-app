import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProjectWorks({ works }: { works: any[] }) {
  return (
    <Card>
      <CardHeader>
        <h2>Works</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {works.map((work: any, key: number) => (
          <div key={key} className="flex gap-2 justify-between">
            <span className="text-text-primary capitalize">
              {work.description}
            </span>

            <Badge variant={"info"}>{work.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
