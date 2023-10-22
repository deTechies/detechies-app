"use client"
import Search from "@/components/extra/search";
import Loading from "@/components/loading";
import useFetchData from "@/lib/useFetchData";
import { useSearchParams } from "next/navigation";
import ProjectItem from "./project-item";


interface ProjectItemProps {
  id: string;
  name: string;
  image: string;
  description: string;
  status: string;
  location: string;
  creator: string;
  members: string[];
}

export default function ProjectListPage() {
  
  const {data, loading, error} = useFetchData<ProjectItemProps[]>("/project/all");
  const searchParams = useSearchParams()!
  const search = searchParams.get("search");
  
  if(loading) return <Loading />
  if(error) return <div>{JSON.stringify(error)}</div>
  if(!data) return <div>No projects found</div>
  const filteredData = search
  ? data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
    ): data;
  
  return (
    <main className="m-6 flex flex-col gap-8 w-full">
    <Search placeholder="search"/>
    
    <section className="grid grid-cols-2 gap-4">
    {
      filteredData ? filteredData.map((item:ProjectItemProps, index: number) => (
        <ProjectItem key={index} details={item} />
      )): (
        <div>No projects found</div>
      )
    }
    </section>
    </main>
    
  )
}
