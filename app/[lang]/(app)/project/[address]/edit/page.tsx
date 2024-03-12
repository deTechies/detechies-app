
import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { getDictionary } from "@/get-dictionary";
import { serverApi } from "@/lib/data/general";
import DeleteProject from "./_components/delete-project";
import EditProjectSource from "./_components/edit-project-source";
import ProjectEditForm from "./_components/project-edit-form";
export default async function ProjectEditPage({ params }: { params: any }) {
  //first get the whole project form.

  const dictionary = (await getDictionary(params.lang)) as any;
  const {data: projectData} = await serverApi(`/projects/${params.address}`);

  return (
    <main className="w-full mx-auto flex flex-col gap-md">
      <Card id="project-settings">
        <CardHeader>
          <h4>
            {dictionary.project.list.edit_project}
          </h4>
        </CardHeader>
        <CardContent>
        <ProjectEditForm defaultValues={projectData} lang={dictionary} />
        </CardContent>
      </Card>
    
      <EditProjectSource projectId={params.address}/>
      <Card>
        <CardHeader>
          <h4>
            Project Deletion
          </h4>
        </CardHeader>
        <CardContent>
          <DeleteProject projectData={projectData} lang={dictionary} />
        </CardContent>
      </Card>
    </main>
  );
}
