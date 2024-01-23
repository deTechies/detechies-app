"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { postServer } from "@/lib/data/postRequest";
import { useRef, useState } from "react";

export default function RequestEvaluation({
  memberWallet,
  lang,
}: {
  memberWallet: string;
  lang?: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const closeButtonRef = useRef<any>(null);

  async function requestEvaluation() {
    setIsLoading(true);
    const result = await postServer(
      `/survey-response/request/${memberWallet}`,
      ""
    );

    if (result.status == "success") {
      closeButtonRef.current.click();
    } else {
      toast({
        description: result.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }
  return (
    <Dialog>
      <DialogTrigger className="text-left">
        <span className="text-title_m">
          {lang.project.details.request.request_a_review}
        </span>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <h4 className="text-subhead_s">
          {lang.project.details.request.card_title}
        </h4>
        <p className="text-body_m">
          {lang.project.details.request.card_description}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <DialogClose asChild>
            <Button size="lg" variant="secondary" ref={closeButtonRef}>
              {lang.project.details.request.card_back}
            </Button>
          </DialogClose>
          <Button
            size="lg"
            variant="primary"
            onClick={requestEvaluation}
            loading={isLoading}
            disabled={isLoading}
          >
            {lang.project.details.request.card_button}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
