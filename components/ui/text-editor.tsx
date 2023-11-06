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
      <div className="text-text-primary">
        <input
          type="checkbox"
          checked={isEditable}
          onChange={() => setIsEditable(!isEditable)}
        />
        Editable
      </div>
      <Button
        size="sm"
        onClick={() => setIsEditable(!isEditable)}
      >
        Editable
      </Button>
      {editor && <BubbleMenuEditor editor={editor} />}

      {editor && <FloatingMenuEditor editor={editor} />}
      <EditorContent 
        editor={editor} 
        className=""
      />
    </>
  );
};

