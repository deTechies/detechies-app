import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LocateFixedIcon, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

interface ProjectItemProps {
    id: string;
    name: string;
    image: string;
    description: string;
    status: string;
    location: string;
    creator: string;
    members: any[];
}

const DEFAULT_DESCRIPTION = "Random description";

export default function ProjectItem({ details }: { details: ProjectItemProps }) {
    const { address } = useAccount();
    const normalizedAddress = address?.toLowerCase();

    return (
        <Link href={`/project/${details.id}`}>
            <Card className="flex flex-row gap-4">
                <figure className="relative h-20 w-20 rounded-full bg-accent-secondary object-fit">
                    <Image
                        src={`https://ipfs.io/ipfs/${details.image}`}
                        alt={`Project ${details.name}`}
                        layout="fill"
                        className="rounded-full"
                    />
                </figure>
                <section className="flex flex-col gap-2 w-full prose">
                    <header className="flex justify-between items-center prose">
                        <h5>{details.name}</h5>
                        {details.creator === normalizedAddress && <Badge variant="info" className="ml-2">Owner</Badge>}
                    </header>
                    <div className="flex gap-8">
                        <span className="flex gap-2 text-text-secondary capitalize first-line:text-sm items-center">
                            <LocateFixedIcon />
                            {details.location}
                        </span>
                        <div className="flex gap-2 text-text-secondary text-sm items-center">
                            <UserCheck />
                            {details.members?.length} Members
                        </div>
                    </div>
                    <p>
                        {details.description || DEFAULT_DESCRIPTION}
                    </p>
                </section>
            </Card>
        </Link>
    );
}
