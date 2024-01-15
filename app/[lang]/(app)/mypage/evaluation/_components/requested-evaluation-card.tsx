import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { SurveyResponse } from "@/lib/interfaces";

import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import ProjectWorkDetail from "../../../project/_components/project-work-detail";

export default function RequestedEvaluationCard({
    data,
    }: {
    data: SurveyResponse;
}) {
  return (
    <Link href={`/work/${data.projectWork.workId}`} passHref>
    <Card className="overflow-hidden">
        <div className="flex gap-4">
            <div className="relative w-24 aspect-square bg-background-layer-2 rounded-sm">
                <IPFSImageLayer hashes={data.evaluator.user.avatar ? data.evaluator.user.avatar : defaultAvatar} />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                    <h4 className="text-title_m mb-4">{data.evaluator.project.name}</h4>
                    {
                        data.status === "pending" && <Badge  variant={"accent"} className="uppercase">{data.status}</Badge>
                    } 
                    {
                        data.status === "requested" && <Badge  variant={"info"} className="uppercase">{data.status}</Badge>
                    }
                    {
                        data.status === "finished" && <div className="w-[200px]"><Progress value={60} /></div>
                    }
                    {
                        data.status === "draft" && <Badge   variant={"success"} className="uppercase">{data.status}</Badge>
                    }
                </div>
                <div className="text-label_m flex flex-col ">
                    <span className="mb-2">Review by: {data.evaluator.user.display_name} | {data.projectWork.projectMember.user.display_name}</span>
                <ProjectWorkDetail data={data.projectWork} showTags={false}/>
                </div>
           
            </div>
        </div>

    </Card>
    </Link>
  )
}