"use client";

import MediaUploader from "@/components/extra/media-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ABI } from "@/lib/constants";

import { uploadContent } from "@/lib/upload";

import { Loader2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Address, useAccount, useContractWrite } from "wagmi";

const options = [
  {
    name: "head",
    category: "",
  },
  {
    name: "background",
    category: "",
  },
  {
    name: "jacket",
    category: "",
  },
  {
    name: "goodies",
    category: "",
  },
];
interface Metadata {
  name: string;
  institution: string;
  description: string;
  degree: string;
  rating: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}



export default function AddAchievement() {
  const [deleteFile, setDeleteFile] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const {address: contractAddress} = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const {address} = useAccount();
  const {write, isLoading, data, isSuccess} = useContractWrite({
    address: contractAddress as Address,
    abi: ABI.group,
    functionName: "addAchievement",
  })

  const [metadata, setMetadata] = useState<Metadata>({
    name: "",
    institution: "Seoul National University",
    description: "This is a description",
    degree: "Bachelor",
    rating: "5",
    image: "",
    attributes: [
      {
        trait_type: "trait",
        value: "value",
      },
    ],
  });

  const selectFile = (file: File | null) => {
    setFile(file);
  };

  const uploadFile = async (file: File) => {
    //upload file
    const result = await uploadContent(file);
    console.log(result);
    return result;
  };

  const uploadNFT = async () => {
    setLoading(true);
    //upload file
    if (!file) {
      toast({ title: "no file" });
      return;
    }
    const cid = await uploadFile(file);

    const newMetadata = {
      ...metadata,
      category: selected,
      image: cid,
    };

    const uploadMetadata = await uploadContent(JSON.stringify(newMetadata));
    console.log(uploadMetadata);
    mintNFT(uploadMetadata);
  };

  const handleInputChange = (field: any, value: string) => {
    setMetadata({ ...metadata, [field]: value });
  };

  const handleAttributeChange = (index: number, type: any, value: string) => {
    setMetadata({ ...metadata, [type]: value });
  };

  const handleAddAttribute = () => {
    setMetadata({
      ...metadata,
      attributes: [...metadata.attributes, { trait_type: "", value: "" }],
    });
  };

  const mintNFT = async (metadata: string) => {
    //setup minting here for deployment by admin
    const timestamp = Math.floor(Date.now() / 1000);
    const tokenURI = `https://ipfs.io/ipfs/${metadata}`;
    //add achievement 
    

    //TODO: Revise this and make it work.. institute can also be a contract but lets do the main addres now
    //we need to set this up in order to mint this. 
    if(!address){return;}
    await write({
      args: [metadata, true]
    })
    
    console.log("not yet implemented need to some recivison");
    setLoading(false);
  };

  return (
    <main className="flex   items-start justify-center gap-4">
        <div className="flex flex-col gap-6 justify-center text-center items-center w-[300px]">
          <Select
            onValueChange={(value: any) => {
              setSelected(value);
            }}
          >
            <SelectTrigger className="rounded-sm px-4">
              <SelectValue placeholder="Select your mint" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option, index: number) => (
                <SelectItem value={option.name} key={index}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
                
        <div className="w-full mx-8">
        <MediaUploader
            onFileSelected={selectFile}
            height={400}
            width={400}
            deleteFile={deleteFile}
          />
        </div>
      
          {file && (
            <div className="flex bg-black-400 p-1.5 rounded-md justify-between px-3 text-sm text-black items-center ">
              {file.name}
              <X
                className="ml-2 text-black-300 hover:text-red-500"
                size={16}
                onClick={() => {
                  setFile(null);
                  setDeleteFile(!deleteFile);
                }}
              />
            </div>
          )}

      </div>
      <div>
          <div className="flex flex-col gap-2">
            {isLoading && <div>Check Wallet, we are loadign</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            <Input
              type="text"
              placeholder="Name"
              value={metadata.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Institution"
              value={metadata.institution}
              onChange={(e) => handleInputChange("institution", e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={metadata.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Image URL"
              value={metadata.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
            />

            {metadata.attributes?.map((attr: any, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Trait Type"
                  value={attr.trait_type}
                  onChange={(e) =>
                    handleAttributeChange(index, "trait_type", e.target.value)
                  }
                />
                <Input
                  type="text"
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                />
              </div>
            ))}

            <Button variant="secondary" onClick={handleAddAttribute}>
              Add Attribute
            </Button>

            <Button onClick={uploadNFT} disabled={isLoading}>
              {isLoading ? (
                <span className="flex gap-2">
                  <Loader2 className="animate-spin" /> Loading
                </span>
              ) : (
                "Create NFT"
              )}
            </Button>
            <span className="text-black-300 text-sm text-center">
              we will be back to you in 24 hours
            </span>
          </div>

      </div>
    </main>
  );
}