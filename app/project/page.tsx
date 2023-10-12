"use client"
import Search from "@/components/extra/search";
import { Card } from "@/components/ui/card";
import useFetchData from "@/lib/useFetchData";
import ProjectItem from "./project-item";


interface ProjectItemProps {
  name: string;
  image: string;
  description: string;
  status: string;

      location: string;
  members: string[];
}

export default function ProjectListPage() {
  
  const {data, loading, error} = useFetchData<ProjectItemProps[]>("/group/all");
  
  if(loading) return <div>Loading...</div>
  if(error) return <div>{JSON.stringify(error)}</div>
  
  return (
    <main className="m-6 flex flex-col gap-8">
    <Card>
      <Search placeholder="search"/>
    </Card>
    
    <section className="grid grid-cols-2 gap-4">
    {
      data ? data.map((item:ProjectItemProps, index: number) => (
        <ProjectItem key={index} details={item} />
      )): (
        <div>No projects found</div>
      )
    }
    </section>
    </main>
    
  )
}
