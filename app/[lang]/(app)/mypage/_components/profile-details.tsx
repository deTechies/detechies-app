import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Link from "next/link";
import Connections from "../../profile/connections";

interface ProfileDetailsProps {
    profile: any;
    text: any;
}


export default async function ProfileDetails({
    profile, text
}: ProfileDetailsProps) {
  
  return (
    <Card>
        <header className="flex justify-between items-center">
            <h5 className="text-subhead_s capitalize">{text?.profile}</h5>
            <Link href="/mypage/edit">
            <Badge variant="secondary">
                {text?.edit} <Edit className='ml-2 text-text-secondary' size='12'/>
            </Badge>
            </Link>
        </header>
      <CardContent className="flex flex-col gap-8">
        <Connections github={profile?.github} address={profile?.id}/>

        {profile?.profile_details?.description && (
          <section className="border border-border-div rounded-sm flex flex-col p-4 gap-4">
            <h5 className="text-title_m capitalize">{text?.description}</h5>
            <p className="text-body_m">{profile?.profile_details?.description}</p>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
