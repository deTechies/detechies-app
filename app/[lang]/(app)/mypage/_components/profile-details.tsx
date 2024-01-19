import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import Link from "next/link";
import Connections from "./connections";

interface ProfileDetailsProps {
  profile: any;
  visiting?: boolean;
  text: any;
}

export default async function ProfileDetails({
  visiting=false,
  profile,
  text,
}: ProfileDetailsProps) {
  return (
    <Card className="pt-[28px] px-9 pb-[36px] gap-[20px]">
        <header className="flex justify-between items-center">
            {/* PROFILE LABEL */}
            <h5 className="text-subhead_s capitalize">{text?.profile}</h5>
            {/* EDIT PROFILE BUTTON */}
            {
              !visiting && 
              <Link href="/mypage/edit">
              <Badge variant={"secondary"} shape={"icon"}>
                {text?.edit} <Edit className='ml-2 text-icon-secondary' size='12'/>
              </Badge>
            </Link>
            }
         
        </header>
        
        {/* SECOND ROW FOR OCCUPATION &  SKILLS BADGES*/}
        <div className="inline-flex items-start gap-2 relative">
          {profile.profile_details?.profession ?(
            <div className="!flex-[0_0_auto] inline-flex relative border-[1px] border-state-info text- text-xs font-medium px-2.5 py-0.5 rounded-md dark:border-0 dark:bg-blue-900 dark:text-blue-300">
              {profile.profile_details?.profession as string}
            </div>
          ) : null}
          {profile.profile_details && profile.profile_details.length > 0 && profile.profile_details?.skills.map((skill:string)=>{
            return(
              <div className="!flex-[0_0_auto] border-[1px] border-accent-primary text-accent-primary text-xs font-medium px-2.5 py-0.5 rounded-md dark:border-0 dark:bg-green-900 dark:text-green-300" key={skill}>
                {skill}
              </div>
            )
          })}
        </div>

      {/* Contact info & Intro */}
      <CardContent className="flex flex-col gap-8">
        <Connections github={profile?.github} address={profile?.id} />

        {profile?.profile_details?.description && (
          <section className="border border-border-div rounded-sm flex flex-col p-[16px] gap-[16px]">
            <h5 className="text-title_m capitalize">{text?.description}</h5>
            <p className="text-body_m">
              {profile?.profile_details?.description}
            </p>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
