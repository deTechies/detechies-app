import UploadWorks from "@/components/modal/upload-works";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="px-6 pt-6 pb-7 gap-7">
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-subhead_s">
          {lang.project.details.links.title}
        </h3>
        {(details.userRole === "member" ||
          details.userRole === "admin" ||
          details.userRole === "client") && (
          <UploadWorks projectId={details.id} lang={lang}/>
        )}
      </CardHeader>

      <CardContent> 
        {details.links.length < 0 ? (
          <Links works={details.links} />
        ) : (
          <p className="text-center text-label_m text-text-secondary">
            {lang.project.details.links.no_links}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
