import { Users, WorkflowIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface ProjectItemProps {
    id: string;
    name: string;
    image: string;
    description: string;
    introduction:string;
    status: string;
    creator: string;
    works: any[];
    members: any[];
}

const DEFAULT_DESCRIPTION = "Random description";

export default function ProjectItem({ details }: { details: ProjectItemProps }) {

    return (
        <Link href={`/project/${details.id}`} 
        className="grid grid-cols-4 row gap-6 bg-background-layer-1 rounded-md p-4 items-center hover:shadow-lg border border-border-div">
                <figure className="col-span-1 relative min-w-24 w-full border border-border-div  aspect-square rounded-full bg-accent-secondary object-scale-down">
                    <Image
                        src={`https://ipfs.io/ipfs/${details.image}`}
                        alt={`Project ${details.name}`}
                        fill={true}
                        className="rounded-full"
                    />
                </figure>
                <section className="col-span-3 flex flex-col gap-3 my-2 w-full">
                    <header className="flex justify-between items-center capitalize">
                        <h5 className="text-xl text-text-primary font-medium">{details.name}</h5>
                    </header>
                    <div className="flex gap-8">
                        <div className="flex gap-2 text-text-secondary text-sm font-light items-center">
                            <Users size={16} stroke={"currentColor"} className="text-text-secondary" />
                            {details.members?.length} Members
                        </div>
                        <div className="flex gap-2 text-text-secondary text-sm font-light items-center capitalize">
                            <WorkflowIcon size={16} stroke={"currentColor"} className="text-text-secondary " />
                            {details.works?.length} Works
                        </div>
                    </div>
                    
                    
                </section>

        </Link>
    );
}
