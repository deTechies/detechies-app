import { Editor as EditorProp, FloatingMenu } from "@tiptap/react";


import { ChangeEvent, useEffect, useRef, useState } from "react";


import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  editor: EditorProp;
};

export const FloatingMenuEditor = ({ editor }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (selectedFile == null) return;
  }, [selectedFile]);

  const imageInput = useRef<HTMLInputElement | null>(null);


/*   const uploadMutation = useUploadMutation({
    const url  =  res.data.url;
    editor.chain().focus().setImage({ src: url, alt: "Pinning..." }).run();
 /*    onError: () => {
      setSelectedFile(null);
    },
    onSuccess: (res) => {
      //const url = res.data.url;
      
    
    }, 
  }); */

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file == null) {
      setSelectedFile(null);
      return;
    }



   /*  if (fileSizeInMB > 2) {
      setSelectedFile(null);
      toast({title:"Please upload a file smaller than 2MB"});
      return;
    }

    const extension = file.name.split(".").pop();

    if (extension == null || !allowedFileTypes.includes(extension)) {
      toast({title: "You can only upload an image"});
      return;
    } */

    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile == null) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    //uploadMutation.mutate(formData);
  }, [selectedFile]);

  return (
    <FloatingMenu
      className={cn("floating-menu bg-background-secondary")}
      tippyOptions={{ duration: 100 }}
      editor={editor}
    >
      <div className="flex flex-col p-1 items-center">
        <div className="flex space-x-3">
          <Button
          variant={"secondary"}
          size={"sm"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </Button>
          <Button
          variant={"secondary"}
          size={"sm"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </Button>
          <Button
          variant={"secondary"}
          size={"sm"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </Button>

          <Button
          variant={"secondary"}
          size={"sm"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "is-active" : ""
            }
          >
            H4
          </Button>
        </div>
        <div className="flex mt-1 space-x-1">
          <Button
          variant={"secondary"}
          size={"sm"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </Button>
          <Button
          variant={"secondary"}
          size={"sm"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Ordered List
          </Button>
          <Button
          variant={"secondary"}
          size={"sm"}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Line
          </Button>
        </div>
        <div className="flex mt-1 space-x-1">
          <input
            accept="image/*"
            value={""}
            type="file"
            ref={imageInput}
            className="hidden"
            onChange={onFileChange}
          />
          <Button
          variant={"secondary"}
          size={"sm"}
            disabled={true}
            onClick={() => {
              if (!imageInput.current) return;
              imageInput.current.click();
            }}
          >
          {/*   {uploadMutation.isLoading ? (
              <span className="my-[4px]">
                <Loading />
              </span>
            ) : (
              "Image"
            )} */}
            Image
          </Button>
        </div>
      </div>
    </FloatingMenu>
  );
};