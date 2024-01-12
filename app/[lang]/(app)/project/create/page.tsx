import { getDictionary } from "@/get-dictionary";
import CreateProjectForm from "./create-project";
export default async function ProjectCreatePage({
  params
  
}: {params: any}) {
  //first get the whole project form.

  const dictionary = await getDictionary(params.lang) as any;
  // const projectData = await getSingleProject(params.address);

  // console.log('eeee')
  return (
    <main className="m-10 max-w-2xl mx-auto">
      <CreateProjectForm lang={dictionary}/>      
    </main>
  )
}
