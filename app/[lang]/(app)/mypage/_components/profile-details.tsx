import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Link from "next/link";
import Connections from "../../profile/connections";

interface ProfileDetailsProps {
    profile: any
}


export default async function ProfileDetails({
    profile
}: ProfileDetailsProps) {

  return (
    <Card>
        <header className="flex justify-between items-center">
            <h5>Profile</h5>
            <Link href="/mypage/edit">
            <Badge variant="secondary">
                Edit <Edit className='ml-2 text-text-secondary' size='12'/>
            </Badge>
            </Link>
        </header>
      <CardContent className="flex flex-col gap-8">
        {profile?.description && (
          <section className="border border-border-div rounded-sm flex flex-col px-4 py-3 gap-3">
            <h5 className="text-normal text-text-primary font-medium">Description</h5>
            <p>{profile?.description}</p>
          </section>
        )}
       <Connections github={profile?.github} address={profile?.id}/>
      </CardContent>
    </Card>
  );
}
