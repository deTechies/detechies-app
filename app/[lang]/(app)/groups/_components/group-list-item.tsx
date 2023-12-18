import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProjectItemProps {
  id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  achievements: any[];
  location: string;
  addr: string;
  creator: string;
  type:string;
  members: any[];
}
export default function GroupListItem({
  details,
}: {
  details: ProjectItemProps;
}) {
  return (
    <Link href={`/groups/${details.id}`}>
      <Card className="flex flex-col items-center bg-black-700 text-[#FEFEFE]">
        <section className="flex flex-col gap-2 my-12 justify-center items-center text-center">
          <Avatar className="w-24 h-24 aspect-square bg-[#C7E2FF]">
            <AvatarImage
              src={`https://ipfs.io/ipfs/${details.image}`}
              alt={details.name}
              className="rounded-full"
            />
            <AvatarFallback className="relative">
              <Image src="/images/careerzen.png" alt="no-item" fill={true} />
            </AvatarFallback>
          </Avatar>
          <header className="flex flex-col gap-2">
            <h5 className="text-heading_s ">{details.name}</h5>
            <span className="text-title_m">{details.type}</span>
          </header>
        </section>
        <div className="flex gap-2 divide-x text-center">
          <div>
            <span className="text-label_s">멤버수</span>
            <span className="text-title_m">{details.members?.length}</span>
          </div>
          <div className="pl-2 text-center">
            <span className="text-label_s">NFTS</span>
            <span className="text-title_m">{details.achievements?.length}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
