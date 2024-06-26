
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProjectItemProps {
  id:string;
  name: string;
  image: string;
  description: string;
  status: string;
  achievements: any[];
  location: string;
  addr: string;
  creator: string;
  members: any[];
}
export default function GroupListItem({
  details,
}: {
  details: ProjectItemProps;
}) {
  

  return (
    <Link href={`/groups/${details.id}`}>
      <Card className="flex flex-row gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={`https://ipfs.io/ipfs/${details.image}`}
            alt={details.name}
            className="rounded-full"
          />
          <AvatarFallback className="relative">
            <Image 
                src="/images/detechies.png"
                alt="no-item"
                fill={true}
            />
        </AvatarFallback>
        </Avatar>
        <section className="flex flex-col w-full gap-2 prose">
          <header className="flex items-center justify-between prose">
            <h5>{details.name}</h5>
          </header>
          <div className="flex gap-2">
            <Badge className="bg-accent-secondary text-accent-primary">
              {details.members?.length} Members
            </Badge>
            <Badge className="bg-state-info-secondary text-state-info">
              {details.achievements?.length} NFTS
            </Badge>
          </div>
        </section>
      </Card>
    </Link>
  );
}
