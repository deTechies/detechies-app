import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
            <h5 className="text-subhead_s capitalize">{text?.mypage.main.profile}</h5>
            {/* EDIT PROFILE BUTTON */}
            {
              !visiting && 
              <Link href="/mypage/edit">
              <Badge variant={"secondary"} shape={"icon"}>
                {text?.mypage.main.edit} <Edit className='ml-2 text-icon-secondary' size='12'/>
              </Badge>
            </Link>
            }
         
        </header>
        
        {/* SECOND ROW FOR OCCUPATION &  SKILLS BADGES*/}
        <div className="inline-flex items-start gap-2 relative">
          {profile.profile_details?.profession ?(
            <Badge variant={"info"} shape={"outline"}>
              {text.interface.profession_type?.[profile.profile_details?.profession]}
            </Badge>
          ) : null}
          {profile.profile_details && profile.profile_details?.skills.map((skill:string)=>{
            return(
              <Badge variant="accent" shape="outline" key={skill}>
                {skill}
              </Badge>
            )
          })}
        </div>

      {/* Contact info & Intro */}

        <Connections github={profile?.github} address={profile?.id} />

        {profile?.profile_details?.description && (
          <section className="border border-border-div rounded-sm flex flex-col p-4 gap-4">
            <h5 className="text-title_m capitalize">{text?.mypage.main.description}</h5>
            <p className="text-body_s">
              {profile?.profile_details?.description}
            </p>
          </section>
        )}

    </Card>
  );
}
