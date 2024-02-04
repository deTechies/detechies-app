"use client";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, Dialog } from "@/components/ui/dialog";

export default function NoticeGroupSelect({
  lang,
  onClickSelectGroup,
  open,
  onOpenChange,
}: {
  lang: any;
  open: boolean;
  onOpenChange: any;
  onClickSelectGroup: Function;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div>
          <h3 className="mb-4 text-subhead_s">
            {lang.project.list.create_project.select_group.subtitle}
          </h3>

          <div className="mb-6 text-body_m">
            {lang.project.list.create_project.select_group.subdesc}
          </div>

          <div className="flex gap-2 justify-center">
            <DialogClose className="flex max-w-[212px] w-full">
              <Button size="lg" variant="secondary" className="max-w-full">
                {lang.project.list.create_project.select_group.close}
              </Button>
            </DialogClose>

            <Button
              size="lg"
              variant="primary"
              onClick={() => onClickSelectGroup()}
            >
              {lang.project.list.create_project.select_group.select_group}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
