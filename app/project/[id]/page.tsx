"use client"
import useFetchData from "@/lib/useFetchData";
import { useParams } from "next/navigation";
import ProjectChat from "./project-chat";
import ProjectDetail from "./project-detail";
import ProjectInfo from "./project-info";

export interface ProjectDetailProps {
    image: string
    name: string, 
    description: string, 
    url: string, 
    timestamp: number, 
}
export default function ProjectDetailPage() {
    //get the params for checking the profile details page. 
    const {id} = useParams();
    const {data, loading, error}= useFetchData<any[]>('/project/all');
    
    

    //TODO: build the setup of the page to make it look nice. 
  return (
    <main className="grid grid-cols-3 m-8 gap-8">
        <section className="col-span-2 flex flex-col gap-8">
           {data && <ProjectDetail details={data[0]}/>}
           
           <ProjectChat />
        </section>
        <section className="col-span-1">
            {data && <ProjectInfo info={data[0]} />}
        </section>
        
    </main>
  )
}
