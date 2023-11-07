"use client";

import { Editor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { BubbleMenuEditor } from "../editor/bubble-menu-editor";
import { FloatingMenuEditor } from "../editor/floating-menu-editor";
import { Button } from "./button";

type Props ={
  editor: Editor;
}


export const TextEditor = ({
  editor
}: Props) => {
 

  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  return (
    <>
      <Button
        size="sm"
        className="w-fit self"
        onClick={() => setIsEditable(!isEditable)}
      >
        {isEditable ? "You can edit" : "Read Only"}
      </Button>
      {editor && <BubbleMenuEditor editor={editor} />}

      {editor && <FloatingMenuEditor editor={editor} />}
      <EditorContent 
        editor={editor} 
        className="border border-border-div rounded-md"
      />
    </>
  );
};

