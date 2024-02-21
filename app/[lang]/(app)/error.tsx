"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Error() {
  return (
    <Card className="max-w-xl mx-auto my-auto mt-10">
      <h1 className="text-title_l text-state-error">Error</h1>

      <p>
        Something went wrong, please try again later. If it persists, please
        contact us.
      </p>

      <Link
        href="https://t.me/Careerzen_org"
        passHref
        className="mx-auto max-w-[212px] w-full mt-4"
      >
        <Button variant="secondary" size="lg">
          Contact us
        </Button>
      </Link>
    </Card>
  );
}
