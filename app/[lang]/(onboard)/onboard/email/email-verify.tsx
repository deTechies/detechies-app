"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { sendVerifyEmail } from "@/lib/data/user";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerification({
  text,
  user,
}: {
  text: any;
  user: any;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const code = searchParams.get("code") as string;

  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (code && parseInt(code) >= 100000 && parseInt(code) <= 999999) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [code]);

  async function verifyEmail() {
    if (!isValid || parseInt(code) < 100000 || parseInt(code) > 999999) {
      toast({
        title: "Invalid code",
        description: "Invalid code",
      });

      return;
    }

    const result = await sendVerifyEmail(code);

    if (result) {
      toast({
        title: "Email verified",
        description: "Email verified",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "Invalid code",
      });
    }
  }

  async function resendEmail() {
    toast({
      title: "Not yet implemented",
      description:
        "This is currently not possible, please contact our telegram group to help you sort it out! ",
    });
  }

  return (
    <main className="flex flex-col gap-4">
      <h2>Verify Email</h2>
      <p>
        We have send you an email to <b>{user.email}</b> with a 6-digit code.
        You can use this code to verify your email address.
      </p>
      <div className="flex flex-row items-center">
        <Input
          value={user.email}
          className="border p-2 text-center tracking-widest"
          placeholder="Your email"
        />
        <Button size={"sm"} onClick={() => resendEmail()}>Resend code</Button>
      </div>
      <div className="flex flex-col items-center">
        <Input
          value={code}
          onChange={(e) => router.push(pathName + "?code=" + e.target.value)}
          className="border p-2 text-center tracking-widest"
          placeholder="Enter 6-digit code"
        />
      </div>
      <Button onClick={verifyEmail} disabled={!isValid}>
        Verify email
      </Button>
    </main>
  );
}