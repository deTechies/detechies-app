"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Address, useContractWrite } from "wagmi";

import { ABI } from "@/lib/constants";

import { uploadContent } from "@/lib/upload";
import { PlusIcon, X } from "lucide-react";
import TransactionData from "../screens/transaction-data";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

export default function UploadWorks({ type }: { type?: string }) {
  const { address } = useParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [newLink, setNewLink] = useState(""); // State for the new link input
  const [links, setLinks] = useState<string[]>([]);

  const { write, isLoading, data } = useContractWrite({
    address: address as Address,
    abi: ABI.project,
    functionName: "addWork",
  });
  const [files, setFiles] = useState<File[]>([]);

  //uploading file..
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles) {
      setFiles([...files, ...Array.from(newFiles)]);
    }
  };

  const openFileDialog = () => {
    document.getElementById("fileInput")?.click();
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  //uploading links..
  const handleAddLink = () => {
    if (newLink.trim() === "") {
      toast({
        title: "Invalid input",
        description: "Please enter a link before adding.",
      });
      return;
    }
    setLinks((prevLinks) => [...prevLinks, newLink]);
    setNewLink(""); // Clear the input after adding the link
  };

  const handleRemoveLink = (index: number) => {
    setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
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

  const prepareWorkData = async () => {
    const fileContentsPromises = files.map((file) => uploadContent(file));
    const filesData = await Promise.all(fileContentsPromises);

    return JSON.stringify({
      files: filesData,
      links,
    });
  };

  const uploadWorks = async () => {
    setLoading(true);

    const work = await prepareWorkData();
    
    const uploadedContent = await uploadContent(work);
    

    if (!name || !uploadedContent) {
      toast({
        title: "Please fill in all fields",
        description: "Please fill in all fields",
      });
      return;
    }
    

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="">
        <Badge variant="secondary" className="text-title_s">UPLOAD</Badge>
      </DialogTrigger>

      <DialogContent>
        <h3 className="text-subhead_m">Upload you work</h3>
        <section className="my-4 flex flex-col gap-3">
          <header className="flex justify-between  items-center">
            <h6 className="text-title_m">Files of works</h6>
            <Button size="sm" onClick={openFileDialog}>
              <PlusIcon size="1rem" />
            </Button>
          </header>

          {files.map((file, index) => (
            <Badge
              key={index}
              className="text-accent-on-secondary flex justify-between"
            >
              {file.name}
              <X
                className="hover:text-state-error text-text-secondary ml-2 cursor-pointer"
                onClick={() => removeFile(index)}
                size="1.25rem"
              />
            </Badge>
          ))}

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }} // Hide the file input
            onChange={handleFileChange}
            multiple // Allow multiple files to be selected
          />
        </section>

        <section className="my-4 flex flex-col gap-2">
          <header className="flex justify-between">
            <h6 className="text-title_m">Links of works</h6>
          </header>

          {links.map((link, index) => (
            <div key={index} className="flex justify-between items-center my-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                {link}
              </a>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveLink(index)}
              >
                <X className="hover:text-state-error" />
              </Button>
            </div>
          ))}

          <div className="flex gap-2 my-2">
            <Input
              placeholder="Link"
              onChange={(e) => setNewLink(e.target.value)}
              value={newLink}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddLink();
              }}
              className="flex-1"
            />
            <Button onClick={handleAddLink} size="sm">
              Add
            </Button>
          </div>
        </section>

        <div>
          <Label htmlFor="name">Description</Label>
          <Input
            placeholder="description"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <Button loading={loading || isLoading} onClick={uploadWorks}>
          Upload works
        </Button>
      </DialogContent>

      <TransactionData hash={data?.hash} />
    </Dialog>
  );
}
