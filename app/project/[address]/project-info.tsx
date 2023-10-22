import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAccount } from "wagmi";
import Links from "./links";

export interface InfoProps {
  type: string;
  owner: string;
  members: string[];
  urls: string[];
  location: string;
}
export default function ProjectInfo({ info }: { info: InfoProps }) {
  const {address} = useAccount();

  
  
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
              {info.members ? info.members.length : 0}
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
        {address && info.members?.includes(address.toString()) && 
        <Button className="col-span-2 w-full">Upload Works</Button>
        }
      </CardContent>
    </Card>
  );
}
