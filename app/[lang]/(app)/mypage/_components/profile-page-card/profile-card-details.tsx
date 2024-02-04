import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfileCardDetails({
  profile,
  dictionary,
}: {
  profile: any;
  dictionary: any;
}) {
    
    const text = dictionary.mypage.profile;
  return (
    <div className="flex flex-col justify-between basis-auto mt-1">
      <div className="flex flex-col gap-3">
        <p className="text-title_l">#{profile.display_name}</p>
        <div className="text-title_m mb-4">
          <span className="capitalize">{text.name}: </span>
          <span className="ml-">
            {profile.profile_details?.full_name
              ? profile.profile_details?.full_name
              : "Not Set"}
          </span>
        </div>
      </div>
      <Link href="/mypage/avatar" passHref>
        <Button variant={"secondary"} size="sm">
          {text?.avatar_settings}
        </Button>
      </Link>
    </div>
  );
}
