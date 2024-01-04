import { getSingleProject } from "@/lib/data/project";
import DeleteProject from "./delete-project";
import ProjectEditForm from "./project-edit-form";

export default async function ProjectEditPage({
  params
}: {params: any}) {
  //first get the whole project form.

  
  const projectData = await getSingleProject(params.address);


  return (
    <main className="m-10 max-w-2xl mx-auto">
      <ProjectEditForm defaultValues={projectData}/>      
      <DeleteProject projectData={projectData}/>
    </main>
  )
}
