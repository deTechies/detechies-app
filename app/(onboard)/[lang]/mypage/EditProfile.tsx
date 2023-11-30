"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import useFetchData from "@/lib/useFetchData";
import { cn, jobList } from "@/lib/utils";
import { ArrowDown, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Textarea } from "@/components/ui/textarea";

type Job = {
  id: number;
  groupName: string;
  name: string;
};

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Your name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your name must not be longer than 30 characters.",
    }),
  job: z.object({
    id: z.number(),
    groupName: z.string(),
    name: z.string(),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

const logos = [
  { src: "/icons/identity_google.png", alt: "Icon 1", text: "구글 계정" },
  { src: "/icons/identity_phone.png", alt: "Icon 2", text: "전화번호" },
  { src: "/icons/identity_telegram.png", alt: "Icon 3", text: "텔레그램" },
  { src: "/icons/identity_mail.png", alt: "Icon 4", text: "이메일" },
  { src: "/icons/identity_bitcoin.png", alt: "Icon 1", text: "탈중앙화 개인지갑" },
  { src: "/icons/identity_github.png", alt: "Icon 2", text: "Github" },
  { src: "/icons/identity_figma.png", alt: "Icon 3", text: "피그마" },
  { src: "/icons/identity_pinterest.png", alt: "Icon 4", text: "핀터레스트" },
  { src: "/icons/identity_youtube.png", alt: "Icon 1", text: "유튜브" },
  { src: "/icons/identity_linkedIn.png", alt: "Icon 2", text: "링크드인" },
  { src: "/icons/identity_facebook.png", alt: "Icon 3", text: "페이스북" },
  { src: "/icons/identity_reddit.png", alt: "Icon 4", text: "레딧" },
];

export default function EditProfile() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    data,
    error,
    loading: profileLoading,
  } = useFetchData(`${API_URL}/polybase/${address}`);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    //@ts-ignore
    data.address = address;

    fetch(`${API_URL}/polybase/profile/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username.toString(),
        name: "",
        email: "",
        job: data.job.name,
        description: "",
        address: address,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          toast({
            title: "Profile created successfully.",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-state-info-secondary p-4">
                <code className="text-state-info">
                  Sucessfully created your profile, we send 0.01 MATIC to your
                  account. You are now able to use our platform! Please continue
                  and mint your unique character
                </code>
              </pre>
            ),
          });

          setLoading(false);
          router.push("/onboard/mint");
        } else {
          console.error("Error creating profile:", data.message);
          toast({
            title: "Error creating profile.",
            description: "Please contact the owner on Telegram",
          });

          setLoading(false);
        }
      });
  }

  return (
    <>
      <Form {...form}>
        <section className="mb-8 mr-10">
          <h1 className="text-2xl font-medium mb-6 text-primary">
            프로필 수정
          </h1>
        </section>
        <section className="my-2 mr-10">
          <div className="flex">
            <div className="flex flex-col basis-1/2">
              <div>
                <label className="">본명 (비공개)</label>
                <div className="flex gap-2 items-center mt-2">
                  <Input placeholder="이름" />
                  <Input placeholder="성" />
                </div>
              </div>
              <div className="my-10">
                <label className="">닉네임</label>
                <div className="flex gap-2 items-center mt-2">
                  <Input placeholder="다른 유저에게 공개될 별명을 입력해주세요." />
                </div>
              </div>
            </div>
            <div className="basis-1/2 ml-6">
              <div>
                <label className="">직업</label>
                <div className="flex gap-2 items-center mt-2">
                  <Input placeholder="개발자" />
                  {/* <Dropdown placeholder="개발자" options={jobList} /> */}
                </div>
              </div>
              <div className="my-10">
                <label className="">전문분야</label>
                <div className="flex gap-2 items-center mt-2">
                  <Input placeholder="프론트엔드 개발" />
                  {/* <Dropdown placeholder="개발자" options={jobList} /> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="my-2 mr-10">
          <div>
            <label>내 소개</label>
            <div className="flex gap-2 items-center mt-2">
              <Textarea
                placeholder="익명으로 나를 소개할 정보를 입력해주세요. (이름, 연락처) 등의 개인정보를 입력할 경우, 강제 삭제될 수 있습니다."
                style={{ height: "200px" }}
              />
            </div>
          </div>
        </section>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 my-8 mr-10"
        >
          <div className="flex items-center w-full">
            <Button
              type="submit"
              className="w-full h-[64px] text-1xl"
              disabled={loading}
              loading={loading}
            >
              저장하기
            </Button>
          </div>
        </form>
      </Form>
      {/* 아래 */}
      <div>
        <h1 className="text-2xl font-medium mb-6 text-primary">
          아이덴티티 인증
        </h1>
        {/* 4개씩 3줄짜리 테이블 */}
        <div className="flex flex-wrap">
          {logos.map((logo, i) => (
            <div key={i} className="flex basis-1/4">
              <div className="flex justify-center m-4">
                <Image src={logo.src} width={50} height={50} alt={logo.alt} />
              </div>
              <div className="flex flex-col justify-center m-2">
                <p className="text-md">{logo.text}</p>
                <p className="text-sm text-gray-400 mt-1">인증하기</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
