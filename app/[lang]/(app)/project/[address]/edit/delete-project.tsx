"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { deleteProject } from "@/lib/data/project";
import { Project } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import React from "react";

export default function DeleteProject({
  projectData,
}: {
  projectData: Project;
}) {
  const [deleteInput, setDeleteInput] = React.useState<string>("");
  const router = useRouter();
  //TODO: add a delete project function here.

  async function confirmDelete() {
    console.log("deleting project");

    const result = await deleteProject(projectData.id);

    if (result.error)
      return toast({ title: "Error", description: result.error.message });

    toast({
      title: "Project Deleted",
      description: "Your project has been deleted.",
    });
    router.push("/project");
  }
  return (
    <Dialog>
      <DialogTrigger className="w-full py-4 text-center">Delete Project</DialogTrigger>
      <DialogContent className="flex flex-col gap-6">
        <header className="flex flex-col gap-4">
          <h5 className="text-subhead_m">프로젝트를 삭제할까요?</h5>
          <p className="text-body_m">
            If deleted, all project activity information of the leader and other
            members will be deleted. If you really want to delete the project,
            please enter the project name: <strong>{projectData.name}</strong>{" "}
            and click delete
          </p>
        </header>

        <Input
          type="text"
          onChange={(e) => setDeleteInput(e.target.value)}
          value={deleteInput}
        />
        <div className="flex justify-center gap-2">
          <DialogClose>
            <Button size="lg" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="lg"
            variant="destructive"
            disabled={deleteInput != projectData.name}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
