"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Address, useContractWrite } from "wagmi";

import { ABI } from "@/lib/constants";

import TransactionData from "../screens/transaction-data";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export default function UploadWorks({ type }: { type?: string }) {
  const { address } = useParams();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
    const [work, setWork] = useState("");
  const { write, isLoading, data } = useContractWrite({
    address: address as Address,
    abi: ABI.project,
    functionName: "addWork",
  });

  const uploadWorks = async () => {
    setLoading(true);

    if(!name || !work){
        toast({
            title: "Please fill in all fields",
            description: "Please fill in all fields",
        })
        return;
    }
    await write({ args: [name, work] });
    
    setLoading(false);
    
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="cursor-pointer">Upload Works</Button>
      </DialogTrigger>

      <DialogContent>
        <p>Upload you work</p>
        <Input placeholder="name"  
            onChange={(e) => setName(e.target.value)}
            value={name}
        />
        <Input placeholder="work"
            onChange={(e) => setWork(e.target.value)}
            value={work}
        />

        <Button
            loading={loading || isLoading}
            onClick={uploadWorks}
        >Upload works</Button>
      </DialogContent>
      
      <TransactionData hash={data?.hash} />
    </Dialog>
  );
}
