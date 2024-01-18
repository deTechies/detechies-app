import { getDictionary } from "@/get-dictionary";
import CreateProjectForm from "./create-project";
import { Card } from "@/components/ui/card";
export default async function ProjectCreatePage({
  params
  
}: {params: any}) {
  //first get the whole project form.

  const dictionary = await getDictionary(params.lang) as any;
  // const projectData = await getSingleProject(params.address);

  // console.log('eeee')
  return (
    <main className="w-full max-w-[60rem] mx-auto my-10">
      <Card className="gap-0 py-10 px-14">
        <header className="flex flex-col mb-10">
          <h4 className="mb-3 text-heading_s">
            {dictionary.project.list.create_project.create}
          </h4>

          <span className="mb-1 text-body_s text-state-error">
            {dictionary.group.create.required_text}
          </span>
        </header>

        <CreateProjectForm lang={dictionary}/>      
      </Card>
    </main>
  )
}
