"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { sendVerifyEmail } from "@/lib/data/user";
import { signOut, useSession } from "next-auth/react";

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

      router.refresh();
    } else {
      toast({
        title: "Invalid code",
        description:
          "Something went wrong with verifying your email, please check if you email is correct. ",
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
    <main className="flex flex-col gap-4 max-w-[400px]">
      <h2 className="text-heading_s">
        {lang.onboard.verify_email.email_verify.title}
      </h2>
      <h5 className="text-body_s text-text-secondary">
        {lang.onboard.verify_email.email_verify.desc}
        <b>{user.email}</b>
        {lang.onboard.verify_email.email_verify.desc2}
      </h5>
      <div className="flex flex-col gap-6">
        <div className="">
          <Label> {lang.onboard.verify_email.email}</Label>
          <div className="flex flex-row items-center gap-2">
            <Input
              value={user.email}
              className="tracking-widest"
              placeholder="Your email"
              disabled
            />
            <Button
              size={"sm"}
              onClick={() => resendEmail()}
              className="rounded-sm"
            >
              {lang.onboard.verify_email.email_verify.resend}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label>{lang.onboard.verify_email.email_verify.code}</Label>
          <Input
            value={code}
            onChange={(e) => router.push(pathName + "?code=" + e.target.value)}
            className="border p-2 text-center tracking-widest"
            placeholder={lang.onboard.verify_email.email_verify.code_placeholder}
          />
        </div>
        <div className="flex gap-2">
        <Button
          onClick={() => signOut()}
          variant="secondary"
          className="py-3 rounded-sm"
        >
          Sign out
        </Button>
        <Button
          onClick={verifyEmail}
          disabled={!isValid}
          className="py-3 rounded-sm"
        >
          {lang.onboard.verify_email.email_verify.title}
        </Button>
        </div>
       
      </div>
    </main>
  );
}
