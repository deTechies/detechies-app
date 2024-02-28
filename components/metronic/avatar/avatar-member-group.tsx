"use client"
import { useRouter } from "next/navigation";
import Avatar from "./avatar";

export default function AvatarMemberGroup({
  group,
  show = 2,
  size = 12,
}: {
  group: Array<{
    id: string;
    name: string;
    src: string;
  }>;
  show?: number;
  size?: number;
}) {
  const visibleMembers = group.slice(0, show);
  const remainingMembers = group.slice(show);
    const router = useRouter();

  return (
    <div className="flex  -space-x-2">
      {visibleMembers.map((member, index:number) => (
        <div key={member.id} className={`hover:z-20`} onClick={() =>{ router.push(`/profiles/${member.id}`)}}>
          <Avatar src={member.src} size={size} className={`rounded-full`} 
          />
        </div>
      ))}
      {remainingMembers.length > 0 && (
        <div
          className={`w-${size} rounded-full z-10 aspect-square flex items-center justify-center bg-background-layer-2 border hover:z-20`}
        >
          <span>+ {remainingMembers.length}</span>
        </div>
      )}
    </div>
  );
}
