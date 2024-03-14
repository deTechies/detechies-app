"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface ProfileDetailsProps {
  profile: any;
  visiting?: boolean;
  text: any;
}

export default function ProfileDetails({
  visiting = false,
  profile,
  text,
}: ProfileDetailsProps) {
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("updated") === "true") {
      router.refresh();
    }
  }, [router, searchParams]);

  return (
    <Card className="pt-[28px] px-9 pb-[36px] gap-[20px]">
      <header className="flex items-center justify-between">
        {/* PROFILE LABEL */}
        <h5 className="capitalize text-subhead_s">
          {text?.mypage.main.profile}
        </h5>
        {/* EDIT PROFILE BUTTON */}
        {!visiting && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              router.push("/mypage/edit");
            }}
          >
            {text?.mypage.main.edit}{" "}
            <Edit className="ml-2 text-icon-secondary" size="12" />
          </Button>
        )}
      </header>

      {/* SECOND ROW FOR OCCUPATION &  SKILLS BADGES*/}
      <div className="relative flex flex-wrap gap-2">
        {profile.profile_details?.profession ? (
          <Badge variant={"info"} shape={"outline"}>
            {
              text.interface.profession_type?.[
                profile.profile_details?.profession
              ]
            }
          </Badge>
        ) : null}
        {profile.profile_details &&
          (profile.profile_details?.skills || []).map((skill: string) => {
            return (
              <Badge variant="accent" shape="outline" key={skill}>
                {skill}
              </Badge>
            );
          })}
      </div>

      {/* Contact info & Intro */}

      {profile?.profile_details?.description && (
        <section className="flex flex-col gap-4 p-4 border rounded-sm border-border-div">
          <h5 className="capitalize text-title_m">
            {text?.mypage.main.description}
          </h5>
          <p className="text-body_s">{profile?.profile_details?.description}</p>
        </section>
      )}
    </Card>
  );
}
