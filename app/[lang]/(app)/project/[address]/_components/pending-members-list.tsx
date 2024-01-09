import PendingMemberItem from "@/components/members/pending-member-item";
import { Card, CardHeader } from "@/components/ui/card";
import { getPendingProjectMembers } from "@/lib/data/project";

export default async function PendingMemberList({
  projectId,
  userRole,
}: {
  projectId: string;
  userRole: string;
}) {
  let pendingMembers: any[] = [];

  if (userRole == "admin") {
    pendingMembers = await getPendingProjectMembers(projectId);
  }

  return (
    <Card className="gap-0 px-6 pt-6 pb-7">
      <CardHeader className="mb-6">
        <h4 className="text-subhead_s">
          {/* Waiting list */}
          참여 승인 대기중
        </h4>
      </CardHeader>

      <div className="flex flex-col gap-3">
        {!!pendingMembers.length &&
          pendingMembers.map((member: any, index: number) => (
            <PendingMemberItem key={index} member={member} />
          ))}

        {(!pendingMembers.length || pendingMembers.length < 1) && (
          <p className="text-center text-label_m text-text-secondary">
            참여 대기중인 사람이 없어요.
          </p>
        )}
      </div>
    </Card>
  );
}
