import { Card } from "@/components/ui/card";
import { getDictionary } from "@/get-dictionary";
import CreateProjectForm from "./create-project";
export default async function ProjectCreatePage({
  params
  
}: {params: any}) {
  //first get the whole project form.

  const dictionary = await getDictionary(params.lang) as any;

  return (
    <main className="w-full max-w-[60rem] mx-auto">
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
