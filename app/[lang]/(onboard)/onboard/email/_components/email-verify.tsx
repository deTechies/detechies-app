"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { postServer } from "@/lib/data/postRequest";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerification({
  lang,
  user,
}: {
  lang: any;
  user: any;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const { data, update } = useSession();
  const code = searchParams.get("code") as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (code && parseInt(code) >= 100000 && parseInt(code) <= 999999) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [code]);


  return (
    <main className="flex flex-col gap-[30px] border text-center rounded-sm max-w-[600px] p-10">
      <Image
        src="/images/email-send.png"
        alt="verify email"
        width={180}
        height={180}
        quality={100}
        className="mx-auto"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-title_l capitalize">
          {lang.onboard.verify_email.email_verify.title}
        </h2>
        <h5 className="text-body_s text-text-secondary">
          {lang.onboard.verify_email.email_verify.desc}
        </h5>
          <span className="text-label_S">{user.email}</span>
      </div>
      <div className="flex flex-col gap-6">
        <CodeInput />
        <div className="grid sm:grid-cols-2 gap-2 hidden">
          <Button
            onClick={() => signOut()}
            variant="secondary"
            className="py-3 rounded-sm"
          >
            {lang.onboard.verify_email.email_verify.sign_out}
          </Button>
        </div>
      </div>
    </main>
  );
}


export const CodeInput = () => {
  const [code, setCode] = useState(new Array(6).fill(''));
  const {refresh} = useRouter();

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Focus next input
    if (value) {
      if (index < 5) {
       
        const inputElement = document.getElementById(`input-${index + 1}`);
        if (inputElement) {
          inputElement.focus();
        }
      } else {
        // Last input filled, trigger the API call
        validateCode(newCode.join(''));
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index]) {
      // If the current input is empty and backspace is pressed, focus the previous one
      if (index > 0) {
        document.getElementById(`input-${index - 1}`)?.focus();
      }
    }
  };

  const validateCode = async (fullCode: string) => {
    try {
      toast({
        title: "Invalid code",
        description: "Invalid code",
      })
      const result = await postServer(`/users/verify?token=${fullCode}`, "" );
      
      if(result){
        toast({
          title: "Email verified",
          description: "Email verified",
        })
        refresh();
        return;
      }

    } catch (error) {
      console.error('Error submitting code:', error);
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {code.map((digit, index) => (
        <input
          key={index}
          id={`input-${index}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-10 h-10 border-2 rounded-[6px] border-gray-300 text-center text-title_m focus:outline-none focus:border-4 focus:border-accent-secondary`}
          style={{ transition: 'border-color 0.3s' }}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};



