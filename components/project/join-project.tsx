"use client";

import { joinProject } from "@/lib/data/project";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface JoinGroupProps {
  address: string;
}

export default function JoinProject({ address }: JoinGroupProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  
  
  
  const join = async () => {
    //@ts-ignore
    setLoading(true);
    //implement the logic for joina project here..
    const result = await joinProject({
      projectId: address,
      message: message, 
      role: "member",
    });
    
    setLoading(false);
    
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button loading={loading} className="w-full">
          Join Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2>
          Why do you want to join this project?
        </h2>
        <p>
          Please tell us why you want to join this project.
        </p>
        <Textarea placeholder="Why do you want to join this project?" onChange={
          (e) => {
            setMessage(e.target.value);
          }
        } />
        <Button onClick={join} >
          Join this Project
        </Button>
      </DialogContent>
    </Dialog>
  );
}
