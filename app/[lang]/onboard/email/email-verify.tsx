'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export const EmailVerification = ({emailText, verifyEmail}: {emailText:string, verifyEmail:string}) => {
  //TODO: setup email verification  
  return (
    <div>
      <label className="">{emailText}</label>
      <div className="flex gap-2 items-center mt-2">
        <Input placeholder={emailText} />
        <Button className="w-[150px]">{verifyEmail}</Button>
      </div>
    </div>
  );
};
