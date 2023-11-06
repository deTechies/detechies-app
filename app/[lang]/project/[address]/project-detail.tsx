"use client"
import { Card } from "@/components/ui/card";
import { TextEditor } from "@/components/ui/text-editor";
import Color from "@tiptap/extension-color";
import Dropcursor from "@tiptap/extension-dropcursor";
import { Link as ExtensionLink } from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import Link from "next/link";
import { ProjectDetailProps } from "./page";

export default function ProjectDetail({
  details,
}: {
  details: ProjectDetailProps;
}) {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      ExtensionLink.configure({
        protocols: [],
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      Dropcursor.configure({
        width: 2,
        class: "polynote-image",
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose p-8 focus:outline-none focus:shadow-none focus:ring-0 focus:bg-gray-100 rounded-sm focus:border focus:border-border-input',
      },
    },
    content: "<p>Just some random content.</p>"

  });

  return (
    <Card className="w-full">
      <header className="flex gap-8 items-center ">
        <Image
          src={`${details.image ? 'https://ipfs.io/ipfs/'+details.image : "/images/no-item.png"}`}
          width={100}
          height={100}
          className="rounded-[6px] bg-accent-secondary"
          alt="project_image_holder"
        />
        <div className="prose">
          <h3>{details.name}</h3>
          <Link href={details.url ? details.url : "https://careerzen.org"}>
            {details.url ? details.url : "https://careerzen.org"}
          </Link>
        </div>
      </header>
      <div className="mt-4 w-full flex flex-col gap-4">
        <h5>Project Details</h5>

        {editor && <TextEditor editor={editor} />}
      </div>
    </Card>
  );
}
