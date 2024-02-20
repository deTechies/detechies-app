"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useDictionary } from "@/lib/dictionaryProvider";

export default function InvalidWorkAccess({ details }: any) {
  const router = useRouter();
  const lang = useDictionary();

  return (
    // <Card className="justify-center max-w-lg gap-8 mx-auto my-20 text-center">
    <Card className="flex flex-col max-w-lg gap-0 px-8 mx-auto text-center py-7">
      <div className="mb-4 text-heading_s">
        {lang.project.evaluate.invalid_access.title}
      </div>

      <div className="mb-6 text-text-secondary">
        {lang.project.evaluate.invalid_access.desc}
      </div>

      <div className="flex items-center justify-center">
        <Button size="lg" onClick={() => router.back()}>
          {lang.project.evaluate.invalid_access.go_back}
        </Button>
      </div>
    </Card>
  );
}
