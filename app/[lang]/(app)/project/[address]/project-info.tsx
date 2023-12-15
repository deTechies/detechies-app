import UploadWorks from "@/components/modal/upload-works";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Project } from "@/lib/interfaces";
import Links from "./links";

export default async function ProjectInfo({
  info,
}: {
  info: Project;
}) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
      <h3>Links</h3>
      {
        (info.userRole === 'member' || info.userRole === 'admin') && (
          <UploadWorks />
        )
      }
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {info.urls && <Links links={info.urls} />}
      </CardContent>
    </Card>
  );
}
