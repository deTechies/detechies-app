"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getSession } from "next-auth/react";
import { useState } from "react";
import UserSettings from "./user-settings";

export default function EmailVerification({
  emailText,
  verifyEmail,
}: {
  emailText: string;
  verifyEmail: string;
}) {
  
  const [email, setEmail]= useState("")
  const [username, setUsername]= useState("")
  
  const sendVerification = async () => {
    const session = await getSession();
    console.log(session);
    if (session === null)
      return window.alert("You must be logged in to verify your email");


    // If you need to send JSON

    if(email.length < 5 && !session.web3.user.id.length ){
    
      toast({
        title: "Error",
        description: "Please enter valid creditaions",
        variant: 'destructive'
      })
      return
    }
    
    
    const credentials = {
      email: email,
      id: session.web3.user.id,
    }

const res = await fetch(`http://localhost:4000/users`, {

        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Authorization": `Bearer ${session.web3.accessToken}`, 
        },
      })
      
      
      if(!res.ok){
        console.log(res.status)

        toast({
          title: res.status.toString(),
          description:  res.statusText,
        })
    
        const data = await res.json()
      console.log(data)
      }
   
  };
  return (
    <main>
    <div >
      <label className="">{emailText}</label>
      <div className="flex gap-2 items-center mt-2">
        
        <Input id="email" name="email" placeholder={emailText} onChange={
          (e)=>setEmail(e.target.value)
        }/>

      </div>
    </div>
    <div >
      <label className="">Display Name</label>
      <div className="flex gap-2 items-center mt-2">
        
        <Input placeholder="Display name" onChange={
          (e)=>setUsername(e.target.value)
        }/>

      </div>
    </div>
    <UserSettings />
    <Button>
      Continue
    </Button>
    </main>
  );
}
