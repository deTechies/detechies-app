"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { postServer } from "@/lib/data/general";
import { uploadContent } from "@/lib/upload";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
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

export default function UploadWorks({ projectId, lang }: { projectId?: string; lang: any; }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [newLink, setNewLink] = useState(""); // State for the new link input
  const router = useRouter();
  const [workType, setWorkType] = useState<string>("file");
  const [file, setFile] = useState<File | null>(null);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      const newFile = event.target.files?.[0];
      console.log(newFile);
      setFile(newFile);
    }
  };

  const openFileDialog = () => {
    document.getElementById("fileInput")?.click();
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileContents = async (
    file: File
  ): Promise<{ name: string; content: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          content: reader.result as string,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Reads the file as a data URL (Base64)
    });
  };

  const uploadWorks = async () => {
    setLoading(true);
    let work = newLink as any;

    if (workType === "file") {
      if(!file){
        toast({
          title: "Please select a file",
          description: "Please select a file",
        })
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

    console.log(body);
    const result = await postServer(
      `/projects/${projectId}/add-link`,
      "POST",
      body
    );

    if (result.error) {
      toast({
        title: result.error,
        description: result.message,
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Successfully uploaded",
      description: "Successfully uploaded",
    });

    router.refresh();

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="secondary">
          {lang.project.details.links.upload}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <h3 className="text-subhead_m">Upload works</h3>
        <section className="flex flex-col gap-8 my-4">
          <div>
            <Label htmlFor="name" className="mb-4">
              Name
            </Label>
            <Input
              placeholder="name of link"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="flex gap-4 justify-center ">
            <Select onValueChange={(value) => setWorkType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="file">File</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="w-full">
              {workType === "link" ? (
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder="Link"
                    onChange={(e) => setNewLink(e.target.value)}
                    value={newLink}
                  />
                </div>
              ) : (
                <div>
                  {file ? (
                    <div className="flex justify-between text-accent-on-secondary bg-background-layer-2 py-5 px-8 rounded-sm">
                      {file.name}
                      <X
                        className="ml-2 cursor-pointer hover:text-state-error text-text-secondary mr-4"
                        onClick={() => setFile(null)}
                        size="1.5rem"
                      />
                    </div>
                  ) : (
                    <Button className="w-full" onClick={openFileDialog}>
                      Upload file
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

        <Button loading={loading} onClick={uploadWorks} disabled={loading}>
          Upload works
        </Button>
      </DialogContent>
    </Dialog>
  );
}
