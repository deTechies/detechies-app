"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { removeProjectWork } from "@/lib/data/project";
import {} from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteWorks({
  projectId,
  lang,
}: {
  projectId: string;
  lang: any;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  async function deleteProjectWork() {
    setLoading(true);
    const result = await removeProjectWork(projectId);

    if (result.status === "success") {
      toast({
        description: "Succesfully delete your work.",
      });

      router.refresh();
    } else {
      toast({
        description: "you cannot delete your work",
      });
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="text-left">
        <Button size="sm" variant="secondary">
          {lang.project.details.members.delete_works.button}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-0 px-8 py-7">
        <h4 className="mb-4 text-subhead_s">
          {lang.project.details.members.delete_works.title}
        </h4>
        <p className="mb-6 text-body_m">
          {lang.project.details.members.delete_works.desc}
        </p>

        <div className="flex justify-center gap-2">
          <Button
            size="lg"
            variant="secondary"
            onClick={deleteProjectWork}
            loading={loading}
            disabled={loading}
          >
            {lang.project.details.members.delete_works.delete}
          </Button>
          
          <DialogClose className="w-full max-w-[212px]">
            <Button size="lg" className="w-full">
              {lang.project.details.members.delete_works.back}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
