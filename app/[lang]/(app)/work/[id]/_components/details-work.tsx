import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectMember, ProjectWork } from "@/lib/interfaces";

export default function ProjectMemberWorkDetails({
  projectMember,
  projectWork 
}: {
  projectMember: ProjectMember;
  projectWork: ProjectWork
}) {
  return (
    <Card className="p-6 flex flex-col gap-5 flex-wrap">
      <CardContent>
        <h4 className="text-subhead_s">{projectMember?.role}</h4>
        <div className="flex flex-col gap-4">
          <section>
            {projectWork?.tags?.map((skill, index) => (
              <Badge key={index} className="text-label_m">
                {skill}
              </Badge>
            ))}
          </section>
          <span className="flex text-body_m flex-wrap overflow-hidden">
            {projectWork?.description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
