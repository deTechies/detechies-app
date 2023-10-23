import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { isValidLink } from "@/lib/utils";
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
            <li key={id || description} className="flex gap-4 justify-between">
              {isValidLink(description) ? (
                <Link href={description}>
                  <a className="text-text-primary" rel="noopener noreferrer">
                    {description}
                  </a>
                </Link>
              ) : (
                <span>{description}</span>
              )}

              <Badge variant={"info"}>{status}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
