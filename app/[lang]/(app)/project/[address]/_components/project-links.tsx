import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import UploadWorks from "@/components/modal/upload-works";
import { Project } from "@/lib/interfaces";
import Links from "./links";

export default async function ProjectLinks({
  details,
  lang,
}: {
  details: Project;
  lang: any;
}) {

  return (
    <Card className="">
      <CardHeader className="flex items-center justify-between">
        <h3>
          {lang.project.details.links.title}
        </h3>
        {(details.userRole === "member" ||
          details.userRole === "admin" ||
          details.userRole === "client") && (
          <UploadWorks projectId={details.id} lang={lang}/>
        )}
      </CardHeader>

      <CardContent > 
        {details.links.length > 0 ? (
          <Links works={details.links} />
        ) : (
          <p className="text-center truncate text-label_m text-text-secondary">
            {lang.project.details.links.no_links}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
