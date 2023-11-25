import { cn } from "@/lib/utils";
import { BubbleMenu, Editor as EditorProp } from "@tiptap/react";

type Props = {
  editor: EditorProp;
};

export const BubbleMenuEditor = ({ editor }: Props) => {
  return (
    <>
      <BubbleMenu
        className={cn("bubble-menu bg-bg-secondary text-text-primary")}
        tippyOptions={{ duration: 100 }}
        editor={editor}
      >
        <div className="flex flex-col items-center">
          <div className="flex space-x-1">
       {/*      <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              Bold
            </Button>
            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </Button>
            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              Strike
            </Button>
          </div>
          <div className="flex mt-2 space-x-1">
            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "is-active" : ""}
            >
              Code
            </Button>
            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              Blockquote
            </Button>
            <Button
              variant={"secondary"}
              size={"sm"}
              onClick={() => console.log("clicked")}
              className={editor.isActive("link") ? "is-active" : ""}
            >
              Link
            </Button> */}
          </div>
        </div>
      </BubbleMenu>
    </>
  );
};
