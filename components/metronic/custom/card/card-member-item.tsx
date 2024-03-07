"use client"
import { ClubMember } from "@/lib/interfaces";
import { addURL } from "@/lib/utils";
import Avatar from "../../avatar/avatar";


export default function CardMemberItem({details}: {details:ClubMember}) {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        shape="rounded"
        size={12}
        src={addURL(details.user.avatar_link)}
      />
      <div className="flex gap-2 flex-col">
        <span className=" font-semibold">
          {details.user.display_name}
        </span>
        <span className="text-sm font-medium text-gray-500">{details.user.profile_details?.profession ? details.user.profile_details.profession : "member"}</span>
      </div>
    </div>
  );
}
