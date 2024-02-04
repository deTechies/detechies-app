import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectMember, ProjectWork } from "@/lib/interfaces";

export default function ProjectMemberWorkDetails({
  projectMember,
  projectWork,
  lang,
}: {
  projectMember: ProjectMember;
  projectWork: ProjectWork;
  lang: any;
}) {

  return (
    <Card className="flex flex-col flex-wrap gap-5 p-6">
      <CardContent>
        <h4 className="mb-5 text-subhead_s">
          {lang.interface.profession_type[projectWork?.role]}
        </h4>

        <div className="flex flex-col gap-4">
          <section className="flex flex-wrap gap-2">
            {projectWork?.tags?.map((skill, index) => (
              <Badge key={index} shape="outline" variant="accent">
                {skill}
              </Badge>
            ))}

            {projectWork?.tags.length < 1 && (
              <Badge shape="outline" >
                No Tags
              </Badge>
            )}
          </section>
          <span className="flex flex-wrap overflow-hidden text-body_m">
            {projectWork?.description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
