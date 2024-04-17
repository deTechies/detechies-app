import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfileCardDetails({
  profile,
  dictionary,
}: {
  profile: any;
  dictionary: any;
}) {
    
    const text = dictionary.mypage.profile;
  return (
    <div className="flex flex-col justify-between basis-auto mt-1 mx-auto text-center">
      <div className="flex flex-col gap-3">
        <p className="text-title_l">#{profile.display_name}</p>
        <p className="text-label_l text-text-secondary">{profile.profile_details?.profession}</p>
        <div className="text-label_s mb-4">
        <Link
        href={`https://mumbai.polygonscan.com/address/${profile.wallet}`}
        target="_blank"
        passHref
      >
        <Button variant={"secondary"} size="sm">
          {profile.wallet.slice(0, 5) + "..." + profile.wallet.slice(-4)}
        </Button>
      </Link>
        </div>
      </div>

    </div>
  );
}
