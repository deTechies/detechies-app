import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { isValidLink, truncateMiddle } from "@/lib/utils";
import Link from "next/link";


export default function ProjectWorks({ works }: { works: any[] }) {
  return (
    <Card>
      <CardHeader>
        <h2>Works</h2>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {works.map(({ id, description, status }) => (
            <li key={id || description} className="flex gap-4 justify-between overflow-auto">
              {isValidLink(description) ? (
                <Link href={description}  className="text-text-primary" rel="noopener noreferrer">
                    {description}
                </Link>
              ) : (
                <span>{truncateMiddle(description, 24)}</span>
              )}

              <Badge variant={"info"}>{status}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
