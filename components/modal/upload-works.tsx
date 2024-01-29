"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// import { postServer } from "@/lib/data/general";
import { postServer } from "@/lib/data/postRequest";
import { uploadContent } from "@/lib/upload";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";

export default function UploadWorks({
  projectId,
  lang,
}: {
  projectId?: string;
  lang: any;
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [newLink, setNewLink] = useState(""); // State for the new link input
  const router = useRouter();
  const [workType, setWorkType] = useState<string>("file");
  const [file, setFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFile = event.target.files?.[0];
      setFile(newFile);
    }
  };

  const openFileDialog = () => {
    document.getElementById("fileInput")?.click();
  };

  const uploadWorks = async () => {
    setLoading(true);
    let work = newLink as any;

    if (workType === "file") {
      if (!file) {
        toast({
          title: "Please select a file",
          description: "Please select a file",
        });
        return;
      }
      work = await uploadContent(file);
    }

    if (!name || !workType || !projectId || !work) {
      toast({
        title: "Please fill in all fields",
        description: "Please fill in all fields",
      });
      setLoading(false);
      return;
    }

    const body = JSON.stringify({
      projectId: projectId,
      name: name,
      link: work,
      type: workType,
    });

    const result = await postServer(
      `/projects/${projectId}/add-link`,
      body
    );

    if (!result) {
      toast({
        title: result.error,
        description: result.message,
      });
      setLoading(false);
      return;
    }
    setFile(null);
    setName("");
    setNewLink("");

    toast({
      title: "Successfully uploaded",
      description: "Successfully uploaded",
    });

    router.refresh();
    setDialogOpen(false);
    setLoading(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button size="sm" variant="secondary">
          {lang.project.details.links.upload}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <h3 className="text-subhead_m">
          {lang.project.details.links.dialog.title}
        </h3>
        <section className="flex flex-col gap-8 my-4">
          <div>
            <Label htmlFor="name" className="mb-4">
              {lang.project.details.links.dialog.name}
            </Label>

            <Input
              placeholder={lang.project.details.links.dialog.name_placeholder}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <Select onValueChange={(value) => setWorkType(value)}
              defaultValue="file"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={lang.project.details.links.dialog.type} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {lang.project.details.links.dialog.type}
                  </SelectLabel>
                  <SelectItem value="file">
                    {lang.project.details.links.dialog.file}
                  </SelectItem>
                  <SelectItem value="link">
                    {lang.project.details.links.dialog.link}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="w-full">
              {workType === "link" ? (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Link"
                    onChange={(e) => setNewLink(e.target.value)}
                    value={newLink}
                  />
                </div>
              ) : (
                <div>
                  {file ? (
                    <div className="flex justify-between px-8 py-5 rounded-sm text-accent-on-secondary bg-background-layer-2">
                      {file.name}
                      <X
                        className="ml-2 mr-4 cursor-pointer hover:text-state-error text-text-secondary"
                        onClick={() => setFile(null)}
                        size="1.5rem"
                      />
                    </div>
                  ) : (
                    <Button className="w-full" onClick={openFileDialog}>
                      {lang.project.details.links.dialog.upload_file}
                    </Button>
                  )}

                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }} // Hide the file input
                    onChange={selectFile}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-center gap-2">
          <DialogClose className="w-full max-w-[212px]">
            <Button size="lg" variant="secondary">
              {lang.project.details.links.dialog.close}
            </Button>
          </DialogClose>

          <Button
            size="lg"
            loading={loading}
            onClick={uploadWorks}
            disabled={loading}
          >
            {lang.project.details.links.dialog.upload_works}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
