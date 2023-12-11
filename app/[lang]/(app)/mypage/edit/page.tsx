"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { updateUserProfile } from "@/lib/data/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Your first name must be at least 2 characters.",
    })
    .optional(),
  last_name: z
    .string()
    .min(2, {
      message: "Your last name must be at least 2 characters.",
    })
    .optional(),
  profession: z.string().optional(),
  specialisation: z.string().optional(),
  description: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

const logos = [
  { src: "/icons/identity_google.png", alt: "Icon 1", text: "구글 계정" },
  { src: "/icons/identity_phone.png", alt: "Icon 2", text: "전화번호" },
  { src: "/icons/identity_telegram.png", alt: "Icon 3", text: "텔레그램" },
  { src: "/icons/identity_mail.png", alt: "Icon 4", text: "이메일" },
  {
    src: "/icons/identity_bitcoin.png",
    alt: "Icon 1",
    text: "탈중앙화 개인지갑",
  },
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

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);


    //@ts-ignore
    const result =await updateUserProfile(data)
    toast({
      title: "Creating profile...",
      description: <pre>
        {JSON.stringify(result, null, 2)}
        </pre>,
    });

    setLoading(false);
  }

  return (
    <>
      <Card className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="mb-8">
              <h1 className="mb-6 text-primary text-subhead_m">
                Edit Profile
              </h1>
            </section>
            <section className="my-2">
              <div className="flex">
                <div className="flex flex-col basis-1/2">
                  <div>
                    <label className="">Full name (비공개)</label>
                    <div className="flex gap-2 items-center mt-2">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="FirstName" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="my-10">
                    <label className="">profession</label>
                      <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Input placeholder="profession" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                  </div>
                </div>
                <div className="basis-1/2 ml-6">
                  <div className="">
                    <label className="">Specialisation</label>
                      <FormField
                        control={form.control}
                        name="specialisation"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Input placeholder="Speciality" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                  </div>
                </div>
              </div>
            </section>
            <section className="my-2">
              <div>
                <label>Profile Description</label>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="익명으로 나를 소개할 정보를 입력해주세요. (이름, 연락처) 등의 개인정보를 입력할 경우, 강제 삭제될 수 있습니다."
                            style={{ height: "200px" }}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
              </div>
            </section>

            <div className="flex items-center w-full mt-10">
              <Button
                type="submit"
                className="w-full h-[64px] text-1xl"
                loading={loading}
              >
                Save Profile
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      {/* 아래 */}
      <Card className="m-8">
        <h1 className="text-2xl font-medium mb-6 text-primary">
          아이덴티티 인증
        </h1>
        {/* 4개씩 3줄짜리 테이블 */}
        <div className="flex flex-wrap">
          {logos.map((logo, i) => (
            <div
              key={i}
              className={`flex basis-[23%] border rounded-md mt-2 mr-4`}
            >
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
      </Card>
    </>
  );
}
