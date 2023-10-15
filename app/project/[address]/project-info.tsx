import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Links from "./links";

export interface InfoProps {
  type: string;
  owner: string;
  workers: string[];
  urls: string[];
  location: string;
}
export default function ProjectInfo({ info }: { info: InfoProps }) {
  const links = ["https://github.com/tse-lao", "https://www.figma.com/file/HRDJ9JdplVUOoY1v01u7pY/Careerzen_UI?node-id=364%3A4798&mode=dev"];
  
  
  return (
    <Card>
      <CardContent className="flex flex-col gap-8">
        <section className="grid grid-cols-2 text-sm gap-4">
          <dd>
            <h6 className="mb-2 font-medium">Category</h6>
            <span className="text-text-secondary">
              {info.type ? info.type : "Side Project "}
            </span>
          </dd>
          <dd>
            <h6 className=" mb-2 font-medium">Owner</h6>
            <span className="text-text-secondary">
              {info.owner ? info.owner : "Careerzen Member"}
            </span>
          </dd>
          <dd>
            <h6 className="mb-2 font-medium">Members</h6>
            <span className="text-text-secondary">
              {info.workers ? info.workers.length : 0}
            </span>
          </dd>
          <dd>
            <h6 className=" mb-2 font-medium">Location</h6>
            <span className="text-text-secondary">
              {info.location ? info.location : "Everywhere"}
            </span>
          </dd>
        </section>

        <Links links={info.urls} />

        <Button className="col-span-2 w-full">Join Project</Button>
      </CardContent>
    </Card>
  );
}
