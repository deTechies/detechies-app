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
  lang
}: {
  projectData: Project;
  lang:any
}) {
  const [deleteInput, setDeleteInput] = React.useState<string>("");
  const router = useRouter();
  //TODO: add a delete project function here.

  async function confirmDelete() {

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
      <DialogTrigger className="w-full mt-5 text-center">
        <Button variant="secondary" className="max-w-full" size="lg">
          {lang.project.list.delete_project.delete}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 px-8">
        <header className="flex flex-col gap-4">
          <h5 className="text-subhead_s">{lang.project.list.delete_project.delete_confirm}</h5>
          <p className="text-body_m">
            {lang.project.list.delete_project.delete_dsc}<strong>{projectData.name}</strong>{" "}
            {lang.project.list.delete_project.delete_project_name}
          </p>
        </header>

        <Input
          type="text"
          onChange={(e) => setDeleteInput(e.target.value)}
          value={deleteInput}
          placeholder={lang.project.list.delete_project.placeholder}
        />

        <div className="flex justify-center gap-2">
          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" variant="secondary">
            {lang.project.list.delete_project.cancel}
            </Button>
          </DialogClose>

          <Button
            size="lg"
            variant="destructive"
            disabled={deleteInput != projectData.name}
            onClick={confirmDelete}
          >
            {lang.project.list.delete_project.delete}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
