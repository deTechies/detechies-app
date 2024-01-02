import Search from "@/components/extra/search";
import InlineMemberItem from "@/components/members/inline-member-item";
import { Card } from "@/components/ui/card";

const dummyMembers: any[] = [
  {
    memberId: "M001",
    display_name: "Robin",
    role: "Administrator",
  },
  {
    memberId: "M001",
    display_name: "Robin",
    role: "Administrator",
  },
  {
    memberId: "M001",
    display_name: "Robin",
    role: "Administrator",
  },
  {
    memberId: "M001",
    display_name: "Robin",
    role: "Administrator",
  },
  {
    memberId: "M001",
    display_name: "Robin",
    role: "Administrator",
  },
  // Add more members as needed
];
export default function SearchMember() {
  return (
    <Card>
      <h3 className="text-subhead_s">평가할 멤버 선택하기 (30)</h3>
      <Search placeholder="닉네임 또는 직업을 검색해보세요." />
      <div className="flex flex-col gap-3">
        {dummyMembers.map((details, index) => (
          <InlineMemberItem
            key={index}
            avatar={details.avatar}
            display_name={details.display_name}
            memberId={details.memberId}
            role={details.role}
          />
        ))}
      </div>
    </Card>
  );
}
