"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NoProfileFound() {
    const router = useRouter();
  return (
    <Card className="max-w-xl mx-auto my-24 flex flex-col gap-8 justify-center">
      <h1 className="text-subhead_s">No Profile Found</h1>
      <p className="text-text-secondary">
        We could not find your users profile, please try again or try to find
        the users profile on the profiles page.
      </p>

      <div className="flex gap-4 justify-center">
        <Button variant={"secondary"}
            onClick={() => router.back()}
        >Go Back</Button>
        <Link href="/profiles" passHref>
          <Button>Profiles</Button>
        </Link>
      </div>
    </Card>
  );
}
