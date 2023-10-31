import GroupProfileCard from "@/components/group/group-profile-card";
import Link from "next/link";


export default function GroupDetailLayout({
  params,
  children,
}: {
  params: { address: string };
  children: React.ReactNode;
}) {
  return (
    <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-md m-8">
      <div className="col-span-1 flex flex-col gap-4">
        <GroupProfileCard id={params.address} />
        
        <div>
            <Link href={`/group/${params.address}/chat`}>
                Chat
            </Link>
        </div>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-md">{children}</div>
    </main>
  );
}
