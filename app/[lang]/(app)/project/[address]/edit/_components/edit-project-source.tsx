import AddGithubRepo from "@/components/connections/github/add-github-repo";
import ImportGithubData from "@/components/connections/github/import-github-data";
import DeleteIcon from "@/components/extra/delete-icon";
import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { serverApi } from "@/lib/data/general";
import { formatDateToTimeAgo } from "@/lib/utils";
import { Github } from "lucide-react";

export default async function EditProjectSource({
  projectId,
}: {
  projectId: string;
}) {
  //now we can add in the repositories and source codes to the project
  const { data: projectSources } = await serverApi(
    `/project-sources/${projectId}`
  );
  
  //if we click on the import data button then we need to add in the data to the project.
  // in the dialog we want to something like a accordion with a select to select all the data entries to be added 
  

  return (
    <Card id="sources">
      <CardHeader>
        <h1>Project Sources</h1>
      </CardHeader>
      <CardContent>
        <table className="table-auto w-full">
          <tbody className="my-4">
            {projectSources.length > 0 &&
              projectSources.map((source: any) => (
                <tr
                  key={source.id}
                  className="border-b border-border-div transition-colors duration-200 ease-in-out cursor-pointer my-4"
                >
                  <td className="p-4">
                    <Github />
                  </td>

                  <td className="p-4">{source.platform_id}</td>
                  <td className="p-4 text-text-secondary text-sm">
                    {source.source_update &&
                      formatDateToTimeAgo(source?.source_update)}
                  </td>

                  <td>
                    <span className="text-text-secondary text-sm">
                      {formatDateToTimeAgo(source.last_update)}
                    </span>
                  </td>
                  <td>
                    <span className="p-4">
                      {source.public ? "Public" : "Private"}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-4 ">
                      <ImportGithubData sourceId={source.id} repoName={source.platform_id} />
                      <DeleteIcon url={`/project-sources/${source.id}`}/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <AddGithubRepo projectId={projectId} />
      </CardContent>
    </Card>
  );
}
