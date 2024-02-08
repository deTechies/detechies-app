import { getSingleProject } from "@/lib/data/project";
import DeleteProject from "./delete-project";
import ProjectEditForm from "./project-edit-form";
import { getDictionary } from "@/get-dictionary";
import { Card } from "@/components/ui/card";
export default async function ProjectEditPage({ params }: { params: any }) {
  //first get the whole project form.

  const dictionary = (await getDictionary(params.lang)) as any;
  const projectData = await getSingleProject(params.address);

  return (
    <main className="w-full max-w-[60rem] mx-auto">
      <Card className="gap-0 py-10 px-14">
        <header className="flex flex-col mb-10">
          <h4 className="mb-3 text-heading_s">
            {dictionary.project.list.edit_project}
          </h4>

          <span className="mb-1 text-body_s text-state-error">
            {dictionary.group.create.required_text}
          </span>
        </header>

        <ProjectEditForm defaultValues={projectData} lang={dictionary} />
      </Card>

      <DeleteProject projectData={projectData} lang={dictionary} />
    </main>
  );
}
