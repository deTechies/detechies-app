"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function InvalidWorkAccess({ details }: any) {
  const router = useRouter();
  return (
    <Card className="my-20 mx-auto gap-8 max-w-lg justify-center text-center">
      <h1 className="text-subhead_s">{details.message}</h1>
      <p>
        Please make sure you are a valid project member and have uploaded your
        contribution before you can start
      </p>
      <div className="mx-auto">
        <Button variant={"secondary"} onClick={() => router.back()}>Go back</Button>
      </div>
    </Card>
  );
}
