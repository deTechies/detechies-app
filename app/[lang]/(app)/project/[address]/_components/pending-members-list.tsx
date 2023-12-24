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
    <Card>
      <CardHeader>
        <h4 className="text-subhead_s">Waiting list</h4>
      </CardHeader>
      {!!pendingMembers.length &&
        pendingMembers.map((member:any, index: number) => (
          <PendingMemberItem
            key={index}
            name={member.user.display_name}
            id={member.id}
            status={member.status}
            image="https://ipfs.io/ipfs/bafybeidutyodk6auwqx26rieisxwmnen6tgfcyqmj4s5bwlg3omehjrke4"
            role={member.role}
          />
        ))}
    </Card>
  );
}
