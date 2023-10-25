import GithubSignIn from "@/components/connections/github/github-signin";
import UploadWorks from "@/components/modal/upload-works";
import { Card, CardContent } from "@/components/ui/card";
import { useAccount } from "wagmi";

export interface InfoProps {
  type: string;
  owner: string;
  workers: string[];
  members: any[];
  urls: string[];
  location: string;
}
export default function ProjectInfo({ info }: { info: InfoProps }) {
  const {address} = useAccount();
  
  

  const workers = info.members?.map(member => member.address);

  
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
              {workers ? workers.length : 0}
            </span>
          </dd>
          <dd>
            <h6 className=" mb-2 font-medium">Location</h6>
            <span className="text-text-secondary">
              {info.location ? info.location : "Everywhere"}
            </span>
          </dd>
        </section>
        <section>
          <GithubSignIn />
        </section>

    
        {address && workers?.includes(address.toLowerCase()) && 
          <UploadWorks />
        }
      </CardContent>
    </Card>
  );
}
