"use client"
import TransactionData from "@/components/screens/transaction-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ABI } from "@/lib/constants";
import { uploadContent } from "@/lib/upload";
import Image from "next/image";
import Link from "next/link";
import { Editor } from "novel";
import { useState } from "react";
import { getAddress } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { ProjectDetailProps } from "./page";


export default function ProjectDetail({
  details,
}: {
  details: ProjectDetailProps;

}) {
  
  const [editing, setEditing] = useState(false);
  const {address} = useAccount();
  const [data, setData] = useState<any>(
    {content: details.introduction, 
    name: details.name,
      url: details.url,
  }
    );

    const {write, isLoading, data:deploy} = useContractWrite({
      address: getAddress(details.id),
      functionName: "updateProject",
      abi: ABI.project,
    });
  
  const startSaving = async() => {
    setEditing(false);
    console.log(data);
    
    const uploadedContent = await uploadContent(
      JSON.stringify({
        ...details,
        introduction: data.content,
        name: data.name,
        url: data.url,
      })
    );

    console.log(uploadedContent);
    

       write({
        args: [data.name, uploadedContent, data.url, 0]
      }) 

    
  }
  
  console.log(details)

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
        <div className="flex flex-col gap-1">
          {
            editing ?
            <Input type="text" className="w-full text-3xl font-medium" defaultValue={details.name} onChange={
              (e) => {
                setData((prev:any) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }
            }/> :
            <h1 className="text-3xl font-medium">{data.name}</h1>
          }

{
            editing ?
            <Input type="url" placeholder="https://careerzen.org" className="w-full" defaultValue={data.url} onChange={
              (e) => {
                setData((prev:any) => ({
                  ...prev,
                  url: e.target.value,
                }));
              }
            }/> :
            <Link href={data.url ? data.url : "https://careerzen.org"}>
            {data.url ? data.url : "https://careerzen.org"}
          </Link>
          }
    
        </div>
      </header>
      <div className="mt-4 w-full flex flex-col gap-4">
      {
          details.creator == address?.toLowerCase() && (
        <div className="flex justify-end gap-4">
        
              
            
        <Button variant="secondary" size="sm"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Stop" : "Edit"}
        </Button>
        <Button
          size={"sm"}
          
          onClick={startSaving}
        >
          Save
        </Button>
        </div>
        )
      }
     
        {
          editing ? 
          (
            <Editor 
            defaultValue={details.introduction ? details.introduction : "No introduction yet."}
            storageKey={details.name + '_introduction'}
            onUpdate={(editor) => {
              setData((prev:any) => ({
                ...prev,
                content: editor?.getHTML(),
              }));
            }}
          />
          ): (
            <div className="prose">

              <div dangerouslySetInnerHTML={{__html: data.content ? data.content : "No introduction yet."}}></div>
            </div>
          )
        }
       
      </div>
      <TransactionData hash={deploy?.hash} />
    </Card>
  );
}
