
import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { getDictionary } from "@/get-dictionary";
import CreateProjectForm from "./create-project";
export default async function ProjectCreatePage({
  params
  
}: {params: any}) {
  //first get the whole project form.

  const dictionary = await getDictionary(params.lang) as any;

  return (
    <main className="w-full max-w-[60rem] mx-auto m-10">
      <Card>
        <CardHeader>
          <h4 className="">
            {dictionary.project.list.create_project.create}
          </h4>
        </CardHeader>
        <CardContent>
          <CreateProjectForm lang={dictionary}/>      
        </CardContent>
      </Card>
    </main>
  )
}
