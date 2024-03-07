"use client";
import { Card } from "@/components/metronic/card/card";
import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/use-toast";
import { postServer } from "@/lib/data/postRequest";
import { EditIcon, SaveIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EmailVerification({
  lang,
  user,
}: {
  lang: any;
  user: any;
}) {
  const searchParams = useSearchParams();
  const { data, update } = useSession();
  const code = searchParams.get("code") as string;
  const [changeEmail, setChangeEmail] = useState(false);
  const [email, setEmail] = useState<string>(user.email);

  const changeVerificationEmail = async () => {
    if (email == user.email) {
      setChangeEmail(false);
      return;
    }
    try {
      //create a function to change the email of the user, together with verification email.
      const data = JSON.stringify({
        email: email,
      });
      const result = await postServer(`/users/update/email`, data);

      if (result) {
        toast({
          title: "Email verified",
          description: "Email verified",
        });
        return;
      }
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-[30px] bg-background-layer-1 border text-center max-w-[600px] p-10">
        <Image
          src="/images/email-send.png"
          alt="verify email"
          width={180}
          height={180}
          quality={100}
          className="mx-auto"
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium capitalize">
            {lang.onboard.verify_email.email_verify.title}
          </h2>
          <h5 className="text-text-secondary">
            {lang.onboard.verify_email.email_verify.desc}
          </h5>
          <div className="flex flex-row gap-2">
            <input
              className="w-full text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!changeEmail}
            />
            {changeEmail ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={changeVerificationEmail}
              >
                <SaveIcon size="18" className="text-accent-primary" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setChangeEmail(true);
                  //focus on the input field directly.
                }}
              >
                <EditIcon size="18" className="text-accent-primary" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <CodeInput />
        </div>
      </Card>
      <div className="flex gap-2 text-sm text-center justify-center">
        <button
          onClick={() => signOut()}
          className="rounded-sm text-accent-primary hover:text-text-secondary"
        >
          Not the right account?
        </button>
      </div>
    </div>
  );
}

export const CodeInput = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const { refresh } = useRouter();

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
        validateCode(newCode.join(""));
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index]) {
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
      });
      const result = await postServer(`/users/verify?token=${fullCode}`, "");

      if (result) {
        toast({
          title: "Email verified",
          description: "Email verified",
        });
        refresh();
        return;
      }
    } catch (error) {
      console.error("Error submitting code:", error);
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
          style={{ transition: "border-color 0.3s" }}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};
