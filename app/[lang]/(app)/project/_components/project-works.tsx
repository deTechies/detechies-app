"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRemoveWork } from "@/lib/hooks/useWorks";
import { isValidLink, truncateMiddle } from "@/lib/utils";
import { Check, FileIcon, Link2, X } from "lucide-react";
import Link from "next/link";
import { Address } from "wagmi";

interface Work {
  id: string;
  description: string;
  status: string;
  links: string[];
  files: File[];
}

interface File {
  name: string;
  content: string;
}

interface ProjectWorksProps {
  contract: Address;
  works: Work[];
  isCreator?: boolean;
}

interface WorkItemProps {
  work: Work;
  isCreator?: boolean;
  removeWork: (index: number) => void;
  isLoading: boolean;
}

const FileButton = ({ file }: { file: File | string }) => {
  const downloadFile = () => {
    const element = document.createElement("a");

    if (typeof file !== "string") {
      const href = file.content.startsWith("data:")
        ? file.content
        : `https://ipfs.io/ipfs/${file.content}`;
      element.setAttribute("href", href);
      element.setAttribute("download", file.name);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      const href = `https://ipfs.io/ipfs/${file}`;
      element.setAttribute("href", href);
      element.setAttribute("download", file);
      element.setAttribute("target", "_blank");
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <Button variant="secondary" size="icon" onClick={downloadFile}>
      <FileIcon size={16} />
    </Button>
  );
};

const WorkItem = ({
  work,
  isCreator,
  removeWork,
  isLoading,
}: WorkItemProps) => {
  const { id, description, status, links, files } = work;

  return (
    <li className="flex gap-4 justify-between items-center overflow-auto">
      <div className="flex flex-col">
        {isValidLink(description) ? (
          <Link
            href={description}
            className="text-text-primary"
            rel="noopener noreferrer"
          >
            {description}
          </Link>
        ) : (
          <span>{truncateMiddle(description, 24)}</span>
        )}
        <div className="flex gap-2 items-center">
          {links && links.length > 0 && (
            <Link
              href={links[0]}
              className="text-text-primary bg-background-layer-2 rounded-full p-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Link2 size={16} />
            </Link>
          )}
          {files &&
            files.map((file: any, index: number) => (
              <FileButton key={index} file={file} />
            ))}
        </div>
      </div>

      {isCreator && status === "PENDING" && (
        <div className="flex gap-1">
          <Button size="icon" variant="default" >
            <Check size={16} />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            loading={isLoading}
            onClick={() => removeWork(parseInt(id))}
          >
            <X size={16} />
          </Button>
        </div>
      )}

      {!isCreator || status !== "PENDING" ? (
        <Badge variant="info">{status}</Badge>
      ) : null}
    </li>
  );
};

export default function ProjectWorks({
  contract,
  works,
  isCreator,
}: ProjectWorksProps) {
  const { removeWork, isLoading } = useRemoveWork(contract);

  return (
    <Card>
      <CardHeader>
        <h2>Works</h2>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {works.map((work) => (
            <WorkItem
              key={work.id}
              work={work}
              isCreator={isCreator}
              removeWork={removeWork}
              isLoading={isLoading}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
