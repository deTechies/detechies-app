import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "lucide-react";

export default function ProjectWorks({ works }: { works: any[] }) {
  
  function isValidLink(s: string): boolean {
    const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(s);
}
  return (
    <Card>
      <CardHeader>
        <h2>Works</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {works.map((work: any, key: number) => (
          <div key={key} className="flex gap-2 justify-between">
            

              {isValidLink(work.description) ? 
              <Link href={work.description} className="text-text-primary">
                {work.description}
              </Link> : <span>{work.description}</span>}


            <Badge variant={"info"}>{work.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
