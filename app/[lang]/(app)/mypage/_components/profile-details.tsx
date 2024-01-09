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
              <div className="flex bg-slate-200 text-black text-xs font-medium me-2 px-3 py-1 rounded-md dark:bg-slate-100 dark:text-slate-500 capitalize">
                {text?.edit} <Edit className='ml-2 text-text-secondary' size='12'/>
              </div>
            </Link>
        </header>
        <div className="flex">
          <div className="border-[1px] border-blue-400 text-blue-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded-md dark:border-0 dark:bg-blue-900 dark:text-blue-300">
            {profile.profile_details?.profession as string}
          </div>
          {profile.profile_details?.skills.map((skill:string)=>{
            return(
              <div className="border-[1px] border-green-500 text-green-500 text-xs font-medium me-2 px-2.5 py-0.5 rounded-md dark:border-0 dark:bg-green-900 dark:text-green-300">
                {skill}
              </div>
            )
          })}

        </div>
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


