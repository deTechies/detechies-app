import AddMemberModal from "@/components/extra/add-member";
import MemberListItem from "@/components/members/member-list-item";
import { Address } from "wagmi";

export default function ProjectMembers({
  members,
  isCreator,
  contract
}: {
  members: any[];
  isCreator: boolean;
  contract: string;
}) {
  //getting all the members and holders of this project NFT.

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h5 className="text-subhead_s text-text-primary font-medium">Members</h5>
        {isCreator && <AddMemberModal type="project" />}
      </header>
      <div className="flex flex-col gap-4">
        {members &&
          members.map((member, index) => (
            <MemberListItem
              key={index}
              userAddress={member.address as Address}
            />
          ))}
      </div>
      
      
    </section>
  );
}
