import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProjectMember } from "@/lib/interfaces";

export default function ProjectMemberWorkDetails({projectMember}: {projectMember: ProjectMember}) {
  return (
    <Card className="p-6 flex flex-col gap-5">
        <h4 className="text-subhead_s">
            {projectMember.role}
        </h4>
        <div className="flex flex-col gap-4">
        <section>
            {
                projectMember.works[0].tags?.map((skill, index) => (
                    <Badge key={index} className="text-label_m">{skill}</Badge>
                ))
            }
        </section>
        <span className="text-body_m">
           {projectMember.works[0].description}
        </span>
        </div>
      
    </Card>
  )
}
